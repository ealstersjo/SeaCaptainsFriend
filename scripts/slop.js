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
    console.log(selectedVoyage);
    if (!selectedVoyage) {
      contentArea.innerHTML = `
              <h1>Slop reports</h1>
              <small>Select a voyage to proceed</small>
              <div class="select-container">${generateVoyageSelect()}</div>
            `;
      return;
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
                      .fwdDraft ?? "N/A"
                  } m</td>
                  <td>Aft ${
                    selectedVoyage.sof?.["first-line-ashore"]?.remarks
                      .aftDraft ?? "N/A"
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
              <button id="printCertificate">Print Slop Report Before Loading</button>
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
              <button id="printCertificate">Print after loading report</button>
            </div>
          `;
  };

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
};
