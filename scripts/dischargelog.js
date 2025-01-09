// Testdata (kommer senare att hämtas från localStorage)
let loadingLogData = {
  voy: "FVI2025002",
  cargo: "Reformate",
  date: "2025-01-08",
  port: "Rotterdam",
  berth: "Redlight District",
  manifolds: "",
  connectionSize: "",
  avgRate: 0,
  lastAvgRate: 0,
};

let logEntries = []; // Array för att lagra loggdata

// Funktion för att skapa en loggrad
const createLogRow = (entry = {}, index = null) => {
  const {
    time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }), // Förifyll med aktuell tid
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

  // Helper: Skapa en cell med antingen input eller text
  const createCell = (key, value, required = false, editable = true) => {
    const cell = document.createElement("td");
    if (editable && isEditable) {
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
      renderLogTable(); // Uppdatera tabellen
    }
  });

  return row;
};

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

// Funktion för att uppdatera rate vid ändring i obq
const updateRate = (row, entry, index, input) => {
  const rateCell = row.querySelector("td:nth-child(3)"); // Anta att rate är den tredje cellen
  const rate = calculateRate(entry, index, input);

  rateCell.textContent = rate; // Uppdatera rate-cellen med ny beräknad rate
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

const updateAvgRates = () => {
  if (logEntries.length > 0) {
    // Beräkna avgRate
    const totalRate = logEntries.reduce((sum, entry) => {
      const rate = parseInt(entry.rate) || 0;
      return sum + rate;
    }, 0);
    loadingLogData.avgRate = parseInt(totalRate / logEntries.length);

    // Hämta lastAvgRate
    loadingLogData.lastAvgRate =
      parseInt(logEntries[logEntries.length - 1].rate) || 0;
  } else {
    // Inga logEntries, nollställ värden
    loadingLogData.avgRate = 0;
    loadingLogData.lastAvgRate = 0;
  }
  console.log(loadingLogData.avgRate);
  // Uppdatera grundläggande data i UI
  renderBasicData();
};

const renderBasicData = () => {
  const table = document.querySelector(".loading-log-basic-info-table");
  table.innerHTML = `
        <tr>
          <td><strong>Voy:</strong></td>
          <td>${loadingLogData.voy}</td>
          <td><strong>Cargo(es):</strong></td>
          <td>${loadingLogData.cargo}</td>
        </tr>
        <tr>
          <td><strong>Date:</strong></td>
          <td>${loadingLogData.date}</td>
          <td><strong>Port:</strong></td>
          <td>${loadingLogData.port}</td>
        </tr>
        <tr>
          <td><strong>Berth:</strong></td>
          <td>${loadingLogData.berth}</td>
          
        </tr>
        <tr>
        <td><strong>Avg. Rate (cbm/h):</strong></td>
          <td>${loadingLogData.avgRate}</td>
          <td><strong>Last Avg. Rate (cbm/h):</strong></td>
          <td>${loadingLogData.lastAvgRate}</td>
        </tr>
      `;
};

// Funktion för att generera loading log-sidan
export const dischargeLog = (contentArea) => {
  contentArea.innerHTML = `
        <h1 class="loading-log-title">Discharge Log</h1>
        <div class="loading-log-container">
          <!-- Grundläggande data -->
  <table class="loading-log-basic-info-table">
    
  </table>
  
    
          <!-- Formulär för manifolds och connection size -->
  <form id="loadingLogForm" class="loading-log-form">
    <div class="loading-log-form-row">
      <label for="manifolds" class="loading-log-label">Manifold(s) No:</label>
      <input 
        type="text" 
        id="manifolds" 
        class="loading-log-input" 
        value="${loadingLogData.manifolds}" 
        placeholder="Enter manifold(s) no." 
      />
    </div>
    <div class="loading-log-form-row">
      <label for="connectionSize" class="loading-log-label">Connection size:</label>
      <input 
        type="text" 
        id="connectionSize" 
        class="loading-log-input" 
        value="${loadingLogData.connectionSize}" 
        placeholder="Enter connection size" 
      />
    </div>
    <button type="submit" class="loading-log-button">Save</button>
  </form>
  
    
          <!-- Loggdata-tabellen -->
  <h2 class="loading-log-entries-title">Log Entries</h2>
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
  
        </div>
      `;
  renderBasicData();
  // Event listener för formuläret
  document.getElementById("loadingLogForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const manifoldsInput = document.getElementById("manifolds").value;
    const connectionSizeInput = document.getElementById("connectionSize").value;

    loadingLogData.manifolds = manifoldsInput;
    loadingLogData.connectionSize = connectionSizeInput;

    localStorage.setItem("loadingLogData", JSON.stringify(loadingLogData));
    alert("Loading log updated successfully!");
    loadingLog(contentArea); // Uppdatera sidan
  });

  // Event listener för att lägga till en ny loggrad
  document.getElementById("addEventButton").addEventListener("click", () => {
    logEntries.push({
      isEditable: true,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }); // Lägg till tom loggrad
    renderLogTable();
    // Uppdatera rates
  });

  // Rendera loggtabellen
  renderLogTable();
};
