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
      // Hämta data från "After Loading"-tabellen
      const afterLoadingData = getAfterLoadingData();

      alert("You have printed Slop After Report");
      // Här kan du skriva kod för att generera och skriva ut rapporten
      //generateAndPrintReport(afterLoadingData);
    });
  document
    .getElementById("printSlopBefore")
    .addEventListener("click", function () {
      // Hämta data från "After Loading"-tabellen
      const beforeLoadingData = getBeforeLoadingData();

      alert("You have printed Slop Before Report");

      // Här kan du skriva kod för att generera och skriva ut rapporten
      //generateAndPrintReport(afterLoadingData);
    });
};
