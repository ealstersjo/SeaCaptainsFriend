export const noticeOfReadiness = (contentArea) => {
  const voyages = JSON.parse(localStorage.getItem("currentVoyage")) || [];

  let selectedVoyageIndex = localStorage.getItem("selectedVoyageIndex");

  // Funktion för att generera dropdown för resor
  const generateVoyageSelect = () => {
    return `
      <select id="voyageSelect">
        <option value="" selected disabled>Select voyage</option>
        ${voyages
          .map(
            (voyage, index) => `
          <option value="${index}" ${
              index == selectedVoyageIndex ? "selected" : ""
            }>
            ${voyage.vessel} - ${voyage.voyNo} 
          </option>
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
          <button id="printNOR">Print Notice of Readiness</button>
        </div>
      `;

    // Hantera print-knappen
    document.getElementById("printNOR").addEventListener("click", () => {
      const printContent = `
          <h1>Notice of Readiness</h1>
          <p>Vessel: ${selectedVoyage.vessel}</p>
          <p>Voy No: ${selectedVoyage.voyNo}</p>
          <p>To: ${selectedVoyage.to}</p>
          <p>Port: ${selectedVoyage.port}</p>
          <p>Date: ${selectedVoyage.date}</p>
          <p>Cargo: ${selectedVoyage.cargos[0]?.cargo} (${selectedVoyage.cargos[0]?.quantity} ${selectedVoyage.cargos[0]?.unit})</p>
          <p>Master: ${selectedVoyage.crew.masterName}</p>
        `;

      const printWindow = window.open("", "_blank");
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
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
