// Hämta skeppsnamn
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

export const handleVoyage = (contentArea) => {
  const currentVoyage = JSON.parse(localStorage.getItem("currentVoyage")) || {};

  // Visa formuläret för att hantera resan
  contentArea.innerHTML = `
      <h1>Handle Voyage</h1>
      <form id="voyageForm">
        <div>
          <label for="vessel">Vessel:</label>
              <select id="vessel" name="vessel" required>
       </select>
        </div>
        <div>
          <label for="date">Start date:</label>
          <input type="date" id="date" name="date" value="${
            currentVoyage.date || new Date().toISOString().split("T")[0]
          }" required />
        </div>
        <div>
          <label for="pniNumber">PNI #:</label>
          <input type="text" id="pniNumber" name="pniNumber" value="${
            currentVoyage.pniNumber || ""
          }" required />
        </div>
        <div>
          <label for="portOfLoading">Port of Loading:</label>
          <input type="text" id="portOfLoading" name="portOfLoading" value="${
            currentVoyage.portOfLoading || ""
          }" />
        </div>
        <div>
          <label for="portOfDischarge">Port of Discharge:</label>
          <input type="text" id="portOfDischarge" name="portOfDischarge" value="${
            currentVoyage.portOfDischarge || ""
          }" />
        </div>
        <div>
          <label for="date">Estimated date of arrival:</label>
          <input type="date" id="arrivalDate" name="arrivalDate" value="${
            currentVoyage.arrivalDate || ""
          }" required />
        </div>
        <div>
          <label for="cargo">Cargo:</label>
          <textarea id="cargo" name="cargo">${
            currentVoyage.cargo || ""
          }</textarea>
        </div>
        <div>
          <button type="submit">Save Voyage</button>
          <button type="button" id="deleteVoyageButton">Delete Current Voyage</button>
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
    const portOfDischarge = document.getElementById("portOfDischarge").value;
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
    alert("Current voyage has been saved!");
  });

  // Hantera borttagning av currentVoyage
  const deleteVoyageButton = document.getElementById("deleteVoyageButton");
  deleteVoyageButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete the current voyage?")) {
      // Ta bort currentVoyage från localStorage
      localStorage.removeItem("currentVoyage");

      // Bekräfta för användaren
      alert("Current voyage has been deleted!");

      // Uppdatera sidan för att visa att ingen resa är aktiv
      loadCurrentVoyage();
    }
  });
};
