export const showShipPage = async (contentArea) => {
  // Hämta lista med skepp från localStorage
  const shipList = JSON.parse(localStorage.getItem("shipList"));
  if (shipList && shipList.length > 0) {
    // Vi börjar med att visa det första skeppet
    let currentShipIndex = 0;
    const showShip = (ship) => {
      contentArea.innerHTML = `
            <h1>Vessel Information</h1>
            <div class="ship-info-table-container">
  <table class="ship-info-table">
    <tr>
      <td class="ship-info-label">Name</td>
      <td>${ship.name || "N/A"}</td>
      <td class="ship-info-label">IMO</td>
      <td>${ship.imoNo || "N/A"}</td>
    </tr>
    
    <tr>
      <td class="ship-info-label">Gross Tonnage (International)</td>
      <td>${ship.tonnage.international.gross || "N/A"}</td>
      <td class="ship-info-label">Net Tonnage (International)</td>
      <td>${ship.tonnage.international.net || "N/A"}</td>
    </tr>
   
    <tr>
      <td class="ship-info-label">Dimensions (Length x Beam x Depth)</td>
      <td>${ship.dimensions.lengthOverall} m × ${
        ship.dimensions.breadthExtreme
      } m × ${ship.dimensions.depth} m</td>
      <td class="ship-info-label">Height over Keel</td>
      <td>${ship.dimensions.heightOverKeel} m</td>
    </tr>
  </table>
</div>

                
              </div>
              <h3>Load Line Information</h3>
              <table class="ship-load-line-table">
  <thead>
    <tr>
      <th>Type</th>
      <th>Draft (m)</th>
      <th>Freeboard (m)</th>
      <th>DWT (tonnes)</th>
      <th>Displacement (tonnes)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tropical</td>
      <td>${ship.loadLine.tropical.draft}</td>
      <td>${ship.loadLine.tropical.freeboard}</td>
      <td>${ship.loadLine.tropical.dwt}</td>
      <td>${ship.loadLine.tropical.displacement}</td>
    </tr>
    <tr>
      <td>Summer</td>
      <td>${ship.loadLine.summer.draft}</td>
      <td>${ship.loadLine.summer.freeboard}</td>
      <td>${ship.loadLine.summer.dwt}</td>
      <td>${ship.loadLine.summer.displacement}</td>
    </tr>
    <tr>
      <td>Winter</td>
      <td>${ship.loadLine.winter.draft}</td>
      <td>${ship.loadLine.winter.freeboard}</td>
      <td>${ship.loadLine.winter.dwt}</td>
      <td>${ship.loadLine.winter.displacement}</td>
    </tr>
  </tbody>
</table>

            </div>
            
            <div class="navigation">
              <button class="navigation-button" id="prevShip">Previous Ship</button>
              <button class="navigation-button" id="nextShip">Next Ship</button>
            </div>
          `;

      // Lägg till navigation för att bläddra mellan skeppen
      document.getElementById("prevShip").addEventListener("click", () => {
        currentShipIndex =
          currentShipIndex === 0 ? shipList.length - 1 : currentShipIndex - 1;
        showShip(shipList[currentShipIndex]);
      });

      document.getElementById("nextShip").addEventListener("click", () => {
        currentShipIndex =
          currentShipIndex === shipList.length - 1 ? 0 : currentShipIndex + 1;
        showShip(shipList[currentShipIndex]);
      });
    };

    // Visa det första skeppet
    showShip(shipList[currentShipIndex]);
  } else {
    contentArea.innerHTML = `
          <h1>Vessel Information</h1>
          <p>No ships available in the list.</p>
        `;
  }
};
