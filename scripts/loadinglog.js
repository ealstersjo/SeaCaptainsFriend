// Testdata (kommer senare att hämtas från localStorage)
let loadingLogData = {
  ship: "M/T Fure Viten",
  voy: "FVI2025002",
  cargo: "Reformate",
  date: "2025-01-10",
  port: "Gothenburg",
  berth: "Kaj 521",
  manifolds: "4",
  connectionSize: "1x8 + VPR",
  avgRate: 0,
  lastAvgRate: 0,
  etcAvg: "Not started",
  etcCurrent: "Not started",
  toLoad: 15000,
};

const tempLoadingLog = [
  {
    bm: "86",
    isEditable: false,
    manifPress: "0",
    obq: "0",
    rate: "0",
    remarks: "Start Loading",
    sf: "60",
    tanksNo: "4P",
    time: "2025-01-10 00:30",
  },
  {
    bm: "84",
    isEditable: false,
    manifPress: "0",
    obq: "210",
    rate: "210",
    remarks: "",
    sf: "60",
    tanksNo: "3, P/S",
    time: "2025-01-10 01:00",
  },
  {
    bm: "76",
    isEditable: false,
    manifPress: "0",
    obq: "1,239",
    rate: "1,029",
    remarks: "",
    sf: "54",
    tanksNo: "2,4,6 P/S",
    time: "2025-01-10 02:00",
  },
  {
    bm: "67",
    isEditable: false,
    manifPress: "0",
    obq: "2,265",
    rate: "1,026",
    remarks: "",
    sf: "47",
    tanksNo: "2,4,6 P/S",
    time: "2025-01-10 03:00",
  },
  {
    bm: "58",
    isEditable: false,
    manifPress: "0",
    obq: "3,322",
    rate: "1,057",
    remarks: "",
    sf: "43",
    tanksNo: "2,4,6 P/S",
    time: "2025-01-10 04:00",
  },
  {
    bm: "53",
    isEditable: false,
    manifPress: "0",
    obq: "4,367",
    rate: "1,045",
    remarks: "",
    sf: "39",
    tanksNo: "2,4,6 P/S",
    time: "2025-01-10 05:00",
  },
  {
    bm: "47",
    isEditable: false,
    manifPress: "0",
    obq: "5,417",
    rate: "1,050",
    remarks: "",
    sf: "35",
    tanksNo: "2,4,6 P/S",
    time: "2025-01-10 06:00",
  },
  {
    bm: "48",
    isEditable: false,
    manifPress: "0",
    obq: "6,408",
    rate: "991",
    remarks: "",
    sf: "37",
    tanksNo: "2,4,6 P/S",
    time: "2025-01-10 07:00",
  },
  {
    bm: "49",
    isEditable: false,
    manifPress: "0",
    obq: "7,472",
    rate: "1,064",
    remarks: "",
    sf: "37",
    tanksNo: "1,3,5 P/S",
    time: "2025-01-10 08:00",
  },
  {
    bm: "46",
    isEditable: false,
    manifPress: "0",
    obq: "8,502",
    rate: "1,030",
    remarks: "",
    sf: "33",
    tanksNo: "1,3,5 P/S",
    time: "2025-01-10 09:00",
  },
  {
    bm: "46",
    isEditable: false,
    manifPress: "0",
    obq: "8,953",
    rate: "451",
    remarks: "Shore stop",
    sf: "33",
    tanksNo: "1,3,5 P/S",
    time: "2025-01-10 09:30",
  },
  {
    bm: "46",
    isEditable: false,
    manifPress: "0",
    obq: "8,953",
    rate: "0",
    remarks: "Resume loading",
    sf: "33",
    tanksNo: "1,3,5 P/S",
    time: "2025-01-10 09:40",
  },
  {
    bm: "46",
    isEditable: false,
    manifPress: "0",
    obq: "9,119",
    rate: "166",
    remarks: "",
    sf: "33",
    tanksNo: "1,3,5 P/S",
    time: "2025-01-10 10:00",
  },
  {
    bm: "44",
    isEditable: false,
    manifPress: "0",
    obq: "10,151",
    rate: "1,032",
    remarks: "",
    sf: "30",
    tanksNo: "1,3,5 P/S",
    time: "2025-01-10 11:00",
  },
  {
    bm: "41",
    isEditable: false,
    manifPress: "0",
    obq: "11,230",
    rate: "1,079",
    remarks: "",
    sf: "28",
    tanksNo: "1,3,5 P/S",
    time: "2025-01-10 12:00",
  },
  {
    bm: "40",
    isEditable: false,
    manifPress: "0",
    obq: "12,249",
    rate: "1,019",
    remarks: "",
    sf: "26",
    tanksNo: "1,3,5 P/S",
    time: "2025-01-10 13:00",
  },
  {
    bm: "42",
    isEditable: false,
    manifPress: "0",
    obq: "13,294",
    rate: "1,045",
    remarks: "",
    sf: "30",
    tanksNo: "1,3,5 P/S",
    time: "2025-01-10 14:00",
  },
  {
    bm: "32",
    isEditable: false,
    manifPress: "0",
    obq: "14,339",
    rate: "1,045",
    remarks: "",
    sf: "26",
    tanksNo: "4,5,6 P/S",
    time: "2025-01-10 15:00",
  },
  {
    bm: "26",
    isEditable: false,
    manifPress: "0",
    obq: "15,386",
    rate: "1,047",
    remarks: "",
    sf: "23",
    tanksNo: "2,4,5 P/S",
    time: "2025-01-10 16:00",
  },
  {
    bm: "26",
    isEditable: false,
    manifPress: "0",
    obq: "16,434",
    rate: "1,048",
    remarks: "",
    sf: "-17",
    tanksNo: "2,4,6 P/S",
    time: "2025-01-10 17:00",
  },
  {
    bm: "24",
    isEditable: false,
    manifPress: "0",
    obq: "17,527",
    rate: "1,093",
    remarks: "",
    sf: "16",
    tanksNo: "2,4,6 P/S",
    time: "2025-01-10 18:00",
  },
  {
    bm: "22",
    isEditable: false,
    manifPress: "0",
    obq: "18,150",
    rate: "623",
    remarks: "Shore stop",
    sf: "-11",
    tanksNo: "2,4,6 P/S",
    time: "2025-01-10 18:40",
  },
  {
    bm: "21",
    isEditable: false,
    manifPress: "0",
    obq: "18,150",
    rate: "0",
    remarks: "Resume loading",
    sf: "-11",
    tanksNo: "2,4,6 P/S",
    time: "2025-01-10 18:55",
  },
  {
    bm: "21",
    isEditable: false,
    manifPress: "0",
    obq: "18,210",
    rate: "60",
    remarks: "Avg Rate: 988cbm/h",
    sf: "-10",
    tanksNo: "2,4,6 P/S",
    time: "2025-01-10 19:00",
  },
];
let logEntries = tempLoadingLog; // Array för att lagra loggdata

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

