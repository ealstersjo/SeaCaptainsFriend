import {
  handleStabilityReport,
  printStabilityTable,
} from "./stabilityReport.js";
import { currentVoyagePage } from "./currentVoyage.js";
import { checklists } from "./checklists.js";
import { statementOfFact } from "./statementoffact.js";
import { handleVoyage } from "./handleVoyage.js";
import { calculations } from "./calculations.js";
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
    calculations(contentArea);
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
