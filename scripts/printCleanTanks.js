export const cleanlinessTankCertificate = (contentArea) => {
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

  // Funktion för att rendera Cleanliness Tank Certificate
  const renderCleanlinessCertificateForm = () => {
    if (!selectedVoyage) {
      contentArea.innerHTML = `
            <h1>Cleanliness Tank Certificate Before Loading</h1>
            <small>Select a voyage to proceed</small>
            <div class="select-container">${generateVoyageSelect()}</div>
          `;
      return;
    }

    contentArea.innerHTML = `
          <h1>Cleanliness Tank Certificate Before Loading</h1>
          <div class="select-container">
            ${generateVoyageSelect()}
          </div>
          <div class="certificate-info-container">
            <table class="certificate-info-table">
              <tr>
                <td class="certificate-info-label">Voy</td>
                <td>${selectedVoyage.voyNo}</td>
                <td class="certificate-info-label">From</td>
                <td>${selectedVoyage.from}</td>
                <td class="certificate-info-label">To</td>
                <td>${selectedVoyage.to}</td>
              </tr>
              <tr>
                <td class="certificate-info-label">Date</td>
                <td>${selectedVoyage.sof?.["tank-inspection"]?.date}</td>
                <td class="certificate-info-label">Time</td>
                <td>${selectedVoyage.sof?.["tank-inspection"]?.time}</td>
              </tr>
              <tr>
                <td class="certificate-info-label">Cargo</td>
                <td>${selectedVoyage.cargos[0]?.cargo}</td>
                 <td class="certificate-info-label">Port</td>
                <td>${selectedVoyage.port}</td>
                <td class="certificate-info-label">Berth</td>
                <td>${selectedVoyage.jetty}</td>
              </tr>
              
              <tr>
              <td class="certificate-info-label">Cargo Tanks No</td>
                <td colspan="5">         <div class="checkbox-container" id="cargotank-container"></div>
</td>
                </tr>
            </table>
            <button class="print-btn" id="printCertificate"><i class="fa fa-print"></i> Print Cleanliness Tank Certificate</button>
          </div>
        `;

    const createCargoTankCheckboxes = (value) => {
      const container = document.getElementById("cargotank-container");

      // Tanknamn för kryssrutorna
      const tankNames = [
        "C1P",
        "C2P",
        "C3P",
        "C4P",
        "C5P",
        "C6P",
        "C1S",
        "C2S",
        "C3S",
        "C4S",
        "C5S",
        "C6S",
      ];

      // Rensa container varje gång vi skapar kryssrutorna
      container.innerHTML = "";

      tankNames.forEach((tankName) => {
        const checkboxWrapper = document.createElement("div");
        checkboxWrapper.classList.add("checkbox-wrapper");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = tankName;
        checkbox.id = `tank-${tankName}`;

        // Markera om värdet (kommaseparerad sträng) innehåller tanknamnet
        checkbox.checked = value?.split(",").includes(tankName);
        checkbox.dataset.key = "tanksNo";

        const label = document.createElement("label");
        label.htmlFor = `tank-${tankName}`;
        label.textContent = tankName;

        checkboxWrapper.appendChild(checkbox);
        checkboxWrapper.appendChild(label);
        container.appendChild(checkboxWrapper);
      });
    };
    createCargoTankCheckboxes();

    // Hantera print-knappen
    document
      .getElementById("printCertificate")
      .addEventListener("click", () => {
        // Kontrollera om en resa är vald och om cargo tanks är ifyllt
        if (!selectedVoyageIndex) {
          alert("Please select a voyage before printing.");
          return; // Stopp utskrift om ingen resa är vald
        }
        const checkboxes = document.querySelectorAll(
          "#cargotank-container input[type='checkbox']"
        );
        const selectedTanks = Array.from(checkboxes)
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) => checkbox.value);

        const cargotanks = selectedTanks.join(", "); // Kommaseparerad sträng

        if (!cargotanks) {
          alert("Please select the Cargo Tanks before printing.");
          return; // Stopp utskrift om cargo tanks inte är ifyllt
        }
        // Öppna utskriftssidan
        const printWindow = window.open(
          "../pages/printcleantanks.html",
          "_blank"
        );

        // Vänta tills utskriftsmallen är laddad
        printWindow.onload = () => {
          // Fyll i header-sektionen
          const headerSection =
            printWindow.document.querySelector(".header-title");
          headerSection.innerHTML = `
              <h1>${shipSettings.shipName} ${cargotanks}</h1>
              <h1>CLEANLINESS TANK CERTIFICATE BEFORE LOADING</h1>
            `;

          // Fyll i content-sektionen
          const contentSection = printWindow.document.querySelector(".content");
          contentSection.innerHTML = `
              <div class="certificate-info-section">
    <div class="certificate-info-section">
  <table class="voyage-info-table">
    <tr>
      <td><strong>Voy:</strong></td>
      <td>${selectedVoyage.voyNo}</td>
      <td><strong>From:</strong></td>
      <td>${selectedVoyage.from}</td>
      <td><strong>To:</strong></td>
      <td>${selectedVoyage.to}</td>
    </tr>
  </table>
</div>

    <div class="inspection-info">
        <p class="cleaned-tanks-text">This is to certify that the following cargo tanks/lines has been inspected before loading and are clean and dry and suitable for loading:</p>
    </div>
    <div class="cargo-info">
        <p><strong>Cargo:</strong> ${selectedVoyage.cargos[0]?.cargo}</p>
    </div>
    <div class="cargo-tanks-info">
        <p><strong>Cargo Tanks No:</strong> ${cargotanks}</p>
    </div>
    <div class="port-info">
<table class="port-info-table">
  <tr>
    <td><strong>Port:</strong></td>
    <td>${selectedVoyage.port}</td>
    <td><strong>Date:</strong></td>
    <td>${selectedVoyage.sof?.["tank-inspection"]?.date}</td>
    <td><strong>Time:</strong></td>
    <td>${selectedVoyage.sof?.["tank-inspection"]?.time}</td>
  </tr>
</table>
    </div>
</div>



            `;

          // Fyll i footer-sektionen
          const footerSection = printWindow.document.querySelector(".footer");
          footerSection.innerHTML = `
              <div class="certificate-signature-section">
                <div class="certificate-signature">
                  <div class="certificate-line"></div>
                  <span>Shore representative / Surveyor</span>
                   <div class="certificate-line"></div>
                  <span>Name in block letters</span>
                </div>
                <div class="certificate-signature">
                  <div class="certificate-line"></div>
                  <span>Ship's representative.</span>
                  <p><span>Chief Officer: ${selectedVoyage.crew.chiefOfficer}</span></p>
                </div>
              </div>
            `;

          // Starta utskriften
          printWindow.print();
        };
      });
  };

  // Rendera formulär vid start
  renderCleanlinessCertificateForm();

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
