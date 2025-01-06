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
            <label for="voyageNumber">Voyage number:</label>
            <input type="text" id="voyageNumber" name="voyageNumber" required />
          </div>
          <div>
            <label for="pniNumber">PNI #:</label>
            <input type="text" id="pniNumber" name="pniNumber" required />
          </div>
          <div>
            <label for="portOfLoading">Port of Loading:</label>
            <input type="text" id="portOfLoading" name="portOfLoading" required/>
          </div>
          <div>
            <label for="portOfDischarge">Port of Discharge:</label>
            <input type="text" id="portOfDischarge" name="portOfDischarge" required />
          </div>
          <div>
            <label for="arrivalDate">Estimated date of arrival:</label>
            <input type="date" id="arrivalDate" name="arrivalDate" />
          </div>
          <div>
            <h3>Cargo</h3>
            <label for="type">Cargo:</label>
            <input type="text" id="type" name="type" required/>
          </div>
          <div>
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" />
          </div>
          <div>
            <label for="unit">Unit:</label>
            <input type="text" id="unit" name="unit" />
          </div>
          <div>
            <label for="cargo">Hazard class:</label>
            <textarea id="hazard" name="hazard" ></textarea>
          </div>
          <div>
          <h3>Crew</h3>
            <label for="master">Master:</label>
            <input type="text" id="master" name="master" required/>
          </div>
          <div>
            <label for="chiefOfficer">Chief Officer:</label>
            <input type="text" id="chiefOfficer" name="chiefOfficer" required/>
          </div>
          <div>
            <label for="secondOfficer1">Second Officer:</label>
            <input type="text" id="secondOfficer1" name="secondOfficer1" />
          </div>
          <div>
            <label for="secondOfficer2">Second Officer:</label>
            <input type="text" id="secondOfficer2" name="secondOfficer2" />
          </div>
          <div>
            <button type="submit">Commence Voyage</button>
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
        const pniNumber = document.getElementById("voyageNumber").value;
        const voyageNumber = document.getElementById("pniNumber").value;

        const portOfLoading = document.getElementById("portOfLoading").value;
        const portOfDischarge =
          document.getElementById("portOfDischarge").value;
        const type = document.getElementById("type").value;
        const unit = document.getElementById("unit").value;
        const quantity = document.getElementById("quantity").value;
        const hazard = document.getElementById("hazard").value;
        const master = document.getElementById("master").value;
        const chiefOfficer = document.getElementById("chiefOfficer").value;
        const secondOfficer1 = document.getElementById("secondOfficer1").value;
        const secondOfficer2 = document.getElementById("secondOfficer2").value;

        // Skapa ett objekt för resan
        const currentVoyage = {
          vessel,
          date,
          arrivalDate,
          pniNumber,
          voyageNumber,
          portOfLoading,
          portOfDischarge,
          cargo: {
            type,
            quantity,
            unit,
            hazard,
          },
          crew: {
            master,
            chiefOfficer,
            secondOfficer1,
            secondOfficer2,
          },
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
