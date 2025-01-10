import { currentVoyagePage } from "./currentVoyage.js";
import { checklists } from "./checklists.js";
import { statementOfFact } from "./statementoffact.js";
import { handleVoyage } from "./handleVoyage.js";
import { fileupload } from "./fileupload.js";
import { calculations } from "./calculations.js";
import { voyageshistory } from "./voyageshistory.js";
import { account } from "./account.js";
import { loadingLog } from "./loadinglog.js";
import { dischargeLog } from "./dischargelog.js";
import { showShipPage } from "./showShips.js";

/* // Kontrollera om användaren är inloggad
if (localStorage.getItem("loggedIn") !== "true") {
  // Redirecta tillbaka till inloggningssidan om användaren inte är inloggad
  window.location.href = "index.html";
} */

document.addEventListener("DOMContentLoaded", () => {
  // Hämta referenser till menylänkarna
  const currentVoyageLink = document.getElementById("currentvoyage");
  const statementOfFactLink = document.getElementById("statementoffact");
  const handleVoyageLink = document.getElementById("handlevoyage");
  const handleCalculations = document.getElementById("handlecalculations");
  const handleFileUpload = document.getElementById("fileupload");
  const handleChecklists = document.getElementById("checklists");
  const handleVoyagesHistory = document.getElementById("voyageshistory");
  const handleAccount = document.getElementById("accountMenu");
  const handleLoadingLog = document.getElementById("loadingLog");
  const handleDischargeLog = document.getElementById("dischargeLog");
  const handleShowShip = document.getElementById("shipInfo");

  // Hämta referens till innehållsområdet
  const contentArea = document.querySelector(".content");

  const loadVoyagesHistory = async () => {
    voyageshistory(contentArea);
  };
  const loadCalculations = async () => {
    calculations(contentArea);
  };

  const loadFileUpload = async () => {
    fileupload(contentArea);
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

  const loadAccount = () => {
    account(contentArea);
  };

  const loadLoadingLog = () => {
    loadingLog(contentArea);
  };
  const loadDischargeLog = () => {
    dischargeLog(contentArea);
  };
  const loadShipInfo = () => {
    showShipPage(contentArea);
  };

  // När användaren klickar på respektive menyalternativ
  currentVoyageLink.addEventListener("click", loadCurrentVoyage);
  statementOfFactLink.addEventListener("click", loadStatementOfFact);
  handleVoyageLink.addEventListener("click", loadHandleVoyage);
  handleCalculations.addEventListener("click", loadCalculations);
  handleChecklists.addEventListener("click", loadChecklists);
  handleFileUpload.addEventListener("click", loadFileUpload);
  handleVoyagesHistory.addEventListener("click", loadVoyagesHistory);
  handleAccount.addEventListener("click", loadAccount);
  handleLoadingLog.addEventListener("click", loadLoadingLog);
  handleDischargeLog.addEventListener("click", loadDischargeLog);
  handleShowShip.addEventListener("click", loadShipInfo);

  loadChecklists();
});
