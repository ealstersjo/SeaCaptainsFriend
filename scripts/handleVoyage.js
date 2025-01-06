export const handleVoyage = (contentArea) => {
  const currentVoyage = JSON.parse(localStorage.getItem("currentVoyage"));

  if (!currentVoyage) {
    // Om det inte finns en aktuell resa
    contentArea.innerHTML = `
      <h1>There is no current voyage.</h1>
      <h3>Would you like to commence a new voyage?</h3>
      <button id="commenceVoyageButton" type="commence">Commence Voyage</button>
    `;

    // Hantera när knappen trycks för att starta en ny resa
    const commenceVoyageButton = document.getElementById(
      "commenceVoyageButton"
    );
    commenceVoyageButton.addEventListener("click", () => {
      // Visa formuläret för att hantera resan
      contentArea.innerHTML = `
        <h1>Commence Voyage</h1>
        <form id="voyageForm">
          <div>
            <label for="vessel">Vessel:</label>
            <select id="vessel" name="vessel" required></select>
          </div>
          <div>
            <label for="date">Start date:</label>
            <input type="date" id="date" name="date" value="${
              new Date().toISOString().split("T")[0]
            }" required />
          </div>
          <div>
            <label for="pniNumber">PNI #:</label>
            <input type="text" id="pniNumber" name="pniNumber" required />
          </div>
          <div>
            <label for="portOfLoading">Port of Loading:</label>
            <input type="text" id="portOfLoading" name="portOfLoading" />
          </div>
          <div>
            <label for="portOfDischarge">Port of Discharge:</label>
            <input type="text" id="portOfDischarge" name="portOfDischarge" />
          </div>
          <div>
            <label for="arrivalDate">Estimated date of arrival:</label>
            <input type="date" id="arrivalDate" name="arrivalDate" required />
          </div>
          <div>
            <label for="cargo">Cargo:</label>
            <textarea id="cargo" name="cargo"></textarea>
          </div>
          <div>
            <button type="submit">Save Voyage</button>
          </div>
        </form>
      `;

      loadShipsDropdown();

      // Hantera formulärens inlämning
      const voyageForm = document.getElementById("voyageForm");
      voyageForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Hämta värden från formuläret
        const vessel = document.getElementById("vessel").value;
        const date = document.getElementById("date").value;
        const arrivalDate = document.getElementById("arrivalDate").value;
        const pniNumber = document.getElementById("pniNumber").value;
        const portOfLoading = document.getElementById("portOfLoading").value;
        const portOfDischarge =
          document.getElementById("portOfDischarge").value;
        const cargo = document.getElementById("cargo").value;

        // Skapa ett objekt för resan
        const currentVoyage = {
          vessel,
          date,
          arrivalDate,
          pniNumber,
          portOfLoading,
          portOfDischarge,
          cargo,
        };

        // Spara resan i localStorage
        localStorage.setItem("currentVoyage", JSON.stringify(currentVoyage));

        // Bekräfta för användaren
        alert("A new voyage has commenced");
        handleVoyage(contentArea); // Ladda om innehållet
      });
    });
  } else {
    // Om det finns en aktuell resa, visa JSON-datan för currentVoyage
    contentArea.innerHTML = `
      <h1>Current Voyage</h1>
      <pre>${JSON.stringify(currentVoyage, null, 2)}</pre>
      <button id="deleteVoyageButton" type="deleteButton">Delete Current Voyage</button>
    `;

    // Hantera borttagning av currentVoyage
    const deleteVoyageButton = document.getElementById("deleteVoyageButton");
    deleteVoyageButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete the current voyage?")) {
        // Ta bort currentVoyage från localStorage
        localStorage.removeItem("currentVoyage");

        // Bekräfta för användaren
        alert("Current voyage has been deleted!");

        // Ladda om sidan för att visa att ingen resa är aktiv
        handleVoyage(contentArea); // Ladda om innehållet
      }
    });
  }
};

// Ladda skeppsnamnen
const loadShipsDropdown = () => {
  fetch("../data/ships.json")
    .then((response) => response.json())
    .then((ships) => {
      const vesselSelect = document.getElementById("vessel");
      ships.forEach((ship) => {
        const option = document.createElement("option");
        option.value = ship.name;
        option.textContent = ship.name;
        vesselSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error loading ships:", error);
    });
};
