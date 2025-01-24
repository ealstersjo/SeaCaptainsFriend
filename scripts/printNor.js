export const noticeOfReadiness = (contentArea) => {
  const voyages = JSON.parse(localStorage.getItem("currentVoyage")) || [];
  const shipSettings = JSON.parse(localStorage.getItem("shipSettings")) || {
    shipName: "",
  };

  let selectedVoyageIndex = localStorage.getItem("selectedVoyageIndex");

  // Funktion för att generera dropdown för resor
  const generateVoyageSelect = () => {
    return `
    <select id="voyageSelect">
      <option value="" selected disabled>Select trip</option>
      ${voyages
        .map(
          (voyage, index) => `
        <option value="${index}" ${
            index == selectedVoyageIndex ? "selected" : ""
          }>${voyage.vessel} från ${voyage.from} till ${voyage.to}</option>
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
          <h1>Notice of Readiness</h1>
          <small>Select a voyage to proceed</small>
          <div class="select-container">${generateVoyageSelect()}</div>
        `;
      return;
    }

    contentArea.innerHTML = `
        <h1>Notice of Readiness</h1>
        <div class="select-container">
          ${generateVoyageSelect()}
        </div>
        <div class="nor-info-container">
          <table class="nor-info-table">
            <tr>
              <td class="nor-info-label">Vessel</td>
              <td>${selectedVoyage.vessel}</td>
              <td class="nor-info-label">Voy No</td>
              <td>${selectedVoyage.voyNo}</td>
            </tr>
            <tr>
              <td class="nor-info-label">To</td>
              <td>${selectedVoyage.to}</td>
              <td class="nor-info-label">Port</td>
              <td>${selectedVoyage.port}</td>
            </tr>
            <tr>
              <td class="nor-info-label">Date</td>
              <td>${selectedVoyage.date}</td>
              <td class="nor-info-label">Cargo</td>
              <td>${selectedVoyage.cargos[0]?.cargo} (${
      selectedVoyage.cargos[0]?.quantity
    } ${selectedVoyage.cargos[0]?.unit})</td>
            </tr>
            <tr>
              <td class="nor-info-label">Master</td>
              <td>${selectedVoyage.crew.masterName}</td>
            </tr>
          </table>
  
          <button id="printNOR" class="print-btn"> <i class="fa fa-print"></i> Print Notice of Readiness</button>
        </div>
      `;
    // Hantera print-knappen
    document.getElementById("printNOR").addEventListener("click", () => {
      // Kontrollera om en resa är vald och om cargo tanks är ifyllt
      if (!selectedVoyageIndex) {
        alert("Please select a voyage before printing.");
        return; // Stopp utskrift om ingen resa är vald
      }
      // Öppna utskriftssidan
      const printWindow = window.open("../pages/printNOR.html", "_blank");

      // Vänta tills utskriftsmallen är laddad
      printWindow.onload = () => {
        // Fyll i header-sektionen
        const headerSection =
          printWindow.document.querySelector(".header-title");
        headerSection.innerHTML = `
            <h1>${shipSettings.shipName}</h1>
            <h1>Notice of Readiness</h1>
          `;

        // Fyll i content-sektionen
        const contentSection = printWindow.document.querySelector(".content");
        contentSection.innerHTML = `
            <div class="nor-print-info-section">
              <table class="nor-print-info-table">
                <tr>
                  <td class="nor-print-info-label">To</td>
                  <td class="nor-print-info-value">${
                    selectedVoyage.supplierReceiver
                  }</td>
                  <td class="nor-print-info-label">Port</td>
                  <td class="nor-print-info-value">${selectedVoyage.port}</td>
                </tr>
                <tr>
                  <td class="nor-print-info-label">Voy No</td>
                  <td class="nor-print-info-value">${selectedVoyage.voyNo}</td>
                  <td class="nor-print-info-label">Date</td>
                  <td class="nor-print-info-value">${selectedVoyage.date}</td>
                </tr>
              </table>
            </div>
      
            <div class="nor-print-body">
              <p>
                I the undersigned herby tender the: 
                <span class="nor-print-ship-name-inline">${
                  shipSettings.shipName
                }</span>
                <span class="nor-print-callsign">${shipSettings.callsign}</span>
              </p>
              <p>
                to be in all respects ready to 
                <span class="nor-print-loading-status">${
                  selectedVoyage.operation === "Loading"
                    ? "Load"
                    : selectedVoyage.operation === "Discharging"
                    ? "Discharge"
                    : "Load"
                }</span>
                her cargo of:
              </p>
              <p>
                <span class="nor-print-cargo">${
                  selectedVoyage.cargos[0]?.cargo
                }</span>
                (<span class="nor-print-quantity">${
                  selectedVoyage.cargos[0]?.quantity
                }</span>
                <span class="nor-print-unit">${
                  selectedVoyage.cargos[0]?.unit
                }</span>)
              </p>
              <p>
                as from date:
                <span class="nor-print-tendered-date">${
                  selectedVoyage.sof?.["nor-tendered"]?.date
                }</span>
                Hrs:
                <span class="nor-print-tendered-time">${
                  selectedVoyage.sof?.["nor-tendered"]?.time
                }</span>
              </p>
              <p class="cp">
               Lay time to count, and all other terms to be in accordance with the existing C/P dated:						
                <span class="nor-print-cp-date">${selectedVoyage.cpDated}</span>
                
              </p>
            </div>
          `;

        // Fyll i footer-sektionen
        const footerSection = printWindow.document.querySelector(".footer");
        footerSection.innerHTML = `
            <div class="nor-print-received">
              <span>Received:</span> _________________________
            </div>
            <div class="nor-print-rec-date">
              <span>Date:</span> ____________________ 
              &ensp; 
              <span>Time:</span> ____________________
            </div>
            <div class="nor-print-signature-section">
              <div class="nor-print-signature">
                <div class="nor-print-line"></div>
                <span>Signature of representative</span>
              </div>
              <div class="nor-print-signature">
                <div class="nor-print-line"></div>
                <span>Master (stamp)</span>
                <p><span>${selectedVoyage.crew.masterName}</span></p>
              </div>
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
      renderNORForm();
    }
  });
};
