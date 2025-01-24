export const handleVoyage = (contentArea) => {
  const voyageStart = JSON.parse(localStorage.getItem("voyageStart"));

  // Om voyageStart inte finns i localStorage, visa alternativet att börja en ny resa
  if (!voyageStart) {
    contentArea.innerHTML = `
      <h1>There is no current voyage.</h1>
      <h3>Would you like to commence a new voyage?</h3>
      <button id="commenceVoyageButton" type="commence">Commence Voyage</button>
      <button id="deleteVoyageButton" type="deleteButton">Delete Current Voyage</button>
            <button id="deleteHistoryButton" type="deleteButton">Delete Voyage History</button>

    `;

    const commenceVoyageButton = document.getElementById(
      "commenceVoyageButton"
    );
    const deleteHistoryButton = document.getElementById("deleteHistoryButton");

    deleteHistoryButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete the current voyage?")) {
        localStorage.removeItem("voyagehistory");

        alert("Current voyage has been deleted!");
        handleVoyage(contentArea); // Ladda om innehållet
      }
    });

    const deleteVoyageButton = document.getElementById("deleteVoyageButton");

    deleteVoyageButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete the current voyage?")) {
        localStorage.removeItem("voyageStart");

        alert("Current voyage has been deleted!");
        handleVoyage(contentArea); // Ladda om innehållet
      }
    });

    // Hantera när knappen trycks för att börja en ny resa
    commenceVoyageButton.addEventListener("click", () => {
      contentArea.innerHTML = `
        <h1>Commence Voyage</h1>
        <h3>Have you done these?</h3>
        <form id="voyageForm">
          <label class="custom-checkbox">
            <input type="checkbox" id="stowageCalculated" required />
              <span class="checkmark"></span>

            Calculated the stowage
          </label><br />
          <label class="custom-checkbox">
            <input type="checkbox" id="canTakeLoad" required />
                          <span class="checkmark"></span>

            Can we take the load?
          </label><br />
          <label class="custom-checkbox">
            <input type="checkbox" id="sentRequest" required />
                          <span class="checkmark"></span>

            Sent request to chartering?
          </label><br />
          <button type="submit" id="nextStepButton">Move on to Nomination</button>
          <button type="button" id="backButton">Back</button>
          <button id="deleteVoyageButton" type="deleteButton">Delete Current Voyage</button>
        </form>
      `;

      const voyageForm = document.getElementById("voyageForm");
      const nextStepButton = document.getElementById("nextStepButton");
      const backButton = document.getElementById("backButton");

      voyageForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const voyageStart = {
          stowageRequest: {
            stowageCalculated:
              document.getElementById("stowageCalculated").checked,
            canTakeLoad: document.getElementById("canTakeLoad").checked,
            sentRequest: document.getElementById("sentRequest").checked,
          },
          currentStep: "Nomination",
        };

        localStorage.setItem("voyageStart", JSON.stringify(voyageStart));
        alert("Voyage started! Moving to Nomination...");
        handleVoyage(contentArea);
      });

      backButton.addEventListener("click", () => {
        handleVoyage(contentArea); // Återställ till start
      });
    });
  } else if (voyageStart.currentStep === "Nomination") {
    // Om voyageStart finns, visa användarens framsteg och aktuellt steg
    contentArea.innerHTML = `
      <h1>Nomination</h1>
      <h3>Current Voyage Progress</h3>
      <pre>${JSON.stringify(voyageStart, null, 2)}</pre>
      
      <form id="nominationForm">
        <label for="shipSelect">Select Ship:</label>
        <select id="shipSelect" required>
          <option value="">Select Ship</option>
          <option value="Ship 1">Ship 1</option>
          <option value="Ship 2">Ship 2</option>
          <option value="Ship 3">Ship 3</option>
        </select><br />

        <label for="departureDate">Departure Date:</label>
        <input type="date" id="departureDate" required /><br />

        <label for="loadingPort">Loading Port:</label>
        <input type="text" id="loadingPort" required /><br />

        <label for="loadingTerminal">Loading Terminal:</label>
        <input type="text" id="loadingTerminal" required /><br />

        <label for="arrivalDate">Estimated Arrival Date:</label>
        <input type="date" id="arrivalDate" required /><br />

        

        <label for="dischargePort">Discharge Port:</label>
        <input type="text" id="dischargePort" required /><br />

        <label for="dischargeTerminal">Discharge Terminal:</label>
        <input type="text" id="dischargeTerminal" required /><br />

        <label class="custom-checkbox">
          <input type="checkbox" id="documentationChecked" />
                        <span class="checkmark"></span>

          All documentation and licenses in order
          
        </label><br />

        <button type="submit" id="nominationSubmit">Submit Nomination</button>
        <button type="button" id="backButton">Back</button>
        <button id="deleteVoyageButton" type="deleteButton">Delete Current Voyage</button>
      </form>
    `;

    // Hantera formulärens inlämning
    const nominationForm = document.getElementById("nominationForm");
    const nominationSubmitButton = document.getElementById("nominationSubmit");
    const backButton = document.getElementById("backButton");

    nominationForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nomination = {
        ship: document.getElementById("shipSelect").value,
        departureDate: document.getElementById("departureDate").value,
        arrivalDate: document.getElementById("arrivalDate").value,
        loadingPort: document.getElementById("loadingPort").value,
        loadingTerminal: document.getElementById("loadingTerminal").value,
        dischargePort: document.getElementById("dischargePort").value,
        dischargeTerminal: document.getElementById("dischargeTerminal").value,
        documentationChecked: document.getElementById("documentationChecked")
          .checked,
      };

      // Uppdatera voyageStart med Nomination-data
      voyageStart.nomination = nomination;
      voyageStart.currentStep = "Voyage Order & Charter Party";

      localStorage.setItem("voyageStart", JSON.stringify(voyageStart));
      alert("Nomination submitted! Moving to Voyage Order...");
      handleVoyage(contentArea);
    });

    backButton.addEventListener("click", () => {
      handleVoyage(contentArea); // Återställ till föregående steg
    });

    // Hantera borttagning av voyageStart
    const deleteVoyageButton = document.getElementById("deleteVoyageButton");
    deleteVoyageButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete the current voyage?")) {
        localStorage.removeItem("voyageStart");
        alert("Current voyage has been deleted!");
        handleVoyage(contentArea); // Ladda om innehållet
      }
    });
  } else if (voyageStart.currentStep === "Voyage Order & Charter Party") {
    // Visa Voyage Order & Charter Party-formulär
    contentArea.innerHTML = `
      <h1>Voyage Order & Charter Party</h1>
      <h3>Current Voyage Progress</h3>
      <pre>${JSON.stringify(voyageStart, null, 2)}</pre>
      
      <form id="voyageOrderForm">
        <label class="custom-checkbox">
          <input type="checkbox" id="charterPartyAchieved" />
                        <span class="checkmark"></span>

          Charter Party achieved
        </label><br />

        <label class="custom-checkbox">
          <input type="checkbox" id="detailsCommunicated" />
                        <span class="checkmark"></span>

          Details communicated
        </label><br />

        <button type="submit" id="voyageOrderSubmit">Submit Voyage Order</button>
        <button type="button" id="backButton">Back</button>
        <button id="deleteVoyageButton" type="deleteButton">Delete Current Voyage</button>
      </form>
    `;

    const voyageOrderForm = document.getElementById("voyageOrderForm");
    const voyageOrderSubmitButton =
      document.getElementById("voyageOrderSubmit");
    const backButton = document.getElementById("backButton");

    voyageOrderForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const voyageOrder = {
        charterPartyAchieved: document.getElementById("charterPartyAchieved")
          .checked,
        detailsCommunicated: document.getElementById("detailsCommunicated")
          .checked,
      };

      // Uppdatera voyageStart med Voyage Order-data
      voyageStart.voyageOrder = voyageOrder;
      voyageStart.currentStep = "Start of Statement of Facts";

      localStorage.setItem("voyageStart", JSON.stringify(voyageStart));
      alert("Voyage Order submitted! Time to create SoF.");
      handleVoyage(contentArea);
    });

    backButton.addEventListener("click", () => {
      handleVoyage(contentArea); // Återgå till föregående steg
    });

    // Hantera borttagning av voyageStart
    const deleteVoyageButton = document.getElementById("deleteVoyageButton");
    deleteVoyageButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete the current voyage?")) {
        localStorage.removeItem("voyageStart");
        alert("Current voyage has been deleted!");
        handleVoyage(contentArea); // Ladda om innehållet
      }
    });
  } else if (voyageStart.currentStep === "Start of Statement of Facts") {
    contentArea.innerHTML = `
      <h1>Start of Statement of Facts (SoF)</h1>
      <h3>Current Voyage Progress</h3>
      <pre>${JSON.stringify(voyageStart, null, 2)}</pre>
      
      <form id="sofForm">
        <label for="vessel">Vessel (from Nomination):</label>
        <input type="text" id="vessel" value="${
          voyageStart.nomination.ship
        }"  /><br />

        <label for="date">Date (from Nomination Departure Date):</label>
        <input type="date" id="date" value="${
          voyageStart.nomination.departureDate
        }"  /><br />

        <label for="pni">PNI #:</label>
        <input type="text" id="pni" required /><br />

        <label for="loadport">Loadport (from Nomination):</label>
        <input type="text" id="loadport" value="${
          voyageStart.nomination.loadingPort
        }"  /><br />

        <label for="terminal">Terminal (from Nomination):</label>
        <input type="text" id="terminal" value="${
          voyageStart.nomination.loadingTerminal
        }"  /><br />

        <label for="customerNumber">Customer #:</label>
        <input type="text" id="customerNumber" required /><br />

        <label class="custom-checkbox">
          <input type="checkbox" id="documentsCreated" />
                        <span class="checkmark"></span>

          All documents created
        </label><br />

        <button type="submit" id="sofSubmit">Submit SoF</button>
        <button type="button" id="backButton">Back</button>
        <button id="deleteVoyageButton" type="deleteButton">Delete Current Voyage</button>
      </form>
    `;

    const sofForm = document.getElementById("sofForm");
    const backButton = document.getElementById("backButton");

    sofForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const sof = {
        vessel: document.getElementById("vessel").value,
        date: document.getElementById("date").value,
        pni: document.getElementById("pni").value,
        loadport: document.getElementById("loadport").value,
        terminal: document.getElementById("terminal").value,
        customerNumber: document.getElementById("customerNumber").value,
        documentsCreated: document.getElementById("documentsCreated").checked,
      };

      if (!sof.documentsCreated) {
        alert("Please confirm that all documents are created.");
        return;
      }

      // Save SoF data to localStorage
      localStorage.setItem("SoF", JSON.stringify(sof));

      // Update voyageStart with SoF progress
      voyageStart.sofCreated = true;
      voyageStart.currentStep = "Sea Voyage to Loading Port";

      localStorage.setItem("voyageStart", JSON.stringify(voyageStart));
      alert(
        "Statement of Facts submitted! Moving to Sea Voyage to Loading Port..."
      );
      handleVoyage(contentArea);
    });

    backButton.addEventListener("click", () => {
      handleVoyage(contentArea); // Gå tillbaka till föregående steg
    });

    // Hantera borttagning av voyageStart
    const deleteVoyageButton = document.getElementById("deleteVoyageButton");
    deleteVoyageButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete the current voyage?")) {
        localStorage.removeItem("voyageStart");
        alert("Current voyage has been deleted!");
        handleVoyage(contentArea); // Ladda om innehållet
      }
    });
  } else if (voyageStart.currentStep === "Sea Voyage to Loading Port") {
    contentArea.innerHTML = `
      <h1>Sea Voyage to Loading Port</h1>
      <h3>Current Voyage Progress</h3>
      <pre>${JSON.stringify(voyageStart, null, 2)}</pre>
      
      <form id="seaVoyageForm">
        <label class="custom-checkbox">
          <input type="checkbox" id="voyageToLoadingPort" />
          <span class="checkmark"></span>
          Arrr... All fine and dandy
        </label><br />
        
        <button type="submit" id="voyageSubmit">Confirm Voyage to Loading Port</button>
        <button type="button" id="backButton">Back</button>
        <button id="deleteVoyageButton" type="deleteButton">Delete Current Voyage</button>
      </form>
    `;

    const seaVoyageForm = document.getElementById("seaVoyageForm");
    const backButton = document.getElementById("backButton");

    seaVoyageForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const voyageToLoadingPort = document.getElementById(
        "voyageToLoadingPort"
      ).checked;

      if (!voyageToLoadingPort) {
        alert("Please confirm 'All fine and dandy' to proceed.");
        return;
      }

      // Update voyageStart with the current step
      voyageStart.voyageToLoadingPort = true;
      voyageStart.currentStep = "Loading";

      localStorage.setItem("voyageStart", JSON.stringify(voyageStart));
      alert("Voyage to Loading Port confirmed! Moving to Loading...");
      handleVoyage(contentArea);
    });

    backButton.addEventListener("click", () => {
      handleVoyage(contentArea); // Återgå till föregående steg
    });

    // Hantera borttagning av voyageStart
    const deleteVoyageButton = document.getElementById("deleteVoyageButton");
    deleteVoyageButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete the current voyage?")) {
        localStorage.removeItem("voyageStart");
        alert("Current voyage has been deleted!");
        handleVoyage(contentArea); // Ladda om innehållet
      }
    });
  } else if (voyageStart.currentStep === "Loading") {
    contentArea.innerHTML = `
      <h1>Loading</h1>
      <h3>Current Voyage Progress</h3>
      <pre>${JSON.stringify(voyageStart, null, 2)}</pre>

      <form id="loadingForm">
        

        <h3>Tank Loading</h3>
        <div class="tank-checkbox-container">
    ${Array.from(
      { length: 6 },
      (_, i) => `
      <label class="custom-checkbox">
        <input type="checkbox" id="tankC${i + 1}P" />
        <span class="checkmark"></span>
        Loaded C${i + 1}P
      </label>
      <label class="custom-checkbox">
        <input type="checkbox" id="tankC${i + 1}S" />
        <span class="checkmark"></span>
        Loaded C${i + 1}S
      </label>
    `
    ).join("")}
    </div>
        <br />
        <br />
        <label class="custom-checkbox">
          <input type="checkbox" id="loadingDone" />
          <span class="checkmark"></span>
          All loading done according to rules
        </label><br />

        <h3>Bill of Lading</h3>
        <label for="wtVac">WtVac (Mt):</label>
        <input type="text" id="wtVac" required /><br />
        <label for="diffShipFig">Diff. Ship Fig (%):</label>
        <input type="text" id="diffShipFig" required /><br />
        <label for="vefApplied">VEF:</label>
        <input type="text" id="vefApplied" required /><br />
        <label for="gsv15">GSV@15C (m³):</label>
        <input type="text" id="gsv15" required /><br />
        <label for="gsv60">GSV@60F (Bbls):</label>
        <input type="text" id="gsv60" required /><br />
        <label for="weightAir">Weight in air (Mt):</label>
        <input type="text" id="weightAir" required /><br />
        <label for="weightVac">Weight in vac (Mt):</label>
        <input type="text" id="weightVac" required /><br />

        <button type="submit" id="loadingSubmit">Submit Loading</button>
        <button type="button" id="backButton">Back</button>
        <button id="deleteVoyageButton" type="deleteButton">Delete Current Voyage</button>
      </form>
    `;

    const loadingForm = document.getElementById("loadingForm");
    const backButton = document.getElementById("backButton");

    loadingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const tanks = Array.from({ length: 6 }, (_, i) => ({
        [`C${i + 1}P`]: document.getElementById(`tankC${i + 1}P`).checked,
        [`C${i + 1}S`]: document.getElementById(`tankC${i + 1}S`).checked,
      })).reduce((acc, curr) => ({ ...acc, ...curr }), {});

      const billOfLading = {
        wtVac: document.getElementById("wtVac").value,
        diffShipFig: document.getElementById("diffShipFig").value,
        vefApplied: document.getElementById("vefApplied").value,
        gsv15: document.getElementById("gsv15").value,
        gsv60: document.getElementById("gsv60").value,
        weightAir: document.getElementById("weightAir").value,
        weightVac: document.getElementById("weightVac").value,
      };

      voyageStart.loading = {
        loadingDone: document.getElementById("loadingDone").checked,
        ...tanks,
        billOfLading,
      };
      voyageStart.currentStep = "Sea Voyage to Discharging Port";

      localStorage.setItem("voyageStart", JSON.stringify(voyageStart));
      alert("Loading submitted! Moving to Sailing...");
      handleVoyage(contentArea);
    });

    backButton.addEventListener("click", () => {
      handleVoyage(contentArea); // Return to the previous step
    });

    const deleteVoyageButton = document.getElementById("deleteVoyageButton");
    deleteVoyageButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete the current voyage?")) {
        localStorage.removeItem("voyageStart");
        alert("Current voyage has been deleted!");
        handleVoyage(contentArea);
      }
    });
  } else if (voyageStart.currentStep === "Sea Voyage to Discharging Port") {
    contentArea.innerHTML = `
      <h1>Sea Voyage to Discharging Port</h1>
      <h3>Current Voyage Progress</h3>
      <pre>${JSON.stringify(voyageStart, null, 2)}</pre>
      
      <form id="seaVoyageForm">
        <label class="custom-checkbox">
          <input type="checkbox" id="voyageToDischargePort" />
          <span class="checkmark"></span>
          Arrr... All fine and dandy
        </label><br />
        
        <button type="submit" id="voyageSubmit">Confirm Voyage to Discharging Port</button>
        <button type="button" id="backButton">Back</button>
        <button id="deleteVoyageButton" type="deleteButton">Delete Current Voyage</button>
      </form>
    `;

    const seaVoyageForm = document.getElementById("seaVoyageForm");
    const backButton = document.getElementById("backButton");

    seaVoyageForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const voyageToLoadingPort = document.getElementById(
        "voyageToDischargePort"
      ).checked;

      if (!voyageToLoadingPort) {
        alert("Please confirm 'All fine and dandy' to proceed.");
        return;
      }

      // Update voyageStart with the current step
      voyageStart.voyageToDischargePort = true;
      voyageStart.currentStep = "Discharging";

      localStorage.setItem("voyageStart", JSON.stringify(voyageStart));
      alert("Voyage to Loading Port confirmed! Moving to Discharging...");
      handleVoyage(contentArea);
    });

    backButton.addEventListener("click", () => {
      handleVoyage(contentArea); // Återgå till föregående steg
    });

    // Hantera borttagning av voyageStart
    const deleteVoyageButton = document.getElementById("deleteVoyageButton");
    deleteVoyageButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete the current voyage?")) {
        localStorage.removeItem("voyageStart");
        alert("Current voyage has been deleted!");
        handleVoyage(contentArea); // Ladda om innehållet
      }
    });
  } else if (voyageStart.currentStep === "Discharging") {
    contentArea.innerHTML = `
      <h1>Discharging</h1>
      <h3>Current Voyage Progress</h3>
      <pre>${JSON.stringify(voyageStart, null, 2)}</pre>
  
      <form id="dischargingForm">
        <h3>Tank Discharging</h3>
        <div class="tank-checkbox-container">
          ${Array.from(
            { length: 6 },
            (_, i) => `
              <label class="custom-checkbox">
                <input type="checkbox" id="tankC${i + 1}P" />
                <span class="checkmark"></span>
                Discharged C${i + 1}P
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" id="tankC${i + 1}S" />
                <span class="checkmark"></span>
                Discharged C${i + 1}S
              </label>
            `
          ).join("")}
        </div>
        <br />
        <br />
        <label class="custom-checkbox">
          <input type="checkbox" id="dischargingDone" />
          <span class="checkmark"></span>
          All discharging done according to rules
        </label><br />
  
        <button type="submit" id="dischargingSubmit">Submit Discharging</button>
        <button type="button" id="backButton">Back</button>
        <button id="deleteVoyageButton" type="deleteButton">Delete Current Voyage</button>
      </form>
    `;

    const dischargingForm = document.getElementById("dischargingForm");
    const backButton = document.getElementById("backButton");

    dischargingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const tanks = Array.from({ length: 6 }, (_, i) => ({
        [`C${i + 1}P`]: document.getElementById(`tankC${i + 1}P`).checked,
        [`C${i + 1}S`]: document.getElementById(`tankC${i + 1}S`).checked,
      })).reduce((acc, curr) => ({ ...acc, ...curr }), {});

      voyageStart.discharging = {
        dischargingDone: document.getElementById("dischargingDone").checked,
        ...tanks,
      };
      voyageStart.currentStep = "End";

      localStorage.setItem("voyageStart", JSON.stringify(voyageStart));
      alert("Discharging submitted! Voyage complete.");
      handleVoyage(contentArea);
    });

    backButton.addEventListener("click", () => {
      handleVoyage(contentArea); // Return to the previous step
    });

    const deleteVoyageButton = document.getElementById("deleteVoyageButton");
    deleteVoyageButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete the current voyage?")) {
        localStorage.removeItem("voyageStart");
        alert("Current voyage has been deleted!");
        handleVoyage(contentArea);
      }
    });
  } else if (voyageStart.currentStep === "End") {
    contentArea.innerHTML = `
      <h1>Voyage Complete</h1>
      <h3>Current Voyage Progress</h3>
      <pre>${JSON.stringify(voyageStart, null, 2)}</pre>
      
      <form id="seaVoyageForm">
        <label class="custom-checkbox">
          <input type="checkbox" id="endVoyage" />
          <span class="checkmark"></span>
          Check before ending voyage
        </label><br />
        
        <button type="submit" id="voyageSubmit">End Voyage</button>
        <button type="button" id="backButton">Back</button>
        <button id="deleteVoyageButton" type="deleteButton">Delete Current Voyage</button>
      </form>
    `;

    const seaVoyageForm = document.getElementById("seaVoyageForm");
    const backButton = document.getElementById("backButton");

    seaVoyageForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const endVoyage = document.getElementById("endVoyage").checked;

      if (!endVoyage) {
        alert("Please confirm 'All fine and dandy' to proceed.");
        return;
      }

      // Retrieve SoF from localStorage and add it to voyageStart
      const sof = localStorage.getItem("SoF");
      if (sof) {
        voyageStart.SoF = JSON.parse(sof); // Add SoF to voyageStart
      }

      // Retrieve the existing voyageHistory from localStorage, or create an empty array if none exists
      const voyageHistory =
        JSON.parse(localStorage.getItem("voyageHistory")) || [];

      // Add the current voyageStart to the voyageHistory list
      voyageHistory.push(voyageStart);

      // Save the updated voyageHistory back to localStorage
      localStorage.setItem("voyageHistory", JSON.stringify(voyageHistory));

      // Remove voyageStart from localStorage
      localStorage.removeItem("voyageStart");

      alert("Voyage complete! Voyage has been saved to history.");
      handleVoyage(contentArea); // Proceed to the next step or page
    });

    backButton.addEventListener("click", () => {
      handleVoyage(contentArea); // Return to the previous step
    });

    // Handle removal of voyageStart
    const deleteVoyageButton = document.getElementById("deleteVoyageButton");
    deleteVoyageButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete the current voyage?")) {
        localStorage.removeItem("voyageStart");
        alert("Current voyage has been deleted!");
        handleVoyage(contentArea); // Reload the content
      }
    });
  } else {
    contentArea.innerHTML = `
      <h1>Du har nått vägs ände.</h1>
      
      <button id="deleteVoyageButton" type="deleteButton">Delete Current Voyage</button>
    `;

    const deleteVoyageButton = document.getElementById("deleteVoyageButton");

    deleteVoyageButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete the current voyage?")) {
        localStorage.removeItem("voyageStart");
        alert("Current voyage has been deleted!");
        handleVoyage(contentArea); // Ladda om innehållet
      }
    });
  }
};
