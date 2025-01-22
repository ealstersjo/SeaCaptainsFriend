export const settings = (contentArea) => {
  // Hämta inställningar från localStorage eller sätt standardvärde
  const currentVoyage = JSON.parse(localStorage.getItem("currentVoyage"));
  const shipSettings = JSON.parse(localStorage.getItem("shipSettings")) || {
    shipName: "",
  };
  contentArea.innerHTML = `
      <h1 class="settings-title">Settings</h1>
      <div class="settings-container">
        <form id="settingsForm">
          <div class="settings-form-row">
            <label for="shipName" class="settings-label">Ship Name:</label>
            <input 
              type="text" 
              id="shipName" 
              class="settings-input" 
              value="${shipSettings.shipName || ""}" 
              placeholder="Enter ship name"
            />
          </div>
          <div class="settings-form-row">
            <label for="shipCallSign" class="settings-label">Call sign:</label>
            <input 
              type="text" 
              id="shipCallSign" 
              class="settings-input" 
              value="${shipSettings.callsign || ""}" 
              placeholder="Enter ship call sign"
            />
          </div>
          <div class="settings-form-row">
            <label for="shipPumpCapacity" class="settings-label">Maximum pump capacity: (m3/h)</label>
            <input 
              type="text" 
              id="shipPumpCapacity" 
              class="settings-input" 
              value="${shipSettings.pumpCapacity || ""}" 
              placeholder="Enter ships maximum pump capacity"
            />
          </div>
          <button type="submit" class="settings-button">Save</button>
        </form>
        <pre>${JSON.stringify(currentVoyage, null, 2)}</pre>
      </div>
    `;

  // Event listener för att hantera sparande av inställningar
  document.getElementById("settingsForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const shipName = document.getElementById("shipName").value;
    const callsign = document.getElementById("shipCallSign").value;
    const pumpCapacity = document.getElementById("shipPumpCapacity").value;

    // Spara uppdaterade inställningar i localStorage
    const updatedSettings = { shipName, callsign, pumpCapacity };
    localStorage.setItem("shipSettings", JSON.stringify(updatedSettings));

    alert(`Settings saved! Ship Name: ${shipName}`);
  });
};
