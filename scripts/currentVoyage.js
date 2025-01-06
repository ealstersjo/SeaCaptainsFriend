const tempVoyage = () =>
  fetch("../data/currentVoyage.json")
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      return JSON.stringify(data); // Returnera datan
    })
    .catch((error) => {
      console.error("Error fetching voyage data:", error);
    });

export const currentVoyagePage = async (contentArea) => {
  //const currentVoyage = localStorage.getItem("currentVoyage");
  const currentVoyage = await tempVoyage();
  if (currentVoyage) {
    const voyageData = JSON.parse(currentVoyage);
    contentArea.innerHTML = `
  <h1>Current Voyage</h1>
  <div class="voyage-info">
    <div class="row">
      <div class="voyage-item">
        <strong>Vessel:</strong> ${voyageData.vessel || "N/A"}
      </div>
      <div class="voyage-item">
        <strong>PNI #:</strong> ${voyageData.pniNumber || "N/A"}
      </div>
     
    </div>
    
    <div class="row">
     <div class="voyage-item">
        <strong>Loading date:</strong> ${voyageData.date || "N/A"}
      </div>
      <div class="voyage-item">
        <strong>Est. Arrival Date:</strong> ${voyageData.arrivalDate || "N/A"}
      </div>
      
    </div>

    <div class="row">
      <div class="voyage-item">
        <strong>Port of Loading:</strong> ${voyageData.portOfLoading || "N/A"}
      </div>
      <div class="voyage-item">
        <strong>Port of Discharge:</strong> ${
          voyageData.portOfDischarge || "N/A"
        }
      </div>
      <div class="voyage-item">
        <strong>Terminal:</strong> ${voyageData.loadingTerminal || "N/A"}
      </div>
      <div class="voyage-item">
        <strong>Terminal:</strong> ${voyageData.dischargeTerminal || "N/A"}
      </div>
    </div>

    <div class="row">
      <div class="voyage-item">
        <strong>Cargo:</strong> ${voyageData.cargo.type || "N/A"}
        <p>Volume: ${voyageData.cargo.quantity || "N/A"} ${
      voyageData.cargo.unit || "N/A"
    }</p>
      </div>
    </div>

    <div class="row">
      <div class="voyage-item">
        <strong>Crew:</strong>
        <p>Master: ${voyageData.crew.master || "N/A"}</p>
        <p>Chief Officer: ${voyageData.crew.chiefOfficer || "N/A"}</p>
        <p>Second Officer 1: ${voyageData.crew.secondOfficer1 || "N/A"}</p>
        <p>Second Officer 2: ${voyageData.crew.secondOfficer2 || "N/A"}</p>
      </div>
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
