export const slop = (contentArea) => {
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
  const renderSlopForm = () => {
    if (!selectedVoyage) {
      if (voyages.length > 0) {
        contentArea.innerHTML = `
              <h1>Slop reports</h1>
              <small>Select a voyage to proceed</small>
              <div class="select-container">${generateVoyageSelect()}</div>
            `;
        return;
      }
    }

    contentArea.innerHTML = `
            <h1>Slop reports</h1>
           
            <div class="select-container">
              ${generateVoyageSelect()}
            </div>
            <div class="certificate-info-container">
             <h3>Before loading</h3>
              <table class="certificate-info-table">
                <tr>
                  <td class="certificate-info-label">Voy</td>
                  <td>${selectedVoyage.voyNo}</td>
                 <td class="certificate-info-label">Date</td>
                  <td>${selectedVoyage.date}</td>
                </tr>
                <tr>
                   <td class="certificate-info-label">Port</td>
                  <td>${selectedVoyage.port}</td>
                  <td class="certificate-info-label">Berth</td>
                  <td>${selectedVoyage.jetty}</td>
                </tr>
                <tr>
                  <td class="certificate-info-label">Draft</td>
                  <td>FWD ${
                    selectedVoyage.sof?.["first-line-ashore"]?.remarks
                      .fwdDraft ?? "Update value in SoF"
                  } m</td>
                  <td>Aft ${
                    selectedVoyage.sof?.["first-line-ashore"]?.remarks
                      .aftDraft ?? "Update value in SoF"
                  } m</td>
                  <td>Trim ${
                    selectedVoyage.sof?.["first-line-ashore"]?.remarks
                      .aftDraft -
                    selectedVoyage.sof?.["first-line-ashore"]?.remarks.fwdDraft
                  } m</td>
                  
                </tr>
              </table>
             <table class="slop-table">
    <thead class="slop-thead">
        <tr class="slop-header-row">
            <th class="slop-header">Measurements</th>
            <th class="slop-header">Deck Drain Tank P</th>
            <th class="slop-header">Deck Drain Tank S</th>
            <th class="slop-header">Cargo (Slop-tank) 1S</th>
            <th class="slop-header">Remarks</th>
        </tr>
    </thead>
    <tbody class="slop-tbody">
    <tr class="slop-row">
        <td class="slop-cell">UTI Ullage</td>
        <td class="slop-cell"><input class="slop-input" id="uti-ullage-p-before" type="text" value=""></td>
        <td class="slop-cell"><input class="slop-input" id="uti-ullage-s-before" type="text" value=""></td>
        <td class="slop-cell"><input class="slop-input" id="uti-ullage-cargo-before" type="text" value=""></td>
        <td class="slop-cell"><input class="slop-input" id="uti-ullage-remarks-before" type="text"></td>
    </tr>
    <tr class="slop-row">
        <td class="slop-cell">Corr Ullage</td>
        <td class="slop-cell"><input class="slop-input" id="corr-ullage-p-before" type="text" value=""></td>
        <td class="slop-cell"><input class="slop-input" id="corr-ullage-s-before" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="corr-ullage-cargo-before" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="corr-ullage-remarks-before" type="text"></td>
    </tr>
    <tr class="slop-row">
        <td class="slop-cell">GOV (cbm)</td>
        <td class="slop-cell"><input class="slop-input" id="gov-p-before" type="text" value=""></td>
        <td class="slop-cell"><input class="slop-input" id="gov-s-before" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="gov-cargo-before" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="gov-remarks-before" type="text"></td>
    </tr>
    <tr class="slop-row">
        <td class="slop-cell">Last Cargo</td>
        <td class="slop-cell"><input class="slop-input" id="last-cargo-p-before" type="text" value=""></td>
        <td class="slop-cell"><input class="slop-input" id="last-cargo-s-before" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="last-cargo-cargo-before" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="last-cargo-remarks-before" type="text"></td>
    </tr>
    <tr class="slop-row-space"></tr>
    <tr class="slop-row">
        <td class="slop-cell">UTI Interface</td>
        <td class="slop-cell"><input class="slop-input" id="uti-interface-p-before" type="text" value=""></td>
        <td class="slop-cell"><input class="slop-input" id="uti-interface-s-before" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="uti-interface-cargo-before" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="uti-interface-remarks-before" type="text"></td>
    </tr>
    <tr class="slop-row">
        <td class="slop-cell">Corr Interface</td>
        <td class="slop-cell"><input class="slop-input" id="corr-interface-p-before" type="text" value=""></td>
        <td class="slop-cell"><input class="slop-input" id="corr-interface-s-before" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="corr-interface-cargo-before" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="corr-interface-remarks-before" type="text"></td>
    </tr>
    <tr class="slop-row">
        <td class="slop-cell">Water GOV</td>
        <td class="slop-cell"><input class="slop-input" id="water-gov-p-before" type="text" value=""></td>
        <td class="slop-cell"><input class="slop-input" id="water-gov-s-before" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="water-gov-cargo-before" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="water-gov-remarks-before" type="text"></td>
    </tr>
</tbody>

</table>

              <label for"remarksbefore">Remarks</label>
              <textarea type="textarea" id="remarksbefore"></textarea>
              <button id="printSlopBefore">Print Slop Report Before Loading</button>
            </div>


<hr/>
            <div class="certificate-info-container">
             <h3>After loading</h3>
              <table class="certificate-info-table">
                <tr>
                  <td class="certificate-info-label">Voy</td>
                  <td>${selectedVoyage.voyNo}</td>
                 <td class="certificate-info-label">Date</td>
                  <td>${selectedVoyage.date}</td>
                </tr>
                <tr>
                   <td class="certificate-info-label">Port</td>
                  <td>${selectedVoyage.port}</td>
                  <td class="certificate-info-label">Berth</td>
                  <td>${selectedVoyage.jetty}</td>
                </tr>
                <tr>
                  <td class="certificate-info-label">Draft</td>
                  <td>FWD ${
                    selectedVoyage.sof?.["pilot-disembarked"]?.remarks
                      .fwdDraft ?? "N/A"
                  } m</td>
                  <td>Aft ${
                    selectedVoyage.sof?.["pilot-disembarked"]?.remarks
                      .aftDraft ?? "N/A"
                  } m</td>
                  <td>Trim ${
                    selectedVoyage.sof?.["pilot-disembarked"]?.remarks
                      .aftDraft -
                    selectedVoyage.sof?.["pilot-disembarked"]?.remarks.fwdDraft
                  } m</td>
                  
                </tr>
                
           
              </table>

              <table class="slop-table">
    <thead class="slop-thead">
        <tr class="slop-header-row">
            <th class="slop-header">Measurements</th>
            <th class="slop-header">Deck Drain Tank P</th>
            <th class="slop-header">Deck Drain Tank S</th>
            <th class="slop-header">Cargo (Slop-tank) 1S</th>
            <th class="slop-header">Remarks</th>
        </tr>
    </thead>
    <tbody class="slop-tbody">
    <tr class="slop-row">
        <td class="slop-cell">UTI Ullage</td>
        <td class="slop-cell"><input class="slop-input" id="uti-ullage-p-after" type="text" value=""></td>
        <td class="slop-cell"><input class="slop-input" id="uti-ullage-s-after" type="text" value=""></td>
        <td class="slop-cell"><input class="slop-input" id="uti-ullage-cargo-after" type="text" value=""></td>
        <td class="slop-cell"><input class="slop-input" id="uti-ullage-remarks-after" type="text"></td>
    </tr>
    <tr class="slop-row">
        <td class="slop-cell">Corr Ullage</td>
        <td class="slop-cell"><input class="slop-input" id="corr-ullage-p-after" type="text" value=""></td>
        <td class="slop-cell"><input class="slop-input" id="corr-ullage-s-after" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="corr-ullage-cargo-after" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="corr-ullage-remarks-after" type="text"></td>
    </tr>
    <tr class="slop-row">
        <td class="slop-cell">GOV (cbm)</td>
        <td class="slop-cell"><input class="slop-input" id="gov-p-after" type="text" value=""></td>
        <td class="slop-cell"><input class="slop-input" id="gov-s-after" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="gov-cargo-after" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="gov-remarks-after" type="text"></td>
    </tr>
    <tr class="slop-row">
        <td class="slop-cell">Last Cargo</td>
        <td class="slop-cell"><input class="slop-input" id="last-cargo-p-after" type="text" value=""></td>
        <td class="slop-cell"><input class="slop-input" id="last-cargo-s-after" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="last-cargo-cargo-after" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="last-cargo-remarks-after" type="text"></td>
    </tr>
    <tr class="slop-row-space"></tr>
    <tr class="slop-row">
        <td class="slop-cell">UTI Interface</td>
        <td class="slop-cell"><input class="slop-input" id="uti-interface-p-after" type="text" value=""></td>
        <td class="slop-cell"><input class="slop-input" id="uti-interface-s-after" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="uti-interface-cargo-after" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="uti-interface-remarks-after" type="text"></td>
    </tr>
    <tr class="slop-row">
        <td class="slop-cell">Corr Interface</td>
        <td class="slop-cell"><input class="slop-input" id="corr-interface-p-after" type="text" value=""></td>
        <td class="slop-cell"><input class="slop-input" id="corr-interface-s-after" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="corr-interface-cargo-after" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="corr-interface-remarks-after" type="text"></td>
    </tr>
    <tr class="slop-row">
        <td class="slop-cell">Water GOV</td>
        <td class="slop-cell"><input class="slop-input" id="water-gov-p-after" type="text" value=""></td>
        <td class="slop-cell"><input class="slop-input" id="water-gov-s-after" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="water-gov-cargo-after" type="text"></td>
        <td class="slop-cell"><input class="slop-input" id="water-gov-remarks-after" type="text"></td>
    </tr>
</tbody>


</table>
<label for"remarksafter">Remarks</label>
              <textarea type="textarea" id="remarksafter"></textarea>
              <button id="printSlopAfter">Print after loading report</button>
            </div>
          `;
  };
  function getBeforeLoadingData() {
    const slopBefore = {
      utiUllage: {
        p: document.getElementById("uti-ullage-p-before").value,
        s: document.getElementById("uti-ullage-s-before").value,
        cargo: document.getElementById("uti-ullage-cargo-before").value,
        remarks: document.getElementById("uti-ullage-remarks-before").value,
      },
      corrUllage: {
        p: document.getElementById("corr-ullage-p-before").value,
        s: document.getElementById("corr-ullage-s-before").value,
        cargo: document.getElementById("corr-ullage-cargo-before").value,
        remarks: document.getElementById("corr-ullage-remarks-before").value,
      },
      gov: {
        p: document.getElementById("gov-p-before").value,
        s: document.getElementById("gov-s-before").value,
        cargo: document.getElementById("gov-cargo-before").value,
        remarks: document.getElementById("gov-remarks-before").value,
      },
      lastCargo: {
        p: document.getElementById("last-cargo-p-before").value,
        s: document.getElementById("last-cargo-s-before").value,
        cargo: document.getElementById("last-cargo-cargo-before").value,
        remarks: document.getElementById("last-cargo-remarks-before").value,
      },
      utiInterface: {
        p: document.getElementById("uti-interface-p-before").value,
        s: document.getElementById("uti-interface-s-before").value,
        cargo: document.getElementById("uti-interface-cargo-before").value,
        remarks: document.getElementById("uti-interface-remarks-before").value,
      },
      corrInterface: {
        p: document.getElementById("corr-interface-p-before").value,
        s: document.getElementById("corr-interface-s-before").value,
        cargo: document.getElementById("corr-interface-cargo-before").value,
        remarks: document.getElementById("corr-interface-remarks-before").value,
      },
      waterGov: {
        p: document.getElementById("water-gov-p-before").value,
        s: document.getElementById("water-gov-s-before").value,
        cargo: document.getElementById("water-gov-cargo-before").value,
        remarks: document.getElementById("water-gov-remarks-before").value,
      },
      overallRemarks: document.getElementById("remarksbefore").value,
    };
    return slopBefore;
  }
  function getAfterLoadingData() {
    const slopAfter = {
      utiUllage: {
        p: document.getElementById("uti-ullage-p-after").value,
        s: document.getElementById("uti-ullage-s-after").value,
        cargo: document.getElementById("uti-ullage-cargo-after").value,
        remarks: document.getElementById("uti-ullage-remarks-after").value,
      },
      corrUllage: {
        p: document.getElementById("corr-ullage-p-after").value,
        s: document.getElementById("corr-ullage-s-after").value,
        cargo: document.getElementById("corr-ullage-cargo-after").value,
        remarks: document.getElementById("corr-ullage-remarks-after").value,
      },
      gov: {
        p: document.getElementById("gov-p-after").value,
        s: document.getElementById("gov-s-after").value,
        cargo: document.getElementById("gov-cargo-after").value,
        remarks: document.getElementById("gov-remarks-after").value,
      },
      lastCargo: {
        p: document.getElementById("last-cargo-p-after").value,
        s: document.getElementById("last-cargo-s-after").value,
        cargo: document.getElementById("last-cargo-cargo-after").value,
        remarks: document.getElementById("last-cargo-remarks-after").value,
      },
      utiInterface: {
        p: document.getElementById("uti-interface-p-after").value,
        s: document.getElementById("uti-interface-s-after").value,
        cargo: document.getElementById("uti-interface-cargo-after").value,
        remarks: document.getElementById("uti-interface-remarks-after").value,
      },
      corrInterface: {
        p: document.getElementById("corr-interface-p-after").value,
        s: document.getElementById("corr-interface-s-after").value,
        cargo: document.getElementById("corr-interface-cargo-after").value,
        remarks: document.getElementById("corr-interface-remarks-after").value,
      },
      waterGov: {
        p: document.getElementById("water-gov-p-after").value,
        s: document.getElementById("water-gov-s-after").value,
        cargo: document.getElementById("water-gov-cargo-after").value,
        remarks: document.getElementById("water-gov-remarks-after").value,
      },
    };
    return slopAfter;
  }

  // Rendera formulär vid start
  renderSlopForm();

  // Hantera ändring av vald resa
  contentArea.addEventListener("change", (e) => {
    if (e.target.id === "voyageSelect") {
      selectedVoyageIndex = e.target.value;
      localStorage.setItem("selectedVoyageIndex", selectedVoyageIndex);
      selectedVoyage = voyages[selectedVoyageIndex];
      renderSlopForm();
    }
  });
  document
    .getElementById("printSlopAfter")
    .addEventListener("click", function () {
      printSlopReport(false);

      //alert("You have printed Slop After Report");
      // Här kan du skriva kod för att generera och skriva ut rapporten
      //generateAndPrintReport(afterLoadingData);
    });
  document
    .getElementById("printSlopBefore")
    .addEventListener("click", function () {
      printSlopReport(true);
    });
  const printSlopReport = (before) => {
    // Kontrollera om en resa är vald och om cargo tanks är ifyllt
    if (!selectedVoyageIndex) {
      alert("Please select a voyage before printing.");
      return; // Avbryt utskrift om ingen resa är vald
    }

    // Öppna utskriftssidan
    const printWindow = window.open("../pages/printSlop.html", "_blank");

    // Vänta tills utskriftsmallen är laddad
    printWindow.onload = () => {
      let loadingdata;
      let fwdDraft;
      let aftDraft;
      let condition;
      if (before) {
        loadingdata = getBeforeLoadingData();
        fwdDraft = selectedVoyage.sof?.["first-line-ashore"]?.remarks.fwdDraft;
        aftDraft = selectedVoyage.sof?.["first-line-ashore"]?.remarks.aftDraft;
        condition = "Before loading";
      } else {
        loadingdata = getAfterLoadingData();
        fwdDraft = selectedVoyage.sof?.["pilot-disembarked"]?.remarks.fwdDraft;
        aftDraft = selectedVoyage.sof?.["pilot-disembarked"]?.remarks.aftDraft;
        condition = "After loading";
      }

      // Fyll i header-sektionen
      const headerSection = printWindow.document.querySelector(".header-title");
      headerSection.innerHTML = `
              <h1>${shipSettings.shipName}</h1>
              <h2>SlopTank(s) Report/Certificate</h2>
          `;

      // Fyll i content-sektionen
      const contentSection = printWindow.document.querySelector(".content");
      contentSection.innerHTML = `
              <div class="certificate-info-section">
                  <table class="certificate-info-table">
                      <tr>
                          <td><strong>Voy:</strong></td>
                          <td>${selectedVoyage.voyNo}</td>
                         
                          <td><strong>Date:</strong></td>
                          <td>${selectedVoyage.date || "N/A"}</td>
                      </tr>
                      <tr>
                       <td><strong>Port:</strong></td>
                          <td>${selectedVoyage.port}</td>
                          <td><strong>Berth:</strong></td>
                          <td>${selectedVoyage.jetty || "N/A"}</td>
                          
                      </tr>
                      <tr>
                      <tr>
                         <td><strong>Condition:</strong></td>
                          <td>${condition}</td>
                      </tr>
                         <td><strong>Draft:</strong></td>
                          <td><strong>FWD </strong> ${
                            fwdDraft || "N/A"
                          } m &emsp;&emsp;&emsp;

                          <strong>Aft</strong> ${
                            aftDraft || "N/A"
                          } m &emsp;&emsp;&emsp;
                          <strong>Trim</strong> ${
                            aftDraft - fwdDraft || "N/A"
                          } m</td>
                      </tr>
                  </table>
              </div>
              <div class="slop-info-section">
                  <table class="slop-table">
                    <colgroup>
    <col style="width: 20%;"> <!-- Första kolumnen -->
    <col style="width: 15%;"> <!-- Andra kolumnen -->
    <col style="width: 15%;"> <!-- Tredje kolumnen -->
    <col style="width: 15%;"> <!-- Fjärde kolumnen -->
    <col style="width: 35%;"> <!-- Femte kolumnen -->
  </colgroup>
                      <thead>
                          <tr>
                              <th>Measurements</th>
                              <th>Deck Drain<br> Tank P</th>
                              <th>Deck Drain<br> Tank S</th>
                              <th>Cargo<br> (Slop-tank) 1S</th>
                              <th>Remarks</th>
                          </tr>
                      </thead>
                      <tbody>
                          ${generateSlopTableRows(loadingdata)}
                      </tbody>
                  </table>
                  <div class="overallremarks"><span>Remarks:</span> <p>${
                    loadingdata.overallRemarks
                  }</p></div>
              </div>
          `;

      // Fyll i footer-sektionen
      const footerSection = printWindow.document.querySelector(".footer");
      footerSection.innerHTML = `
              <div class="certificate-signature-section">
              <div class="certificate-signature">
                      <div class="certificate-line"></div>
                      <span>Ship's representative.</span>
                      <p><span>Chief Officer: ${
                        selectedVoyage.crew?.chiefOfficer || "N/A"
                      }</span></p>
                  </div>
                  <div class="certificate-signature">
                      <div class="certificate-line"></div>
                      <span>Surveyor / Load Master</span>
                      <div class="certificate-line"></div>
                      <span>Name in block letters</span>
                  </div>
                  
              </div>
          `;

      // Starta utskriften
      printWindow.print();
    };
  };

  // Funktion för att generera rader i slop-tabellen
  const generateSlopTableRows = (data) => {
    const rows = [
      { label: "UTI Ullage", key: "utiUllage" },
      { label: "Corr Ullage", key: "corrUllage" },
      { label: "GOV (cbm)", key: "gov" },
      { label: "Last Cargo", key: "lastCargo" },
      { label: "UTI Interface", key: "utiInterface" },
      { label: "Corr Interface", key: "corrInterface" },
      { label: "Water GOV", key: "waterGov" },
    ];

    return rows
      .map(
        (row) => `
              <tr>
                  <td>${row.label}</td>
                  <td>${data[row.key]?.p || ""}</td>
                  <td>${data[row.key]?.s || ""}</td>
                  <td>${data[row.key]?.cargo || ""}</td>
                  <td>${data[row.key]?.remarks || ""}</td>
              </tr>
          `
      )
      .join("");
  };
};
