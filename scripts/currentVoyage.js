export const currentVoyagePage = (contentArea) => {
  const currentVoyage = localStorage.getItem("currentVoyage");
  if (currentVoyage) {
    const voyageData = JSON.parse(currentVoyage);
    contentArea.innerHTML = `
            <h1>Current Voyage</h1>
            <div class="voyage-info">
                <div class="voyage-item">
                    <strong>Vessel:</strong> ${voyageData.vessel || "N/A"}
                </div>
                <div class="voyage-item">
                    <strong>Date:</strong> ${voyageData.date || "N/A"}
                </div>
                <div class="voyage-item">
                    <strong>Est. Arrival Date:</strong> ${
                      voyageData.arrivalDate || "N/A"
                    }
                </div>
                <div class="voyage-item">
                    <strong>PNI #:</strong> ${voyageData.pniNumber || "N/A"}
                </div>
                <div class="voyage-item">
                    <strong>Port of Loading:</strong> ${
                      voyageData.portOfLoading || "N/A"
                    }
                </div>
                <div class="voyage-item">
                    <strong>Port of Discharge:</strong> ${
                      voyageData.portOfDischarge || "N/A"
                    }
                </div>
                <div class="voyage-item">
                    <strong>Cargo:</strong> ${voyageData.cargo || "N/A"}
                </div>
            </div>
        `;
  } else {
    contentArea.innerHTML = `
            <h1>Current Voyage</h1>
            <p>No current voyage available.</p>
        `;
  }
};
