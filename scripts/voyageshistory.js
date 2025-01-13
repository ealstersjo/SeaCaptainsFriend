const tempHistory = () =>
  fetch("../data/voyagehistory.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching voyage data:", error);
    });

export const voyageshistory = async (contentArea) => {
  const localHistory = JSON.parse(localStorage.getItem("voyageHistory"));
  console.log(localHistory);
  const history = await tempHistory();
  if (history) {
    const voyageList = history.voyageHistory
      .map((voyage, index) => {
        const title = `${voyage.cargo.type} from ${voyage.portOfLoading} to ${voyage.portOfDischarge}`;

        return `
          <div>
            <h2 class="voyage-title" data-index="${index}">${title}</h2>
            <div class="voyage-details" id="voyage-${index}" style="display: none;">
              <p><strong>Vessel:</strong> ${voyage.vessel}</p>
              <p><strong>Date:</strong> ${voyage.date}</p>
              <p><strong>Arrival Date:</strong> ${voyage.arrivalDate}</p>
              <p><strong>Voyage Number:</strong> ${voyage.voyageNumber}</p>
              <p><strong>PNI Number:</strong> ${voyage.pniNumber}</p>
              <p><strong>Loading Terminal:</strong> ${
                voyage.loadingTerminal
              }</p>
              <p><strong>Discharge Terminal:</strong> ${
                voyage.dischargeTerminal
              }</p>
              <p><strong>Cargo Quantity:</strong> ${voyage.cargo.quantity} ${
          voyage.cargo.unit
        }</p>
              <p><strong>Cargo Hazard Class:</strong> ${
                voyage.cargo.hazardClass
              }</p>
              <p><strong>Crew:</strong></p>
              <ul>
                <li>Chief Officer: ${voyage.crew.chiefOfficer}</li>
                <li>Second Officer 1: ${voyage.crew.secondOfficer1}</li>
                <li>Second Officer 2: ${voyage.crew.secondOfficer2}</li>
                <li>Master: ${voyage.crew.master}</li>
              </ul>
              <p><strong>Tanks:</strong></p>
              <ul>
                ${voyage.tanks
                  .map(
                    (tank) =>
                      `<li>${tank.name}: GOV: ${tank.GOV}, Temp: ${tank.Temp}°C</li>`
                  )
                  .join("")}
              </ul>
            </div>
          </div>
        `;
      })
      .join("");

    contentArea.innerHTML = `
        <div>
          <h1>Voyages History</h1>
          ${voyageList}
        </div>
      `;

    // Event listener for expanding and collapsing the voyage details
    document.querySelectorAll(".voyage-title").forEach((title) => {
      title.addEventListener("click", () => {
        const index = title.getAttribute("data-index");
        const details = document.getElementById(`voyage-${index}`);
        const isVisible = details.style.display === "block";
        details.style.display = isVisible ? "none" : "block";
      });
    });
  }
};