// Funktion för att öppna och skriva ut loggdata
const printLog = () => {
  const printWindow = window.open("../pages/printLoading.html", "_blank");

  // Vänta tills utskriftsmallen är laddad
  printWindow.onload = () => {
    // Hitta elementet i utskriftsmallen där vi ska fylla i data
    const headerSection = printWindow.document.querySelector(".header");

    const tableSection = printWindow.document.querySelector(".table-container");
    const footer = printWindow.document.querySelector(".footer");

    // Fyll i header-datan (loadingLogData)
    headerSection.innerHTML = `
    <div class="header-info">
  <img src="../assets/furetank.png" alt="Logo" class="header-logo" />
  <div class="header-title">
    
    <h1>${loadingLogData.ship}</h1>
    <h1>Loading Log</h1>
  </div>
  </div>
  <div class="header-content1">
    <div><strong>Voyage:</strong> ${loadingLogData.voy}</div>
    <div><strong>Cargo(es):</strong> ${loadingLogData.cargo}</div>
    </div>
    <div class="header-content2">
    <div><strong>Date:</strong> ${loadingLogData.date}</div>
    <div><strong>Port:</strong> ${loadingLogData.port}</div>
    <div><strong>Berth:</strong> ${loadingLogData.berth}</div>
    </div>
    <div class="header-content3">
    <div><strong>Manifold(s) No:</strong> ${loadingLogData.manifolds}</div>
    <div><strong>Connection Size:</strong> ${loadingLogData.connectionSize}</div>
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
    loadingLogData.avgRate = parseInt(totalRate / logEntries.length);

    // Hämta lastAvgRate
    loadingLogData.lastAvgRate =
      parseFloat(logEntries[logEntries.length - 1].rate) || 0;

    // Beräkna ETC avg
    const firstTime = new Date(Date.parse(logEntries[0].time));
    if (loadingLogData.avgRate > 0) {
      const avgDurationHours = loadingLogData.toLoad / loadingLogData.avgRate;
      const etcAvgTime = new Date(
        firstTime.getTime() + avgDurationHours * 3600000
      );
      loadingLogData.etcAvg = etcAvgTime.toLocaleString("sv-SE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      loadingLogData.etcAvg = "-";
    }

    // Beräkna ETC current
    const lastTime = new Date(
      Date.parse(logEntries[logEntries.length - 1].time)
    );

    if (loadingLogData.lastAvgRate > 0) {
      const currentDurationHours =
        loadingLogData.toLoad / loadingLogData.lastAvgRate;
      const etcCurrentTime = new Date(
        lastTime.getTime() + currentDurationHours * 3600000
      );
      loadingLogData.etcCurrent = etcCurrentTime.toLocaleString("sv-SE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      loadingLogData.etcCurrent = "-";
    }
  } else {
    // Nollställ värden om inga logEntries
    loadingLogData.avgRate = 0;
    loadingLogData.lastAvgRate = 0;
    loadingLogData.etcAvg = "-";
    loadingLogData.etcCurrent = "-";
  }
  renderBasicData(); // Uppdatera grundläggande data i UI
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
      <tr>
        <td><strong>ETC avg:</strong></td>
        <td>${loadingLogData.etcAvg}</td>
        <td><strong>ETC current:</strong></td>
        <td>${loadingLogData.etcCurrent}</td>
      </tr>
    `;
};

// Funktion för att generera loading log-sidan
export const loadingLog = (contentArea) => {
  contentArea.innerHTML = `
    <div class="loading-log-header-container">
      <h1 class="loading-log-title">Loading Log</h1>
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
