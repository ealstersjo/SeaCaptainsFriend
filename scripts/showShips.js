export const showShipPage = async (contentArea) => {
  // Hämta lista med skepp från localStorage
  const shipList = JSON.parse(localStorage.getItem("shipList"));
  if (shipList && shipList.length > 0) {
    // Vi börjar med att visa det första skeppet
    let currentShipIndex = 0;
    const showShip = (ship) => {
      contentArea.innerHTML = `
            <h1>Vessel Information</h1>
            <div class="ship-info">
              <div class="row">
                <div class="ship-item">
                  <strong>Name:</strong> ${ship.name || "N/A"}
                </div>
                <div class="ship-item">
                  <strong>IMO:</strong> ${ship.imoNo || "N/A"}
                </div>
              </div>
              <div class="row">
                <div class="ship-item">
                  <strong>Gross Tonnage (International):</strong> ${
                    ship.tonnage.international.gross || "N/A"
                  }
                </div>
                <div class="ship-item">
                  <strong>Net Tonnage (International):</strong> ${
                    ship.tonnage.international.net || "N/A"
                  }
                </div>
              </div>
              <div class="row">
                <div class="ship-item">
                  <strong>Dimensions (Length x Beam x Depth):</strong> ${
                    ship.dimensions.lengthOverall
                  } m × ${ship.dimensions.breadthExtreme} m × ${
        ship.dimensions.depth
      } m
                </div>
                <div class="ship-item">
                  <strong>Height over Keel:</strong> ${
                    ship.dimensions.heightOverKeel
                  } m
                </div>
              </div>
              <h4>Load Line Information</h4>
              <table border="1">
                <tr><th>Type</th><th>Draft (m)</th><th>Freeboard (m)</th><th>DWT (tonnes)</th><th>Displacement (tonnes)</th></tr>
                <tr><td>Tropical</td><td>${
                  ship.loadLine.tropical.draft
                }</td><td>${ship.loadLine.tropical.freeboard}</td><td>${
        ship.loadLine.tropical.dwt
      }</td><td>${ship.loadLine.tropical.displacement}</td></tr>
                <tr><td>Summer</td><td>${ship.loadLine.summer.draft}</td><td>${
        ship.loadLine.summer.freeboard
      }</td><td>${ship.loadLine.summer.dwt}</td><td>${
        ship.loadLine.summer.displacement
      }</td></tr>
                <tr><td>Winter</td><td>${ship.loadLine.winter.draft}</td><td>${
        ship.loadLine.winter.freeboard
      }</td><td>${ship.loadLine.winter.dwt}</td><td>${
        ship.loadLine.winter.displacement
      }</td></tr>
              </table>
            </div>
            
            <div class="navigation">
              <button class="navigation-button" id="prevShip">Previous</button>
              <button class="navigation-button" id="nextShip">Next</button>
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
