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
import { protests } from "./protests.js";
import { settings } from "./settings.js";
import { noticeOfReadiness } from "./printNor.js";
import { cleanlinessTankCertificate } from "./printCleanTanks.js";

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
  const handleProtests = document.getElementById("protests");
  const handleSettings = document.getElementById("settings");
  const handleNOR = document.getElementById("printNoR");
  const handleClean = document.getElementById("printclean");

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
  const loadProtests = () => {
    protests(contentArea);
  };
  const loadSettings = () => {
    settings(contentArea);
  };

  const loadNOR = () => {
    noticeOfReadiness(contentArea);
  };

  const loadClean = () => {
    cleanlinessTankCertificate(contentArea);
  };

  // När användaren klickar på respektive menyalternativ
  currentVoyageLink.addEventListener("click", loadCurrentVoyage);
  statementOfFactLink.addEventListener("click", loadStatementOfFact);
  handleAccount.addEventListener("click", loadAccount);
  handleChecklists.addEventListener("click", loadChecklists);
  handleSettings.addEventListener("click", loadSettings);
  handleNOR.addEventListener("click", loadNOR);
  handleClean.addEventListener("click", loadClean);
  /*  handleVoyageLink.addEventListener("click", loadHandleVoyage);
  handleCalculations.addEventListener("click", loadCalculations);
  handleFileUpload.addEventListener("click", loadFileUpload);
  handleVoyagesHistory.addEventListener("click", loadVoyagesHistory);
  handleLoadingLog.addEventListener("click", loadLoadingLog);
  handleDischargeLog.addEventListener("click", loadDischargeLog);
  handleShowShip.addEventListener("click", loadShipInfo);
  handleProtests.addEventListener("click", loadProtests); */

  loadClean();
});
