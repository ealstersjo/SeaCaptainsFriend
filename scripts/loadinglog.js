// Testdata (kommer senare att hämtas från localStorage)
let loadingLogData = {};

let logEntries = []; // Array för att lagra loggdata
let etcCurrent;
let etcAvg;
let avgRate;
let lastAvgRate;
let cargoSelectIndex = 0;
let cargo;
let cargoQuant;
let cargoUnit;
// Funktion för att skapa en loggrad
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
          console.log("HEJ");
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

      // Save the entire logEntries array
      voyages[selectedVoyageIndex].loadingLog.entries = logEntries;
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

// Funktion för att öppna och skriva ut loggdata
const printLog = () => {
  const printWindow = window.open("../pages/printLoading.html", "_blank");

  // Vänta tills utskriftsmallen är laddad
  printWindow.onload = () => {
    // Hitta elementet i utskriftsmallen där vi ska fylla i data
    const headerSection = printWindow.document.querySelector(".header");

    const tableSection = printWindow.document.querySelector(".table-container");
    const footer = printWindow.document.querySelector(".footer");
    const signature = printWindow.document.querySelector(".signatures");

    // Fyll i header-datan (loadingLogData)
    headerSection.innerHTML = `
    <div class="header-info">
  <img src="../assets/furetank.png" alt="Logo" class="header-logo" />
  <div class="header-title">
    
    <h1>${loadingLogData.vessel}</h1>
    <h1>Loading Log</h1>
  </div>
  </div>
  <div class="header-content1">
    <div><strong>Voyage:</strong> ${loadingLogData.voyNo}</div>
    <div><strong>Cargo(es):</strong> ${loadingLogData.cargos[0].cargo}</div>
    </div>
    <div class="header-content2">
    <div><strong>Date:</strong> ${loadingLogData.date}</div>
    <div><strong>Port:</strong> ${loadingLogData.port}</div>
    <div><strong>Berth:</strong> ${loadingLogData.jetty}</div>
    </div>
    <div class="header-content3">
    <div><strong>Manifold(s) No:</strong> ${
      loadingLogData.loadingLog?.manifolds || "N/A"
    }</div>
    <div><strong>Connection Size:</strong> ${
      loadingLogData.loadingLog?.connectionSize || "N/A"
    }</div>
  </div>
    `;

    // Skapa tabellrader från logEntries
    const tableRows = logEntries
      .map(
        (entry) => `
      <tr>
        <td>${entry.time.split(" ")[1]}</td>
        <td>${entry.obq}</td>
        <td>${entry.rate}</td>
        <td>${entry.tanksNo}</td>
        <td>${entry.manifPress}</td>
        <td>${entry.sf}</td>
        <td>${entry.bm}</td>        
        <td class="remarks-cell">${entry.remarks || ""}</td>
       
      </tr>
    `
      )
      .join("");

    // Fyll i tabellen med loggdata
    tableSection.querySelector("tbody").innerHTML = tableRows;
    footer.append(`Generated on: ${new Date().toLocaleString()}`);
    signature.innerHTML = ` <div class="signature-section-horizontal">
        <div class="signature-item">
          <div class="line"></div>
          <span>Chief Officer:</span>
          <span>${loadingLogData.crew.chiefOfficer}</span>
        </div>
        <div class="signature-item">
          <div class="line"></div>
          <span>Surveyor / Load Master:</span>
          
        </div>
      </div>`;

    // När sidan är laddad, kalla på utskriftsdialogen
    printWindow.print();
  };
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

    // Beräkna ETC avg
    const rawTime = logEntries[0].time; // Format: "YYYY-MM-DD hh:mm"
    const isoTime = rawTime.replace(" ", "T"); // Konvertera till "YYYY-MM-DDThh:mm"
    const firstTime = new Date(isoTime);

    if (avgRate > 0) {
      const avgDurationHours = loadingLogData.cargos[0].quantity / avgRate;
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
        loadingLogData.cargos[0].quantity / lastAvgRate;
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

  renderBasicData(); // Uppdatera grundläggande data i UI
};

const renderBasicData = () => {
  const table = document.querySelector(".loading-log-basic-info-table");
  table.innerHTML = `
      <tr>
        <td><strong>Voy:</strong></td>
        <td>${loadingLogData.voyNo}</td>
        <td><strong>Cargo(es):</strong></td>
        <td>${cargo} (${cargoQuant}${cargoUnit})</td>
      </tr>
      <tr>
        <td><strong>Date:</strong></td>
        <td>${loadingLogData.date}</td>
        <td><strong>Port:</strong></td>
        <td>${loadingLogData.port}</td>
      </tr>
      <tr>
        <td><strong>Berth:</strong></td>
        <td>${loadingLogData.jetty}</td>
      </tr>
      <tr>
        <td><strong>Avg. Rate (m3/h):</strong></td>
        <td>${avgRate || "N/A"}</td>
        <td><strong>Last Avg. Rate (m3/h):</strong></td>
        <td>${lastAvgRate || "N/A"}</td>
      </tr>
      <tr>
        <td><strong>ETC avg:</strong></td>
        <td>${etcAvg || "N/A"}</td>
        <td><strong>ETC current:</strong></td>
        <td>${etcCurrent || "N/A"}</td>
      </tr>
    `;
};

// Funktion för att generera loading log-sidan
export const loadingLog = (contentArea) => {
  const voyages = JSON.parse(localStorage.getItem("currentVoyage")) || [];
  const shipSettings = JSON.parse(localStorage.getItem("shipSettings")) || {
    shipName: "",
  };

  let selectedVoyageIndex = localStorage.getItem("selectedVoyageIndex");
  loadingLogData = voyages[selectedVoyageIndex];

  logEntries = loadingLogData.loadingLog?.entries || [];

  etcCurrent = loadingLogData.loadingLog?.rates?.etcCurrent || "-";
  etcAvg = loadingLogData.loadingLog?.rates?.etcAvg || "-";
  avgRate = loadingLogData.loadingLog?.rates?.avgRate || 0;
  lastAvgRate = loadingLogData.loadingLog?.rates?.lastAvgRate || 0;
  cargo = loadingLogData.cargos[cargoSelectIndex].cargo;
  cargoQuant = loadingLogData.cargos[cargoSelectIndex].quantity;
  cargoUnit = loadingLogData.cargos[cargoSelectIndex].unit;

  const generateCargoSelect = () => {
    return `
    <p>Select a cargo to log</p>
    <select id="cargoSelect">
      <option value="" selected disabled>Select cargo</option>
      ${loadingLogData.cargos
        .filter((cargo) => cargo.cargo && cargo.cargo !== "")
        .map(
          (cargo, index) => `
        <option value="${index}" ${
            index == cargoSelectIndex ? "selected" : ""
          }>${cargo.cargo}  (${cargo.quantity} ${cargo.unit})</option>
      `
        )
        .join("")}
    </select>
  `;
  };
  // Add event listener to cargo select
  contentArea.addEventListener("change", (e) => {
    if (e.target.id === "cargoSelect") {
      cargoSelectIndex = parseInt(e.target.value);
      cargo = loadingLogData.cargos[cargoSelectIndex].cargo;
      cargoQuant = loadingLogData.cargos[cargoSelectIndex].quantity;
      cargoUnit = loadingLogData.cargos[cargoSelectIndex].unit;
    }
  });

  contentArea.innerHTML = `
    <div class="loading-log-header-container">
      <h1 class="loading-log-title">Loading Log</h1>
      <div>
    ${generateCargoSelect()}
    </div>
      <button id="printLogButton" class="loading-log-button">Print Log</button>
      
      </div>      <div class="loading-log-container">
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
      value="${loadingLogData.loadingLog?.manifolds || ""}" 
      placeholder="Enter manifold(s) no." 
    />
  </div>
  <div class="loading-log-form-row">
    <label for="connectionSize" class="loading-log-label">Connection size:</label>
    <input 
      type="text" 
      id="connectionSize" 
      class="loading-log-input" 
      value="${loadingLogData.loadingLog?.connectionSize || ""}" 
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
      <th class="loading-log-header">O.B.Q. m3</th>
      <th class="loading-log-header">Rate m3/h</th>
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

    // Save to localStorage
    const voyages = JSON.parse(localStorage.getItem("currentVoyage")) || [];
    const selectedVoyageIndex = localStorage.getItem("selectedVoyageIndex");

    // Initialize loadingLog if it doesn't exist
    if (!voyages[selectedVoyageIndex].loadingLog) {
      voyages[selectedVoyageIndex].loadingLog = {};
    }

    // Save the entire logEntries array
    voyages[selectedVoyageIndex].loadingLog.manifolds = manifoldsInput;
    voyages[selectedVoyageIndex].loadingLog.connectionSize =
      connectionSizeInput;

    localStorage.setItem("currentVoyage", JSON.stringify(voyages));

    alert("Loading log updated successfully!");
    loadingLog(contentArea); // Uppdatera sidan
  });

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
  document.getElementById("printLogButton").addEventListener("click", printLog);

  // Rendera loggtabellen
  renderLogTable();
};
