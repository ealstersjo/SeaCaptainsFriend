export const pumppressure = (contentArea) => {
  const voyages = JSON.parse(localStorage.getItem("currentVoyage")) || [];
  const shipSettings = JSON.parse(localStorage.getItem("shipSettings")) || {
    shipName: "",
  };
  //console.log(shipSettings);

  let selectedVoyageIndex = localStorage.getItem("selectedVoyageIndex");

  const generateVoyageSelect = () => {
    return `
      <select id="voyageSelect">
        <option value="" selected disabled>Select trip</option>
        ${voyages
          .map(
            (voyage, index) => `
          <option value="${index}" ${
              index == selectedVoyageIndex ? "selected" : ""
            }>${voyage.vessel} from ${voyage.from} to ${voyage.to}</option>
        `
          )
          .join("")}
      </select>
    `;
  };

  // Hämta vald resa
  let selectedVoyage;

  if (selectedVoyageIndex) {
    selectedVoyage = voyages[selectedVoyageIndex];
  }

  // Funktion för att rendera formulär för NOR
  const renderNORForm = () => {
    if (!selectedVoyage) {
      contentArea.innerHTML = `
              <h1>Pumping Pressure Statement</h1>
              <small>Select a voyage to proceed</small>
              <div class="select-container">${generateVoyageSelect()}</div>
            `;
      return;
    }

    contentArea.innerHTML = `
            <h1>Pumping Pressure Statement</h1>
            <div class="select-container">
              ${generateVoyageSelect()}
            </div>
            <div class="nor-info-container">
              <table class="nor-info-table">
                <tr>
                  <td class="nor-info-label">To the receivers</td>
                  <td>${selectedVoyage.supplierReceiver}</td>
                  <td class="nor-info-label">Port</td>
                  <td>${selectedVoyage.port}</td>
                  
                </tr>
                <tr>
                <td class="nor-info-label">Voy No</td>
                  <td>${selectedVoyage.voyNo}</td>
                  <td class="nor-info-label">From</td>
                  <td>${selectedVoyage.from}</td>
                  <td class="nor-info-label">To</td>
                  <td>${selectedVoyage.to}</td>
                </tr>
                <tr>
                <td class="nor-info-label">Maximum pressure</td>
                <td colspan="2"><input type="number" step="1" id="maxPressure" class="form-control" placeholder="Enter pressure"></td>
                 <td class="nor-info-label">Maximum rate</td>
                <td colspan="2"><input type="number" step="1" id="rateInput" class="form-control" placeholder="Enter rate"></td>
                    </tr>
                
              </table>
              <button class="printButton" id="printRCS">Print Pumping Pressure Statement</button>
            </div>
          `;
    // Hantera print-knappen
    document.getElementById("printRCS").addEventListener("click", () => {
      // Kontrollera om en resa är vald och om cargo tanks är ifyllt
      if (!selectedVoyageIndex) {
        alert("Please select a voyage before printing.");
        return; // Stopp utskrift om ingen resa är vald
      }
      const rateInput = document.getElementById("rateInput");
      if (!rateInput || !rateInput.value) {
        alert("Please input maximum rate before printing.");
        return;
      }
      const pressureInput = document.getElementById("maxPressure");
      if (!pressureInput || !pressureInput.value) {
        alert("Please input maximume pressure before printing.");
        return;
      }

      // Öppna utskriftssidan
      const printWindow = window.open("../pages/printPPS.html", "_blank");

      // Vänta tills utskriftsmallen är laddad
      printWindow.onload = () => {
        // Fyll i header-sektionen
        const headerSection =
          printWindow.document.querySelector(".header-title");
        headerSection.innerHTML = `
                <h1>${shipSettings.shipName}</h1>
                <h1>Pumping Pressure Statement</h1>
              `;

        // Fyll i content-sektionen
        const contentSection = printWindow.document.querySelector(".content");
        contentSection.innerHTML = `
  <div class="pps-print-info-section">
    <table class="pps-print-info-table">
      <tr>
        <td colspan="2" class="pps-print-info-label">To the receivers:</td>
        <td colspan="2" class="pps-print-info-value">${selectedVoyage.supplierReceiver}</td>
        <td class="pps-print-info-label">Port</td>
        <td class="pps-print-info-value">${selectedVoyage.port}</td>
      </tr>
      <tr style="height: 25px;">
        <td colspan="6"></td>
      </tr>
      <tr>
        <td class="pps-print-info-label">Voy No</td>
        <td class="pps-print-info-value">${selectedVoyage.voyNo}</td>
        <td class="pps-print-info-label">From</td>
        <td class="pps-print-info-value">${selectedVoyage.from}</td>
        <td class="pps-print-info-label">To</td>
        <td class="pps-print-info-value">${selectedVoyage.to}</td>
      </tr>
    </table>
  </div>

  <div class="pps-print-body">
    <p><strong>To the Master of:</strong> &emsp; &emsp; &emsp; ${shipSettings.shipName} &emsp; ${shipSettings.callsign}</p>
    <p>
      <strong>Please note that the maximum pressure you are allowed to maintain on</strong><br/>								
      <strong>the manifold of your vessel's rail is:</strong> <span class="pps-print-value-inline">${pressureInput.value}</span> bar<br/>
      <strong>and a maximum discharge rate of:</strong> <span class="pps-print-value-inline">${rateInput.value}</span> m3/h<br/>
    </p>
  </div>

  <div class="pps-print-signature-received">
    <span>Date:</span> __________________________________________________________________________________________________
    <p><strong>Loading master:</strong></p>
  </div>

  <div class="pps-print-actual">
    <p>
      <strong>We confirm that you during the discharge have maintained:</strong><br/><br/>								
      <strong>A pressure of:</strong> <span class="pps-print-value-inline">_____________________________</span><br/><br/>
      <strong>A discharge rate of:</strong> <span class="pps-print-value-inline">_____________________________</span><br/>
    </p>
  </div>
`;

        const footerSection = printWindow.document.querySelector(".footer");
        footerSection.innerHTML = `
  <div class="pps-print-footer-received">
    <span>Date:</span> __________________________________________________________________________________________________
    <p><strong>Loading master:</strong></p>
  </div>
  <div class="pps-print-footer-signature">
    ___________________________________<br/>
    <span>Name in block</span>
  </div>
`;

        // Starta utskriften
        printWindow.print();
      };
    });
  };

  // Rendera formulär vid start
  renderNORForm();

  // Hantera ändring av vald resa
  contentArea.addEventListener("change", (e) => {
    if (e.target.id === "voyageSelect") {
      selectedVoyageIndex = e.target.value;
      localStorage.setItem("selectedVoyageIndex", selectedVoyageIndex);
      selectedVoyage = voyages[selectedVoyageIndex];
      renderCleanlinessCertificateForm();
    }
  });
};
