import { loadingLog } from "./loadinglog.js";
import { dischargeLog } from "./dischargelog.js";
import { loadlog } from "./loadlog.js";

export const loadOrDischargeLog = (contentArea) => {
  const voyages = JSON.parse(localStorage.getItem("currentVoyage")) || [];
  const shipSettings = JSON.parse(localStorage.getItem("shipSettings")) || {
    shipName: "",
  };

  let selectedVoyageIndex = localStorage.getItem("selectedVoyageIndex");
  let selectedVoyage;

  if (selectedVoyageIndex) {
    selectedVoyage = voyages[selectedVoyageIndex];
  }

  const generateVoyageSelect = () => {
    return `
    <p>Select a voyage to log</p>
    <select id="voyageSelect">
      <option value="" selected disabled>Select trip</option>
      ${voyages
        .map(
          (voyage, index) => `
        <option value="${index}" ${
            index == selectedVoyageIndex ? "selected" : ""
          }>${voyage.vessel} from ${voyage.from} to ${voyage.to}</option>
      `
        )
        .join("")}
    </select>
  `;
  };

  // Set up the content structure
  contentArea.innerHTML = `<div>${generateVoyageSelect()}</div>`;

  // Create and append log container
  const logContainer = document.createElement("div");
  contentArea.appendChild(logContainer);

  // Initial render of appropriate log
  if (selectedVoyage && selectedVoyage.operation) {
    if (selectedVoyage.operation.toLowerCase() === "loading") {
      loadlog(logContainer, selectedVoyage, 0);
    } else if (selectedVoyage.operation.toLowerCase() === "discharging") {
      dischargeLog(logContainer);
    }
  }

  contentArea.addEventListener("change", (e) => {
    if (e.target.id === "voyageSelect") {
      selectedVoyageIndex = e.target.value;
      localStorage.setItem("selectedVoyageIndex", selectedVoyageIndex);
      selectedVoyage = voyages[selectedVoyageIndex];
      // Clear and update the log container
      logContainer.innerHTML = "";
      if (selectedVoyage.operation) {
        if (selectedVoyage.operation.toLowerCase() === "loading") {
          loadlog(logContainer, selectedVoyage, 0);
        } else if (selectedVoyage.operation.toLowerCase() === "discharging") {
          dischargeLog(logContainer);
        }
      }
    }
  });
};
