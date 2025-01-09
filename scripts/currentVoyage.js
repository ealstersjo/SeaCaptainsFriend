const tempVoyage = () =>
  fetch("../data/currentVoyage.json")
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      return JSON.stringify(data); // Returnera datan
    })
    .catch((error) => {
      console.error("Error fetching voyage data:", error);
    });

export const currentVoyagePage = async (contentArea) => {
  //const currentVoyage = localStorage.getItem("currentVoyage");
  const currentVoyage = await tempVoyage();
  if (currentVoyage) {
    const voyageData = JSON.parse(currentVoyage);
    contentArea.innerHTML = `<div class="voyage-info">
  <h1 class="voyage-header">Current Voyage</h1>
<div class="voyage-span">
<div class="voyage-section">
    <div class="key-value-pair">
      <span class="key">Vessel:</span> <span class="value">${
        voyageData.vessel || "N/A"
      }</span>
    </div>
    <div class="key-value-pair">
      <span class="key">Voyage:</span> <span class="value">${
        voyageData.voyageNumber || "N/A"
      }</span>
    </div>
    <div class="key-value-pair">
      <span class="key">PNI #:</span> <span class="value">${
        voyageData.pniNumber || "N/A"
      }</span>
    </div>
  </div>
  <div class="voyage-item">
    <div class="key-value-pair">
      <span class="key">Cargo:</span> <span class="value">${
        voyageData.cargo.type || "N/A"
      }</span>
    </div>
    <div class="key-value-pair">
      <span class="key">Volume:</span> <span class="value">${
        voyageData.cargo.quantity || "N/A"
      } ${voyageData.cargo.unit || "N/A"}</span>
    </div>
  </div>
  
</div>
  
<div class="voyage-span">

  
<div class="voyage-section">
    <div class="key-value-pair">
      <span class="key">Loading date:</span> <span class="value">${
        voyageData.date || "N/A"
      }</span>
    </div>
    <div class="key-value-pair">
      <span class="key">Port of Loading:</span> <span class="value">${
        voyageData.portOfLoading || "N/A"
      }</span>
    </div>
    <div class="key-value-pair">
      <span class="key">Terminal:</span> <span class="value">${
        voyageData.loadingTerminal || "N/A"
      }</span>
    </div>
  </div>
  <div class="voyage-item">
    <div class="key-value-pair">
      <span class="key">Est. Arrival Date:</span> <span class="value">${
        voyageData.arrivalDate || "N/A"
      }</span>
    </div>
    <div class="key-value-pair">
      <span class="key">Port of Discharge:</span> <span class="value">${
        voyageData.portOfDischarge || "N/A"
      }</span>
    </div>
    <div class="key-value-pair">
      <span class="key">Terminal:</span> <span class="value">${
        voyageData.dischargeTerminal || "N/A"
      }</span>
    </div>
  </div>

  

  
  </div>

  <div class="voyage-crew">
    <div class="key-value-pair">
      <span class="key">Master:</span> <span class="value">${
        voyageData.crew.master || "N/A"
      }</span>
    </div>
    <div class="key-value-pair">
      <span class="key">Chief Officer:</span> <span class="value">${
        voyageData.crew.chiefOfficer || "N/A"
      }</span>
    </div>
    <div class="key-value-pair">
      <span class="key">Second Officer 1:</span> <span class="value">${
        voyageData.crew.secondOfficer1 || "N/A"
      }</span>
    </div>
    <div class="key-value-pair">
      <span class="key">Second Officer 2:</span> <span class="value">${
        voyageData.crew.secondOfficer2 || "N/A"
      }</span>
    </div>
  </div>
</div>

`;
  } else {
    contentArea.innerHTML = `
            <h1>Current Voyage</h1>
            <p>No current voyage available.</p>
        `;
  }
};
