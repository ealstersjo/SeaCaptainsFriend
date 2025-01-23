let cargoIndex = 0;
let avgRate = 0;
let lastAvgRate = 0;
let etcAvg = 0;
let etcCurrent = 0;
let logEntries = [];
let selectedCargo = {};
let manifolds = "";
let connectionSize = "";
export const loadlog = (contentArea, voyage, inputCargoIndex) => {
  cargoIndex = inputCargoIndex;
  logEntries = voyage.loadingLog?.entries[cargoIndex] || [];
  manifolds = voyage.loadingLog?.manifolds || "";
  connectionSize = voyage.loadingLog?.connectionSize || "";
  // Destrukturera värden från rates, med säker fallback om rates inte finns
  const {
    avgRate: tempAvgRate = 0,
    lastAvgRate: tempLastAvgRate = 0,
    etcAvg: tempEtcAvg = 0,
    etcCurrent: tempEtcCurrent = 0,
  } = voyage.loadingLog?.rates || {};
  avgRate = tempAvgRate;
  lastAvgRate = tempLastAvgRate;
  etcAvg = tempEtcAvg;
  etcCurrent = tempEtcCurrent;
  const renderBasicData = () => {
    renderManifoldForm();
    renderLogEventTable();
    if (logEntries.length > 0) {
      renderLogTable();
    }
    const table = document.querySelector(".loading-log-basic-info-table");
    table.innerHTML = `
        <tr>
          <td><strong>Voy:</strong></td>
          <td>${voyage.voyNo}</td>
          <td><strong>Cargo(es):</strong></td>
          <td>${selectedCargo.cargo} (${selectedCargo.quantity}${
      selectedCargo.unit
    })</td>
        </tr>
        <tr>
          <td><strong>Date:</strong></td>
          <td>${voyage.date}</td>
          <td><strong>Port:</strong></td>
          <td>${voyage.port}</td>
        </tr>
        <tr>
          <td><strong>Berth:</strong></td>
          <td>${voyage.jetty}</td>
        </tr>
        <tr>
          <td><strong>Avg. Rate (cbm/h):</strong></td>
          <td>${avgRate || "N/A"}</td>
          <td><strong>Last Avg. Rate (cbm/h):</strong></td>
          <td>${lastAvgRate || "N/A"}</td>
        </tr>
        <tr>
          <td><strong>ETC avg:</strong></td>
          <td>${etcAvg || "N/A"}</td>
          <td><strong>ETC current:</strong></td>
          <td>${etcCurrent || "N/A"}</td>
        </tr>
      `;
    // Event listener för att lägga till en ny loggrad
    document.getElementById("addEventButton").addEventListener("click", () => {
      const now = new Date();
      logEntries.push({
        isEditable: true,
        time: `${now.toLocaleDateString("sv-SE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })} ${now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`,
      }); // Lägg till tom loggrad
      renderLogTable();
      // Uppdatera rates
    });
  };
  const updateAvgRates = () => {
    if (logEntries.length > 0) {
      // Beräkna avgRate
      const totalRate = logEntries.reduce((sum, entry) => {
        const rate = parseFloat(entry.rate) || 0;
        return sum + rate;
      }, 0);
      avgRate = parseInt(totalRate / logEntries.length);

      // Hämta lastAvgRate

      lastAvgRate = parseFloat(logEntries[logEntries.length - 1].rate) || 0;

      if (avgRate > 0) {
        // Beräkna ETC avg
        const rawTime = logEntries[0].time; // Format: "YYYY-MM-DD hh:mm"
        const isoTime = rawTime.replace(" ", "T"); // Konvertera till "YYYY-MM-DDThh:mm"
        const firstTime = new Date(isoTime);
        const avgDurationHours = voyage.cargos[cargoIndex].quantity / avgRate;
        const etcAvgTime = new Date(
          firstTime.getTime() + avgDurationHours * 3600000
        );
        etcAvg = etcAvgTime.toLocaleString("sv-SE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
      } else {
        etcAvg = "-";
      }

      // Beräkna ETC current
      const lastTime = new Date(
        Date.parse(logEntries[logEntries.length - 1].time)
      );

      if (lastAvgRate > 0) {
        const currentDurationHours =
          voyage.cargos[cargoIndex].quantity / lastAvgRate;
        const etcCurrentTime = new Date(
          lastTime.getTime() + currentDurationHours * 3600000
        );
        etcCurrent = etcCurrentTime.toLocaleString("sv-SE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
      } else {
        etcCurrent = "-";
      }
    } else {
      // Nollställ värden om inga logEntries
      avgRate = 0;
      lastAvgRate = 0;
      etcAvg = "-";
      etcCurrent = "-";
    }

    let rates = { avgRate, lastAvgRate, etcAvg, etcCurrent };

    // Save to localStorage
    const voyages = JSON.parse(localStorage.getItem("currentVoyage")) || [];
    const selectedVoyageIndex = localStorage.getItem("selectedVoyageIndex");

    // Initialize loadingLog if it doesn't exist
    if (!voyages[selectedVoyageIndex].loadingLog) {
      voyages[selectedVoyageIndex].loadingLog = {};
    }

    // Save the entire logEntries array
    voyages[selectedVoyageIndex].loadingLog.rates = rates;
    localStorage.setItem("currentVoyage", JSON.stringify(voyages));

    renderBasicData(selectedCargo); // Uppdatera grundläggande data i UI
  };

  // Funktion för att generera en lista med alla cargos
  const generateCargoSelect = () => {
    const cargos = voyage.cargos || []; // Hämta alla cargos från färdplanen
    const validCargos = cargos.filter(
      (cargo) => cargo.cargo && cargo.cargo.trim() !== ""
    );
    return validCargos.length === 0
      ? `<p>No cargos available</p>`
      : `<select id="cargoSelect">${validCargos
          .map(
            (cargo, index) =>
              `<option value="${index}">Cargo ${parseInt(index) + 1} - ${
                cargo.cargo
              } (${cargo.quantity} ${cargo.unit})</option>`
          )
          .join("")}</select>`;
  };

  const renderManifoldForm = () => {
    const inputFields = document.getElementById("loading-log-form-row");

    inputFields.innerHTML = `<form id="loadingLogForm" class="loading-log-form">
  <div class=""loading-log-form-row">
    <label for="manifolds" class="loading-log-label">Manifold(s) No:</label>
    <input 
      type="text" 
      id="manifolds" 
      class="loading-log-input" 
      value="${manifolds || ""}" 
      placeholder="Enter manifold(s) no." 
    />
  </div>
  <div class="loading-log-form-row">
    <label for="connectionSize" class="loading-log-label">Connection size:</label>
    <input 
      type="text" 
      id="connectionSize" 
      class="loading-log-input" 
  value="${connectionSize ? connectionSize.replace(/"/g, "&quot;") : ""}" 
      placeholder="Enter connection size" 
    /> </div>

  <button type="submit" class="loading-log-button">Save</button>
</form>
`;
    document
      .getElementById("loadingLogForm")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        const manifoldsInput = document.getElementById("manifolds").value;
        const connectionSizeInput =
          document.getElementById("connectionSize").value;

        // Save to localStorage
        const voyages = JSON.parse(localStorage.getItem("currentVoyage")) || [];
        const selectedVoyageIndex = localStorage.getItem("selectedVoyageIndex");

        // Initialize loadingLog if it doesn't exist
        if (!voyages[selectedVoyageIndex].loadingLog) {
          voyages[selectedVoyageIndex].loadingLog = {};
        }
        manifolds = manifoldsInput;
        connectionSize = connectionSizeInput;
        // Save the entire logEntries array
        voyages[selectedVoyageIndex].loadingLog.manifolds = manifoldsInput;
        voyages[selectedVoyageIndex].loadingLog.connectionSize =
          connectionSizeInput;

        localStorage.setItem("currentVoyage", JSON.stringify(voyages));

        alert("Loading log updated successfully!");
        loadlog(contentArea, voyage, cargoIndex); // Uppdatera sidan
      });
  };

  // Funktion för att hämta specifik lastdata baserat på valt cargo
  const getCargoLog = () => {
    if (voyage && voyage.cargos[cargoIndex]) {
      const selectedCargo = voyage.cargos[cargoIndex];
      renderBasicData(selectedCargo);
      return `
        <h2>Loading Log for ${selectedCargo.cargo} in Cargo ${
        parseInt(cargoIndex) + 1
      }</h2>
        
 
      `;
    }
    return `<p>No cargo details available.</p>`;
  };

  // Kontrollera om vi har några färdplaner, annars visa en standardtext
  if (!voyage) {
    contentArea.innerHTML = `
        <h1>Loading log</h1>
        <small>Select a cargo to proceed</small>
        <div class="select-container">${generateCargoSelect()}</div>
      `;
    return;
  }
  // Funktion för att beräkna rate
  const calculateRate = (entry, index, input) => {
    let rate = "";
    const obq = input || 0;
    if (index !== null && index > 0) {
      const previousObq = parseFloat(logEntries[index - 1].obq) || 0;
      rate = (obq - previousObq).toFixed(2);
    } else {
      rate = obq || 0;
    }

    return rate;
  };
  const updateRate = (row, entry, index, input) => {
    const rateCell = row.querySelector("td:nth-child(3)"); // Anta att rate är den tredje cellen
    const rate = calculateRate(entry, index, input);

    rateCell.textContent = rate; // Uppdatera rate-cellen med ny beräknad rate
  };

  const renderLogEventTable = () => {
    const logEventTable = document.getElementById("log-event-table");
    logEventTable.innerHTML = `<h2 class="loading-log-entries-title">Log Entries</h2>
<table class="loading-log-entries-table">
  <thead>
    <tr>
      <th class="loading-log-header">Local time</th>
      <th class="loading-log-header">O.B.Q. cbm</th>
      <th class="loading-log-header">Rate cbm/h</th>
      <th class="loading-log-header">Tanks No.</th>
      <th class="loading-log-header">Manif Press.</th>
      <th class="loading-log-header">SF</th>
      <th class="loading-log-header">BM</th>
      
      <th class="loading-log-header">Remarks</th>
      <th class="loading-log-header">Action</th>
    </tr>
  </thead>
  <tbody id="logTableBody" class="loading-log-body"></tbody>
</table>
<button id="addEventButton" class="loading-log-add-button">Add event</button>
`;
  };

  const createLogRow = (entry = {}, index = null) => {
    const now = new Date();

    const {
      time = `${now.toLocaleDateString("sv-SE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })} ${now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`, // Förifyll med aktuell tid
      obq = "",
      rate = "",

      tanksNo = "",
      manifPress = "",
      bm = "",
      sf = "",
      remarks = "",
      isEditable = true,
    } = entry;

    const row = document.createElement("tr");

    const createCell = (key, value, required = false, editable = true) => {
      const cell = document.createElement("td");

      if (key === "tanksNo" && editable && isEditable) {
        // Skapa en container för kryssrutorna
        const checkboxContainer = document.createElement("div");
        checkboxContainer.classList.add("checkbox-container");

        // Namnge tankarna som C1P-C6P och C1S-C6S
        const tankNames = [
          "C1P",
          "C2P",
          "C3P",
          "C4P",
          "C5P",
          "C6P",
          "C1S",
          "C2S",
          "C3S",
          "C4S",
          "C5S",
          "C6S",
        ];

        // Generera kryssrutor med anpassade tanknamn
        tankNames.forEach((tankName) => {
          const checkboxWrapper = document.createElement("div");
          checkboxWrapper.classList.add("checkbox-wrapper");

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.value = tankName;
          checkbox.id = `tank-${tankName}`;
          checkbox.checked = value?.split(",").includes(tankName); // Markera om värdet finns
          checkbox.dataset.key = key;

          const label = document.createElement("label");
          label.htmlFor = `tank-${tankName}`;
          label.textContent = tankName;

          checkboxWrapper.appendChild(checkbox);
          checkboxWrapper.appendChild(label);
          checkboxContainer.appendChild(checkboxWrapper);
        });

        cell.appendChild(checkboxContainer);
      } else if (key === "remarks" && editable && isEditable) {
        // Skapa en dropdown för remarks
        const select = document.createElement("select");
        select.dataset.key = key;

        // Alternativen för dropdown
        const options = [
          "Start Loading",
          "Shore Stop",
          "Ship Stop",
          "Resumed Loading",
          "Loading Completed",
        ];

        // Generera options för dropdown
        options.forEach((optionValue) => {
          const option = document.createElement("option");
          option.value = optionValue;
          option.textContent = optionValue;
          if (value === optionValue) option.selected = true; // Markera om värdet matchar
          select.appendChild(option);
        });

        cell.appendChild(select);
      } else if (editable && isEditable) {
        // Standardinput för andra keys
        const input = document.createElement("input");
        input.type = "text";
        input.value = value;
        input.dataset.key = key;
        if (required) input.required = true;
        input.classList.add("log-input");
        cell.appendChild(input);

        if (key === "obq") {
          input.addEventListener("input", () => {
            updateRate(row, entry, index, input.value);
          });
        }
      } else {
        // Visa text om inte redigerbart
        cell.textContent = value || "-";
      }

      return cell;
    };

    // Skapa celler för varje kolumn
    row.appendChild(createCell("time", time, true));
    row.appendChild(createCell("obq", obq));

    // Initialisera rate-cell (rate kommer att uppdateras via updateRate vid ändring av obq)
    const rateCell = document.createElement("td");
    rateCell.textContent = rate;
    row.appendChild(rateCell);

    row.appendChild(createCell("tanksNo", tanksNo, true));
    row.appendChild(createCell("manifPress", manifPress));
    row.appendChild(createCell("bm", bm));
    row.appendChild(createCell("sf", sf));
    row.appendChild(createCell("remarks", remarks));

    // Skapa cell för Save/Edit och Delete-knappar
    const actionCell = document.createElement("td");

    // Edit/Save-knapp
    const actionButton = document.createElement("button");
    actionButton.textContent = isEditable ? "Save" : "Edit";
    actionButton.classList.add("log-button");
    actionCell.appendChild(actionButton);

    // Delete-knapp
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("log-delete-button");
    actionCell.appendChild(deleteButton);

    row.appendChild(actionCell);

    // Event: Spara/redigera raden
    actionButton.addEventListener("click", () => {
      if (actionButton.textContent === "Save") {
        // Spara data från inmatningsfält
        const inputs = row.querySelectorAll(".log-input");
        inputs.forEach((input) => {
          entry[input.dataset.key] = input.value;
        });
        const remarksDropdown = row.querySelector("select[data-key='remarks']");
        if (remarksDropdown) {
          entry.remarks = remarksDropdown.value; // Spara valt värde
        }
        // Hantera kryssrutorna för tanksNo
        if (row.querySelector(".checkbox-container")) {
          const checkboxes = row.querySelectorAll(
            ".checkbox-container input[type='checkbox']"
          );
          const selectedTanks = Array.from(checkboxes)
            .filter((checkbox) => checkbox.checked) // Filtrera ut endast markerade kryssrutor
            .map((checkbox) => checkbox.value); // Extrahera värdena från kryssrutorna

          entry.tanksNo = selectedTanks.join(","); // Spara som en kommaseparerad sträng
        }
        // Beräkna och spara rate
        const obq = parseFloat(entry.obq) || 0;
        let rate = "";
        if (index !== null && index > 0) {
          const previousObq = parseFloat(logEntries[index - 1].obq) || 0;
          rate = (obq - previousObq).toFixed(2);
        } else {
          rate = obq || 0;
        }

        // Kontrollera om obq är mindre än på föregående rad innan sparande
        if (index !== null && index > 0) {
          const currentObq = parseFloat(entry.obq) || 0;
          const previousObq = parseFloat(logEntries[index - 1].obq) || 0;

          if (currentObq < previousObq) {
            const confirmation = confirm(
              `O.B.Q. cannot be lower than earlier value (last entered O.B.Q.: ${previousObq}). If you want to edit please press "Cancel"`
            );

            if (!confirmation) {
              // Återställ värdet till det föregående
              entry.obq = logEntries[index - 1].obq;
              renderLogTable(); // Uppdatera tabellen med det återställda värdet
              return; // Avbryt sparandet
            }
          }
        }
        entry.rate = rate;
        entry.isEditable = false;
        updateAvgRates();

        // Save to localStorage
        const voyages = JSON.parse(localStorage.getItem("currentVoyage")) || [];
        const selectedVoyageIndex = localStorage.getItem("selectedVoyageIndex");

        // Initialize loadingLog if it doesn't exist
        if (!voyages[selectedVoyageIndex].loadingLog) {
          voyages[selectedVoyageIndex].loadingLog = {};
        }
        // Kontrollera om `entries` finns, annars skapa det som ett tomt objekt
        if (!voyages[selectedVoyageIndex].loadingLog.entries) {
          voyages[selectedVoyageIndex].loadingLog.entries = {};
        }

        // Save the entire logEntries array
        voyages[selectedVoyageIndex].loadingLog.entries[cargoIndex] =
          logEntries;
        localStorage.setItem("currentVoyage", JSON.stringify(voyages));

        renderLogTable(); // Uppdatera tabellen
      } else {
        // Växla till redigerbart läge
        entry.isEditable = true;
        renderLogTable(); // Uppdatera tabellen
      }
    });

    // Event: Ta bort raden
    deleteButton.addEventListener("click", () => {
      const index = logEntries.indexOf(entry);
      if (index > -1) {
        logEntries.splice(index, 1); // Ta bort från arrayen
        const voyages = JSON.parse(localStorage.getItem("currentVoyage")) || [];
        const selectedVoyageIndex = localStorage.getItem("selectedVoyageIndex");

        // Initialize loadingLog if it doesn't exist
        if (!voyages[selectedVoyageIndex].loadingLog) {
          voyages[selectedVoyageIndex].loadingLog = {};
        }
        // Kontrollera om `entries` finns, annars skapa det som ett tomt objekt
        if (!voyages[selectedVoyageIndex].loadingLog.entries) {
          voyages[selectedVoyageIndex].loadingLog.entries = {};
        }
        // Save the entire logEntries array
        voyages[selectedVoyageIndex].loadingLog.entries[cargoIndex] =
          logEntries;
        localStorage.setItem("currentVoyage", JSON.stringify(voyages));

        renderLogTable(); // Uppdatera tabellen
      }
    });

    return row;
  };

  // Funktion för att rendera loggtabellen
  const renderLogTable = () => {
    const tableBody = document.getElementById("logTableBody");
    tableBody.innerHTML = ""; // Rensa tabellen
    logEntries.forEach((entry, index) => {
      const row = createLogRow(entry, index);

      tableBody.appendChild(row);
    });
  };
  // Skapa innehållet för att välja cargo
  contentArea.innerHTML = `
      <h1>Loading log</h1>
      <small>Select a cargo from the list</small>
      <div class="select-container">
        ${generateCargoSelect()}
      </div>
      <div id="cargoLog"></div>
      <table class="loading-log-basic-info-table"></table>
      <!-- Formulär för manifolds och connection size -->
      <div id="loading-log-form-row"></div>
      <div id="log-event-table"></div>


      </div>
    `;
  const cargoLogContainer = document.getElementById("cargoLog");
  cargoLogContainer.innerHTML = getCargoLog();

  // Lägg till eventlyssnare för att visa logg när ett cargo väljs
  const cargoSelect = document.getElementById("cargoSelect");
  cargoSelect.addEventListener("change", (event) => {
    const selectedCargoId = event.target.value;
    const cargoLogContainer = document.getElementById("cargoLog");
    cargoIndex = selectedCargoId;
    selectedCargo = voyage.cargos[cargoIndex];
    logEntries = voyage.loadingLog?.entries[cargoIndex] || [];
    cargoLogContainer.innerHTML = getCargoLog();
  });
};
