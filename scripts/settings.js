export const settings = (contentArea) => {
  // Hämta inställningar från localStorage eller sätt standardvärde
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
          <button type="submit" class="settings-button">Save</button>
        </form>
      </div>
    `;

  // Event listener för att hantera sparande av inställningar
  document.getElementById("settingsForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const shipName = document.getElementById("shipName").value;
    const callsign = document.getElementById("shipCallSign").value;

    // Spara uppdaterade inställningar i localStorage
    const updatedSettings = { shipName, callsign };
    localStorage.setItem("shipSettings", JSON.stringify(updatedSettings));

    alert(`Settings saved! Ship Name: ${shipName}`);
  });
};
