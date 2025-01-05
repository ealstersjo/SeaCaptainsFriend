import {
  handleStabilityReport,
  printStabilityTable,
} from "./stabilityReport.js";
import { currentVoyagePage } from "./currentVoyage.js";
import { checklists } from "./checklists.js";
import { statementOfFact } from "./statementoffact.js";
import { handleVoyage } from "./handleVoyage.js";
/* // Kontrollera om användaren är inloggad
if (localStorage.getItem("loggedIn") !== "true") {
  // Redirecta tillbaka till inloggningssidan om användaren inte är inloggad
  window.location.href = "index.html";
} */

document.addEventListener("DOMContentLoaded", () => {
  // Hämta referenser till menylänkarna
  const currentVoyageLink = document.getElementById("currentvoyage");
  const statementOfFactLink = document.getElementById("statementoffact");
  const handelVoyageLink = document.getElementById("handlevoyage");
  const handelCalculations = document.getElementById("handlecalculations");
  const handleChecklists = document.getElementById("checklists");

  // Hämta referens till innehållsområdet
  const contentArea = document.querySelector(".content");

  const loadCalculations = async () => {
    // Gör loadCalculations asynkron
    contentArea.innerHTML = `
      <div>
        <h1>Read file</h1>
        <h3>Stability report</h3>
        <button type="load" id="loadstability">Load file</button>
        <div id="tableContainerStability"></div>
        <h3>Ullage report</h3>
        <button type="load" id="loadullage">Load file</button>
        <div id="tableContainerUllage"></div>
      </div>`;

    const loadingStabilityFile = document.getElementById("loadstability");
    loadingStabilityFile.addEventListener("click", async () => {
      // Gör event listenern asynkron
      try {
        const filehandle = await handleStabilityReport(); // Vänta på att filen ska läsas in

        // När filen är laddad, skriv ut tabellen
        if (filehandle && filehandle.length > 0) {
          printStabilityTable(filehandle);
        }
      } catch (error) {
        console.error("Error loading stability report:", error);
      }
    });
  };

  const loadChecklists = () => {
    checklists(contentArea);
  };

  // Funktion för att ladda aktuell resa
  const loadCurrentVoyage = () => {
    currentVoyagePage(contentArea);
  };

  // Funktion för att ladda Statement of Fact (kan anpassas för dynamiska data)
  const loadStatementOfFact = () => {
    statementOfFact(contentArea);
  };

  const loadHandleVoyage = () => {
    handleVoyage(contentArea);
  };

  // När användaren klickar på respektive menyalternativ
  currentVoyageLink.addEventListener("click", loadCurrentVoyage);
  statementOfFactLink.addEventListener("click", loadStatementOfFact);
  handelVoyageLink.addEventListener("click", loadHandleVoyage);
  handelCalculations.addEventListener("click", loadCalculations);
  handleChecklists.addEventListener("click", loadChecklists);

  // Ladda standardinnehåll (Current Voyage)
  loadCurrentVoyage();
});
