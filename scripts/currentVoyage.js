export const currentVoyagePage = (contentArea) => {
  const voyages = JSON.parse(localStorage.getItem("currentVoyage")) || [];
  const shipList = JSON.parse(localStorage.getItem("shipList")) || [];

  // Rendera formulär för att skapa ett nytt voyage
  const renderNewVoyageForm = () => {
    const shipOptions = shipList
      .map((ship) => `<option value="${ship.name}">${ship.name}</option>`)
      .join("");

    const unitOptions = `
      <option value="mt">mt</option>
      <option value="cbm">cbm</option>
    `;

    contentArea.innerHTML = `
      <h1>Start New Voyage</h1>
      <form id="voyageForm">
        <div class="form-group">
          <label for="port">Vessel:</label>
          <input type="text" id="port" name="port" required value="M/T Fure Viten" />
        </div>
        <div class="form-group">
          <label for="port">Port:</label>
          <input type="text" id="port" name="port" required />
        </div>
        <div class="form-group">
          <label for="jetty">Jetty:</label>
          <input type="text" id="jetty" name="jetty" required />
        </div>
        <div class="form-group">
          <label for="date">Date:</label>
          <input type="date" id="date" name="date" required />
        </div>
        <div class="form-group">
          <label for="voyNo">Voy No:</label>
          <input type="text" id="voyNo" name="voyNo" required />
        </div>
        <div class="form-group">
          <label for="cpDated">C/P Dated:</label>
          <input type="date" id="cpDated" name="cpDated" required />
        </div>
        <div class="form-group">
          <label for="from">From:</label>
          <input type="text" id="from" name="from" required />
        </div>
        <div class="form-group">
          <label for="to">To:</label>
          <input type="text" id="to" name="to" required />
        </div>
        <div class="form-group">
          <label for="supplierReceiver">Supplier/Receiver:</label>
          <input type="text" id="supplierReceiver" name="supplierReceiver" required />
        </div>
        
        ${[1, 2, 3, 4, 5]
          .map(
            (i) => `
            <div class="form-group cargo-row">
                      <label for="cargo${i}">Cargo ${i}:</label>

              <input type="text" id="cargo${i}" name="cargo${i}" placeholder="Cargo" class="cargo-name" />
              <input type="number" step="1" id="cargo${i}Quantity" name="cargo${i}Quantity" placeholder="Quantity" class="cargo-quantity" />
              <select id="cargo${i}Unit" name="cargo${i}Unit" class="cargo-unit">
                <option value="" disabled selected>Select unit</option>
                ${unitOptions}
              </select>
            </div>
          `
          )
          .join("")}
        
  
        <div class="form-group">
          <label for="chiefOfficer">Ch. Off Name:</label>
          <input type="text" id="chiefOfficer" name="chiefOfficer" required />
        </div>
        <div class="form-group">
          <label for="masterName">Master Name:</label>
          <input type="text" id="masterName" name="masterName" required />
        </div>
        
        <button type="submit" id="saveVoyage">Save</button>
        <button type="button" id="cancelVoyage">Cancel</button>
      </form>
    `;

    document.getElementById("voyageForm").addEventListener("submit", (e) => {
      e.preventDefault();

      const newVoyage = {
        vessel: e.target.vessel.value,
        port: e.target.port.value,
        jetty: e.target.jetty.value,
        date: e.target.date.value,
        voyNo: e.target.voyNo.value,
        cpDated: e.target.cpDated.value,
        from: e.target.from.value,
        to: e.target.to.value,
        supplierReceiver: e.target.supplierReceiver.value,
        cargos: [1, 2, 3, 4, 5].map((i) => ({
          cargo: e.target[`cargo${i}`].value,
          quantity: e.target[`cargo${i}Quantity`].value,
          unit: e.target[`cargo${i}Unit`].value,
        })),
        crew: {
          chiefOfficer: e.target.chiefOfficer.value,
          masterName: e.target.masterName.value,
        },
      };

      const voyages = JSON.parse(localStorage.getItem("currentVoyage")) || [];
      voyages.push(newVoyage);
      localStorage.setItem("currentVoyage", JSON.stringify(voyages));

      currentVoyagePage(contentArea);
    });

    document.getElementById("cancelVoyage").addEventListener("click", () => {
      currentVoyagePage(contentArea);
    });
  };

  // Om det finns voyages, visa dropdown och detaljer
  if (voyages.length > 0) {
    const voyageOptions = voyages
      .map(
        (voyage, index) =>
          `<option value="${index}">${voyage.vessel} - ${
            voyage.voyNo || "N/A"
          } [${voyage.from} - ${voyage.to}]
            </option>`
      )
      .join("");

    contentArea.innerHTML = `
      <h1>Current Voyage</h1>
      <select id="voyageSelect">${voyageOptions}</select>
      <div id="voyageDetails"></div>
      <button id="deleteVoyages" type="deleteButton" class="deleteButton">Delete Voyages</button>
      <button id="startVoyage" class="start-btn">Add New Voyage</button>
      <div>
        <button id="submitVoyage" class="submitvoyagebtn">End Voyage</button>
      </div>
    `;

    const voyageDetails = document.getElementById("voyageDetails");
    const voyageSelect = document.getElementById("voyageSelect");

    const renderVoyage = (voyage, index) => {
      const voyageDetails = document.getElementById("voyageDetails");
      const cargosHTML = voyage.cargos
        .map(
          (cargo, index) => `
            <div class="key-value-pair">
              <span class="key">Cargo ${index + 1}:</span> 
              <span class="key">${cargo.quantity} </span> 

              <span class="value">${cargo.unit || "N/A"}</span>
            </div>
          `
        )
        .join("");

      const crewHTML = `
        <div class="key-value-pair">
          <span class="key">Ch. Off Name:</span> <span class="value">${
            voyage.crew.chiefOfficer || "N/A"
          }</span>
        </div>
        <div class="key-value-pair">
          <span class="key">Master Name:</span> <span class="value">${
            voyage.crew.masterName || "N/A"
          }</span>
        </div>
      `;

      voyageDetails.innerHTML = `
        <div class="voyage-item">
          <div class="key-value-pair"><span class="key">Vessel:</span> <span class="value">${voyage.vessel}</span></div>
          <div class="key-value-pair"><span class="key">Port:</span> <span class="value">${voyage.port}</span></div>
          <div class="key-value-pair"><span class="key">Jetty:</span> <span class="value">${voyage.jetty}</span></div>
          <div class="key-value-pair"><span class="key">Date:</span> <span class="value">${voyage.date}</span></div>
          <div class="key-value-pair"><span class="key">Voy No:</span> <span class="value">${voyage.voyNo}</span></div>
          <div class="key-value-pair"><span class="key">C/P Dated:</span> <span class="value">${voyage.cpDated}</span></div>
          <div class="key-value-pair"><span class="key">From:</span> <span class="value">${voyage.from}</span></div>
          <div class="key-value-pair"><span class="key">To:</span> <span class="value">${voyage.to}</span></div>
          <div class="key-value-pair"><span class="key">Supplier/Receiver:</span> <span class="value">${voyage.supplierReceiver}</span></div>
        </div>
        <div class="voyage-section">
          <h2>Cargo Details</h2>
          ${cargosHTML}
        </div>
        <div class="voyage-crew">
          <h2>Crew Details</h2>
          ${crewHTML}
        </div>
            <button id="editVoyage" class="edit-btn">Edit Voyage</button>

      `;
      document.getElementById("editVoyage").addEventListener("click", () => {
        renderEditVoyageForm(voyage, index);
      });
    };

    const renderEditVoyageForm = (voyage, index) => {
      const shipOptions = shipList
        .map(
          (ship) =>
            `<option value="${ship.name}" ${
              ship.name === voyage.vessel ? "selected" : ""
            }>${ship.name}</option>`
        )
        .join("");

      const unitOptions = `
        <option value="mt" ${"mt" === voyage.unit ? "selected" : ""}>mt</option>
        <option value="cbm" ${
          "cbm" === voyage.unit ? "selected" : ""
        }>cbm</option>
      `;

      contentArea.innerHTML = `
        <h1>Edit Voyage</h1>
    <form id="editVoyageForm">
      <div class="form-group">
        <label for="vessel">Vessel:</label>
        <select id="vessel" name="vessel" required>
          <option value="" disabled>Select a vessel</option>
          ${shipOptions}
        </select>
      </div>
      <div class="form-group">
        <label for="port">Port:</label>
        <input type="text" id="port" name="port" value="${
          voyage.port
        }" required />
      </div>
      <div class="form-group">
        <label for="jetty">Jetty:</label>
        <input type="text" id="jetty" name="jetty" value="${
          voyage.jetty
        }" required />
      </div>
      <div class="form-group">
        <label for="date">Date:</label>
        <input type="date" id="date" name="date" value="${
          voyage.date
        }" required />
      </div>
      <div class="form-group">
        <label for="voyNo">Voy No:</label>
        <input type="text" id="voyNo" name="voyNo" value="${
          voyage.voyNo
        }" required />
      </div>
      <div class="form-group">
        <label for="cpDated">C/P Dated:</label>
        <input type="date" id="cpDated" name="cpDated" value="${
          voyage.cpDated
        }" required />
      </div>
      <div class="form-group">
        <label for="from">From:</label>
        <input type="text" id="from" name="from" value="${
          voyage.from
        }" required />
      </div>
      <div class="form-group">
        <label for="to">To:</label>
        <input type="text" id="to" name="to" value="${voyage.to}" required />
      </div>
      <div class="form-group">
        <label for="supplierReceiver">Supplier/Receiver:</label>
        <input type="text" id="supplierReceiver" name="supplierReceiver" value="${
          voyage.supplierReceiver
        }" required />
      </div>
  
      ${[1, 2, 3, 4, 5]
        .map(
          (i) => `
        <div class="form-group cargo-row">
          <label for="cargo${i}">Cargo ${i}:</label>
          <input type="text" id="cargo${i}" name="cargo${i}" class="cargo-name" value="${
            voyage.cargos[i - 1]?.cargo || ""
          }" placeholder="Cargo" class="cargo-name" />

          <input type="number" step="1" id="cargo${i}Quantity" class="cargo-quantity" name="cargo${i}" value="${
            voyage.cargos[i - 1]?.quantity || ""
          }" placeholder="Quantity" />
          <select id="cargo${i}Unit" name="cargo${i}Unit" class="cargo-unit">
            <option value="" ${
              !voyage.cargos[i - 1]?.unit ? "selected" : ""
            }>Select Unit</option>
            ${unitOptions.replace(
              `value="${voyage.cargos[i - 1]?.unit}"`,
              `value="${voyage.cargos[i - 1]?.unit}" selected`
            )}
          </select>
        </div>
      `
        )
        .join("")}
      
      <div class="form-group">
        <label for="chiefOfficer">Ch. Off Name:</label>
        <input type="text" id="chiefOfficer" name="chiefOfficer" value="${
          voyage.crew.chiefOfficer
        }" required />
      </div>
      <div class="form-group">
        <label for="masterName">Master Name:</label>
        <input type="text" id="masterName" name="masterName" value="${
          voyage.crew.masterName
        }" required />
      </div>

      <button type="submit" id="saveChanges">Save Changes</button>
      <button type="button" id="cancelEdit">Cancel</button>
      
    </form>
      `;

      document
        .getElementById("editVoyageForm")
        .addEventListener("submit", (e) => {
          e.preventDefault();

          const updatedVoyage = {
            vessel: e.target.vessel.value,
            port: e.target.port.value,
            jetty: e.target.jetty.value,
            date: e.target.date.value,
            voyNo: e.target.voyNo.value,
            cpDated: e.target.cpDated.value,
            from: e.target.from.value,
            to: e.target.to.value,
            supplierReceiver: e.target.supplierReceiver.value,
            cargos: [1, 2, 3, 4, 5].map((i) => ({
              quantity: e.target[`cargo${i}`].value,
              unit: e.target[`cargo${i}Unit`].value,
            })),
            crew: {
              chiefOfficer: e.target.chiefOfficer.value,
              masterName: e.target.masterName.value,
            },
          };
          console.log(updatedVoyage);
          const voyages =
            JSON.parse(localStorage.getItem("currentVoyage")) || [];
          voyages[index] = updatedVoyage;
          localStorage.setItem("currentVoyage", JSON.stringify(voyages));

          currentVoyagePage(contentArea);
        });

      document.getElementById("cancelEdit").addEventListener("click", () => {
        currentVoyagePage(contentArea);
      });
    };

    console.log(voyages);

    renderVoyage(voyages[voyageSelect.value], 0);

    voyageSelect.addEventListener("change", (e) => {
      const selectedIndex = parseInt(e.target.value, 10); // Konvertera till heltal
      renderVoyage(voyages[selectedIndex], selectedIndex);
    });

    document.getElementById("deleteVoyages").addEventListener("click", () => {
      localStorage.removeItem("currentVoyage");
      currentVoyagePage(contentArea);
    });

    document.getElementById("startVoyage").addEventListener("click", () => {
      renderNewVoyageForm();
    });
    document.getElementById("submitVoyage").addEventListener("click", () => {
      // Visa en confirm-dialog för att bekräfta om användaren vill avsluta resan
      const userConfirmed = confirm(
        "Are you sure you want to end the voyage and add it to the history?"
      );

      if (userConfirmed) {
        // Hämta den nuvarande resan (currentVoyage) från localStorage
        const currentVoyage =
          JSON.parse(localStorage.getItem("currentVoyage")) || [];

        // Hämta den gamla listan av resor (voyageHistory) från localStorage, eller skapa en tom array om den inte finns
        const voyageHistory =
          JSON.parse(localStorage.getItem("voyageHistory")) || [];

        // Lägg till currentVoyage till voyageHistory
        voyageHistory.push(...currentVoyage);

        // Uppdatera localStorage med den nya listan av gamla resor
        localStorage.setItem("voyageHistory", JSON.stringify(voyageHistory));

        // Ta bort currentVoyage från localStorage
        localStorage.removeItem("currentVoyage");

        // Uppdatera sidan eller visa en bekräftelse att resan har slutat
        alert("Voyage ended and added to history!");

        // Om du vill, kan du återgå till sidan som visar gamla resor
        currentVoyagePage(contentArea); // Uppdatera sidan efter att resan har avslutats
      }
    });
  } else {
    // Om inga voyages finns, visa start-knapp
    contentArea.innerHTML = `
      <h1>Current Voyage</h1>
      <p>No voyages available. Start a new voyage.</p>
      <button id="startVoyage" class="start-btn">Start Voyage</button>
    `;

    document.getElementById("startVoyage").addEventListener("click", () => {
      renderNewVoyageForm();
    });
  }
};
