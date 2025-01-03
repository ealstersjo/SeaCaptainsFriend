// Kontrollera om användaren är inloggad
if (localStorage.getItem("loggedIn") !== "true") {
  // Redirecta tillbaka till inloggningssidan om användaren inte är inloggad
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  // Hämta referenser till menylänkarna
  const currentVoyageLink = document.getElementById("currentvoyage");
  const statementOfFactLink = document.getElementById("statementoffact");
  const handelVoyageLink = document.getElementById("handlevoyage");

  // Hämta referens till innehållsområdet
  const contentArea = document.querySelector(".content");

  // Funktion för att ladda aktuell resa
  const loadCurrentVoyage = () => {
    const currentVoyage = localStorage.getItem("currentVoyage");
    if (currentVoyage) {
      const voyageData = JSON.parse(currentVoyage);
      contentArea.innerHTML = `
        <h1>Current Voyage</h1>
        <table>
          <tr>
            <th>Vessel</th>
            <td>${voyageData.vessel}</td>
            <th>Date</th>
            <td>${voyageData.date}</td>
            <th>PNI #</th>
            <td>${voyageData.pniNumber}</td>
          </tr>
        </table>
      `;
    } else {
      contentArea.innerHTML = `
        <h1>Current Voyage</h1>
        <p>No current voyage available.</p>
      `;
    }
  };

  // Funktion för att ladda Statement of Fact (kan anpassas för dynamiska data)
  const loadStatementOfFact = () => {
    const currentVoyage = localStorage.getItem("currentVoyage");
    if (currentVoyage) {
      const voyageData = JSON.parse(currentVoyage);
      contentArea.innerHTML = `
        <h1>Statement of Fact</h1>
        <table>
          <tr>
            <th>Vessel</th>
            <td>${voyageData.vessel}</td>
            <th>Date</th>
            <td>${voyageData.date}</td>
            <th>PNI #</th>
            <td>${voyageData.pniNumber}</td>
          </tr>
        </table>
      `;
    } else {
      contentArea.innerHTML = `
        <h1>Statement of Fact</h1>
        <p>No current voyage available to display Statement of Fact.</p>
      `;
    }
  };

  const loadHandleVoyage = () => {
    const contentArea = document.querySelector(".content");

    // Visa formuläret för att hantera resan
    contentArea.innerHTML = `
      <h1>Handle Voyage</h1>
      <form id="voyageForm">
        <div>
          <label for="vessel">Vessel:</label>
          <input type="text" id="vessel" name="vessel" required />
        </div>
        <div>
          <label for="date">Date:</label>
          <input type="date" id="date" name="date" required />
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
          <label for="cargo">Cargo:</label>
          <textarea id="cargo" name="cargo"></textarea>
        </div>
        <div>
          <button type="submit">Save Voyage</button>
        </div>
      </form>
    `;

    // Hantera formulärens inlämning
    const voyageForm = document.getElementById("voyageForm");
    voyageForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Hämta värden från formuläret
      const vessel = document.getElementById("vessel").value;
      const date = document.getElementById("date").value;
      const pniNumber = document.getElementById("pniNumber").value;
      const portOfLoading = document.getElementById("portOfLoading").value;
      const portOfDischarge = document.getElementById("portOfDischarge").value;
      const cargo = document.getElementById("cargo").value;

      // Skapa ett objekt för resan
      const currentVoyage = {
        vessel,
        date,
        pniNumber,
        portOfLoading,
        portOfDischarge,
        cargo,
      };

      // Spara resan i localStorage
      localStorage.setItem("currentVoyage", JSON.stringify(currentVoyage));

      // Bekräfta för användaren
      alert("Current voyage has been saved!");

      // Ladda om sidan för att uppdatera innehållet
      loadCurrentVoyage();
    });
  };

  // När användaren klickar på respektive menyalternativ
  currentVoyageLink.addEventListener("click", loadCurrentVoyage);
  statementOfFactLink.addEventListener("click", loadStatementOfFact);
  handelVoyageLink.addEventListener("click", loadHandleVoyage);

  // Ladda standardinnehåll (Current Voyage)
  loadCurrentVoyage();
});
