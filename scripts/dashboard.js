import { currentVoyagePage } from "./currentVoyage.js";
import { checklists } from "./checklists.js";
import { statementOfFact } from "./statementoffact.js";
import { account } from "./account.js";
import { protests } from "./protests.js";
import { settings } from "./settings.js";
import { noticeOfReadiness } from "./printNor.js";
import { cleanlinessTankCertificate } from "./printCleanTanks.js";
import { slop } from "./slop.js";
import { receivingCapacity } from "./reccap.js";
import { loadOrDischargeLog } from "./loadordischargelog.js";
import { pumppressure } from "./pumppressurestatement.js";

// Funktion för att visa en sektion och dölja de andra
const showSection = (sectionId) => {
  // Dölj alla sektioner genom att sätta display: none
  const sections = document.querySelectorAll(".content > div");
  sections.forEach((section) => {
    section.style.display = "none"; // Döljer alla sektioner
    section.innerHTML = ""; // Tömmer alla sektioners innehåll (kan anpassas om du vill bevara tillstånd)
  });

  // Visa den valda sektionen och rendera nytt innehåll
  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.style.display = "block"; // Gör sektionen synlig
    // Rendera nytt innehåll beroende på sektion (om så behövs)
    if (sectionId === "currentvoyagediv") {
      currentVoyagePage(selectedSection); // Rendera aktuell resa
    } else if (sectionId === "sofdiv") {
      statementOfFact(selectedSection); // Exempel på funktion för att rendera Statement of Fact
    } else if (sectionId === "checklistdiv") {
      checklists(selectedSection); // Rendera checklistor
    } else if (sectionId === "accountdiv") {
      account(selectedSection); // Rendera konto
    } else if (sectionId === "settingsdiv") {
      settings(selectedSection); // Rendera inställningar
    } else if (sectionId === "nordiv") {
      noticeOfReadiness(selectedSection); // Rendera NOR
    } else if (sectionId === "cleandiv") {
      cleanlinessTankCertificate(selectedSection); // Rendera Cleanliness Tank
    } else if (sectionId === "slopdiv") {
      slop(selectedSection);
    } else if (sectionId === "reccapdiv") {
      receivingCapacity(selectedSection);
    } else if (sectionId === "logdiv") {
      loadOrDischargeLog(selectedSection);
    } else if (sectionId === "ppsdiv") {
      pumppressure(selectedSection);
    } else if (sectionId === "protestdiv") {
      protests(selectedSection);
    }
    // Lägg till renderingslogik för andra sektioner om så behövs
  }
};

// När användaren klickar på respektive menyalternativ
document.addEventListener("DOMContentLoaded", () => {
  const currentVoyageLink = document.getElementById("currentvoyage");
  const statementOfFactLink = document.getElementById("statementoffact");
  const handleAccount = document.getElementById("accountMenu");
  const handleChecklists = document.getElementById("checklists");
  const handleSettings = document.getElementById("settings");
  const handleNOR = document.getElementById("printNoR");
  const handleClean = document.getElementById("printclean");
  const handleSlop = document.getElementById("slop");
  const handleRecCap = document.getElementById("recCapStatement");
  const handleLoadingLog = document.getElementById("loadingLog");
  const handlePumpStatement = document.getElementById("pumpstatement");
  const handleProtests = document.getElementById("protests");

  // Klickhändelser för att visa respektive sektion
  currentVoyageLink.addEventListener("click", () =>
    showSection("currentvoyagediv")
  );
  statementOfFactLink.addEventListener("click", () => showSection("sofdiv"));
  handleAccount.addEventListener("click", () => showSection("accountdiv"));
  handleChecklists.addEventListener("click", () => showSection("checklistdiv"));
  handleSettings.addEventListener("click", () => showSection("settingsdiv"));
  handleNOR.addEventListener("click", () => showSection("nordiv"));
  handleClean.addEventListener("click", () => showSection("cleandiv"));
  handleSlop.addEventListener("click", () => {
    showSection("slopdiv");
  });
  handleRecCap.addEventListener("click", () => {
    showSection("reccapdiv");
  });
  handleLoadingLog.addEventListener("click", () => {
    showSection("logdiv");
  });
  handlePumpStatement.addEventListener("click", () => {
    showSection("ppsdiv");
  });
  handleProtests.addEventListener("click", () => showSection("protestdiv"));

  // Ladda en sektion direkt vid start (om du vill ha en default)
  showSection("currentvoyagediv"); // Här visas till exempel Statement of Fact vid start
});
