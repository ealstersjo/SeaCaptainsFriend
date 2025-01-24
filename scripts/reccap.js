export const receivingCapacity = (contentArea) => {
  const voyages = JSON.parse(localStorage.getItem("currentVoyage")) || [];
  const shipSettings = JSON.parse(localStorage.getItem("shipSettings")) || {
    shipName: "",
  };

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
            <h1>Receiving Capacity Statement</h1>
            <small>Select a voyage to proceed</small>
            <div class="select-container">${generateVoyageSelect()}</div>
          `;
      return;
    }

    contentArea.innerHTML = `
          <h1>Receiving Capacity Statement</h1>
          <div class="select-container">
            ${generateVoyageSelect()}
          </div>
          <div class="nor-info-container">
            <table class="nor-info-table">
              <tr>
                <td class="nor-info-label">Shippers</td>
                <td>${selectedVoyage.supplierReceiver}</td>
                <td class="nor-info-label">Port</td>
                <td>${selectedVoyage.port}</td>
                
              </tr>
              <tr>
              <td class="nor-info-label">Voy No</td>
                <td>${selectedVoyage.voyNo}</td>
                <td class="nor-info-label">From</td>
                <td>${selectedVoyage.from}</td>
                
              </tr>
              <tr>
              
                <td class="nor-info-label">Grade</td>
                <td>${selectedVoyage.cargos[0]?.cargo}</td>
                <td class="nor-info-label">Rate</td>
                <td><input type="number" step="1" id="rateInput" class="form-control" placeholder="Enter rate (m3/h)"></td>
              </tr>
            </table>
            <button class="printButton" id="printRCS">Print Receiving Capacity Statement</button>
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
        alert("Please input loading rate before printing.");
        return;
      }
      turn; // Stopp utskrift om ingen resa är vald

      // Öppna utskriftssidan
      const printWindow = window.open("../pages/printRCS.html", "_blank");

      // Vänta tills utskriftsmallen är laddad
      printWindow.onload = () => {
        // Fyll i header-sektionen
        const headerSection =
          printWindow.document.querySelector(".header-title");
        headerSection.innerHTML = `
              <h1>${shipSettings.shipName}</h1>
              <h1>Receiving Capacity Statement</h1>
            `;

        // Fyll i content-sektionen
        const contentSection = printWindow.document.querySelector(".content");
        contentSection.innerHTML = `
              <div class="rcs-print-info-section">
                <table class="rcs-print-info-table">
                  <tr>
                    <td class="rcs-print-info-label">To shippers:</td>
                    <td class="rcs-print-info-value">${selectedVoyage.supplierReceiver}</td>
                    <td class="rcs-print-info-label">Port</td>
                    <td class="rcs-print-info-value">${selectedVoyage.port}</td>
                  </tr>
                   <tr style="height: 25px;"><td colspan="6"></td></tr>

                  <tr>
                    <td class="rcs-print-info-label">Voy No</td>
                    <td class="rcs-print-info-value">${selectedVoyage.voyNo}</td>
                    <td class="rcs-print-info-label">From</td>
                    <td class="rcs-print-info-value">${selectedVoyage.from}</td>
                    <td class="rcs-print-info-label">To</td>
                    <td class="rcs-print-info-value">${selectedVoyage.to}</td>
                  </tr>
                  <tr>
                </table>
              </div>
        
              <div class="rcs-print-body">
                <p>
                  Please note that the ship's receiving capacity is as follows:<br/>								
                  <strong>Grade: </strong><span class="rcs-print-ship-name-inline">${selectedVoyage.cargos[0].cargo}</span>
                  ${rateInput.value} m3/h
                </p>
                
                 
              </div>
              <div class="rcs-print-received">
                <span>Received:</span> ___<span>Date:</span> _________________________ 
              </div>
              <div class="rcs-print-signature-section">
                <div class="rcs-print-signature">
                  <div class="rcs-print-line"></div>
                  <span>Chief Officer</span>
                  <p><span>${selectedVoyage.crew.chiefOfficer}</span></p>

                </div>
                <div class="rcs-print-signature">
                  <div class="rcs-print-line"></div>
                  <span>Loading Master</span>
                </div>
              </div>
            `;

        // Fyll i footer-sektionen
        const footerSection = printWindow.document.querySelector(".footer");
        footerSection.innerHTML = `
        <div class="rcs-protest">
                  <strong>Due to below mentioned reasons loading not complying with ship's receiving capacity, as stated below:</strong><br/>								
                  <p><strong>Actual loading rate: </strong>_____________________________</p>
                 
                </div>
                <div class="rcs-protest-received">
                <span>Date:</span> __________________________________________________________________________________________________
                
                <p><strong>Loading master:</strong></p>
              </div>
                    <div class="rcs-protest-received">
                <span>Comments if any:</span>
                
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
