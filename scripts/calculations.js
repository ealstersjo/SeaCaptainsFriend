import {
  handleStabilityReport,
  printStabilityTable,
} from "./stabilityReport.js";

export const calculations = async (contentArea) => {
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
