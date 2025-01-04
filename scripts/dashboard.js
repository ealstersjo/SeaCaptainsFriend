// Kontrollera om användaren är inloggad
if (localStorage.getItem("loggedIn") !== "true") {
  // Redirecta tillbaka till inloggningssidan om användaren inte är inloggad
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  // Hämta referenser till menylänkarna
  const currentVoyageLink = document.getElementById("currentvoyage");
  const statementOfFactLink = document.getElementById("statementoffact");
  const handelVoyageLink = document.getElementById("handlevoyage");
  const handelCalculations = document.getElementById("handlecalculations");

  // Hämta referens till innehållsområdet
  const contentArea = document.querySelector(".content");

  // Hämta skeppsnamn
  const loadShipsDropdown = () => {
    fetch("../data/ships.json")
      .then((response) => response.json())
      .then((ships) => {
        console.log(ships); // Logga data för att säkerställa att den finns
        const vesselSelect = document.getElementById("vessel");
        ships.forEach((ship) => {
          const option = document.createElement("option");
          option.value = ship.name;
          option.textContent = ship.name;
          vesselSelect.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Error loading ships:", error);
      });
  };

  const parseStabilityTableToJSON = (tableRows) => {
    if (tableRows.length < 2) {
      console.error("Table is too short to parse.");
      return [];
    }

    // Extrahera rubriker från första raden och dela upp den enbart på mellanslag
    const headers = tableRows[0].split(/\s+/).map((header) => header.trim());

    // Extrahera enheter från andra raden och dela upp den på mellanslag
    const units = tableRows[1].split(/\s+/).map((unit) => unit.trim());
    units.unshift(null);
    const unitsRow = { Item: null }; // Lägg till en "Item" för enheterna
    headers.slice(1).forEach((header, index) => {
      unitsRow[header] = units[index + 1] || null; // Lägg till enheterna för varje rubrik
    });

    // Processa varje rad från index 2 till slutet
    const data = tableRows.slice(2).map((row, rowIndex) => {
      // Dela på mellanslag för alla rader
      const values = row.split(/\s+(?=[\d-])/).map((value) => value.trim());

      // Extrahera "Item" baserat på första siffran i raden
      let item = extractItem(values[0]);

      // Skapa ett objekt där rubriker matchar värden
      const rowObject = { Item: item };
      headers.slice(1).forEach((header, index) => {
        rowObject[header] = values[index + 1] || null; // Justera index för att hoppa över "Item"
      });

      return rowObject;
    });
    data.unshift(unitsRow); // Lägg till enheterna som första rad

    return data;
  };

  // Funktion för att extrahera "Item" från en rad, dvs. texten innan siffrorna
  const extractItem = (value) => {
    const match = value.match(/^([^\d]+)/); // Extrahera allt före första siffran
    return match ? match[0].trim() : value; // Om inget matchas, returnera hela värdet
  };

  const parseStabilityFile = async (pdfFile) => {
    const pdf = await pdfjsLib.getDocument(URL.createObjectURL(pdfFile))
      .promise;

    let foundTable = null;

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();

      // Skapa en lista med textblock
      const blocks = textContent.items.map((item) => ({
        text: item.str.trim(),
        x: item.transform[4],
        y: item.transform[5],
      }));

      // Sortera textblocken i fallande ordning av y-position (överst till nederst)
      blocks.sort((a, b) => b.y - a.y);

      // Gruppér textblock till rader baserat på y-position
      const rows = [];
      let currentRow = [];
      let lastY = null;

      blocks.forEach((block) => {
        if (lastY === null || Math.abs(block.y - lastY) > 5) {
          if (currentRow.length > 0) rows.push(currentRow);
          currentRow = [];
        }

        currentRow.push(block);
        lastY = block.y;
      });

      if (currentRow.length > 0) rows.push(currentRow);

      // Sammanfoga text i varje rad
      const rowTexts = rows.map((row) =>
        row
          .map((block) => block.text)
          .join(" ")
          .trim()
      );

      // Hitta start- och slutindex för tabellen
      const tableStart = rowTexts.findIndex((rowText) =>
        rowText.startsWith("Item")
      );
      const tableEnd = rowTexts.findIndex((rowText) =>
        rowText.startsWith("Total")
      );

      if (tableStart !== -1 && tableEnd !== -1) {
        // Extrahera raderna som hör till tabellen
        foundTable = rowTexts.slice(tableStart, tableEnd + 1);
        break;
      }
    }

    if (foundTable) {
      //console.log("Extracted Table:", foundTable);
    } else {
      console.log("No table with 'Item' and 'Total' found.");
    }

    const parsedTable = parseStabilityTableToJSON(foundTable);
    //console.log("Parsed: " + JSON.stringify(parsedTable, null, 2)); // Konverterar till JSON-sträng
    return parsedTable;
  };

  const handleStabilityReport = () => {
    return new Promise((resolve, reject) => {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".pdf";

      fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) {
          reject("No file selected");
          return;
        }

        // Bearbeta filen och skapa JSON
        parseStabilityFile(file)
          .then((json) => {
            resolve(json); // Returnera JSON när filen har bearbetats
          })
          .catch((error) => {
            reject("Error parsing file: " + error);
          });
      });

      fileInput.click();
    });
  };

  const loadCalculations = async () => {
    // Gör loadCalculations asynkron
    contentArea.innerHTML = `
      <div>
        <h1>Read file</h1>
        <h3>Stability report</h3>
        <button type="load" id="loadfile">Load file</button>
        <div id="tableContainer"></div>
      </div>`;

    const loading = document.getElementById("loadfile");
    loading.addEventListener("click", async () => {
      // Gör event listenern asynkron
      try {
        const filehandle = await handleStabilityReport(); // Vänta på att filen ska läsas in

        // När filen är laddad, skriv ut tabellen
        if (filehandle && filehandle.length > 0) {
          printTable(filehandle);
        }
      } catch (error) {
        console.error("Error loading stability report:", error);
      }
    });
  };

  const printTable = (data) => {
    const tableContainer = document.getElementById("tableContainer");

    // Skapa en table och enad table body
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");

    // Lägg till grundläggande styling på tabellen
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.marginBottom = "20px";
    table.style.marginTop = "20px";
    table.style.fontFamily = "Arial, sans-serif";

    // Lägg till grundläggande styling på celler
    const cells = document.querySelectorAll("th, td");
    cells.forEach((cell) => {
      cell.style.padding = "10px";
      cell.style.textAlign = "left";
      cell.style.borderBottom = "1px solid #ddd";
    });

    // Om vi får ett JSON-objekt som är en array, skapa tabellrader
    if (Array.isArray(data)) {
      // Skapa rubrikraden från den första objektet
      const headers = Object.keys(data[0]);
      const headerRow = document.createElement("tr");

      headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        th.style.backgroundColor = "#f2f2f2"; // Ljusgrå bakgrund på rubriker
        headerRow.appendChild(th);
      });

      tbody.appendChild(headerRow);

      // Skapa enhetsraden (under rubriker) med ljusgrå bakgrund
      const unitRow = document.createElement("tr");
      headers.forEach((header, colIndex) => {
        const td = document.createElement("td");
        td.textContent = data[0][header] || ""; // Enheter (enligt data, men här anpassas efter enheterna)
        td.style.backgroundColor = "#f2f2f2"; // Ljusgrå bakgrund för enheter
        td.style.textAlign = "center"; // Centrerad text
        unitRow.appendChild(td);
      });

      //tbody.appendChild(unitRow);

      // Skapa datarader från JSON-objektet
      data.forEach((rowData, rowIndex) => {
        const row = document.createElement("tr");

        headers.forEach((header, colIndex) => {
          const td = document.createElement("td");
          td.textContent = rowData[header] || ""; // Sätt tom text om värdet är null eller undefined

          // Lägg till ljusgrå bakgrund på varannan kolumn
          if (colIndex % 2 === 0) {
            td.style.backgroundColor = "#D3D3D3"; // Ljusgrå för varannan kolumn
          }

          if (colIndex > 0 && rowIndex === 0) {
            td.style.textAlign = "center";
          }
          if (colIndex > 0 && rowIndex > 0) {
            td.style.textAlign = "right";
          }

          if (rowIndex === 0) {
            td.style.backgroundColor = "#f2f2f2";
          }
          if (rowIndex === 14) {
            td.style.borderTop = "solid";
          }

          row.appendChild(td);
        });

        tbody.appendChild(row);
      });
    }

    table.appendChild(tbody);
    tableContainer.innerHTML = ""; // Rensa tidigare innehåll
    tableContainer.appendChild(table); // Lägg till tabellen i DOM
  };

  // Funktion för att ladda aktuell resa
  const loadCurrentVoyage = () => {
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

  // Funktion för att ladda Statement of Fact (kan anpassas för dynamiska data)
  const loadStatementOfFact = () => {
    const currentVoyage = localStorage.getItem("currentVoyage");
    if (currentVoyage) {
      const voyageData = JSON.parse(currentVoyage);
      contentArea.innerHTML = `
        <h1>Statement of Fact</h1>
        <table>
          <tr>
            <th>Vessel</th>
            <td>${voyageData.vessel}</td>
            <th>Date</th>
            <td>${voyageData.date}</td>
            <th>PNI #</th>
            <td>${voyageData.pniNumber}</td>
          </tr>
        </table>
      `;
    } else {
      contentArea.innerHTML = `
        <h1>Statement of Fact</h1>
        <p>No current voyage available to display Statement of Fact.</p>
      `;
    }
  };

  const loadHandleVoyage = () => {
    const contentArea = document.querySelector(".content");
    const currentVoyage =
      JSON.parse(localStorage.getItem("currentVoyage")) || {};

    // Visa formuläret för att hantera resan
    contentArea.innerHTML = `
      <h1>Handle Voyage</h1>
      <form id="voyageForm">
        <div>
          <label for="vessel">Vessel:</label>
              <select id="vessel" name="vessel" required>
       <option value="Fure Vite" selected>Fure Vite</option>
        <option value="Fartyg 2">Fartyg 2</option>
        <option value="Fartyg 3">Fartyg 3</option>          </select>
        </div>
        <div>
          <label for="date">Start date:</label>
          <input type="date" id="date" name="date" value="${
            currentVoyage.date || new Date().toISOString().split("T")[0]
          }" required />
        </div>
        <div>
          <label for="pniNumber">PNI #:</label>
          <input type="text" id="pniNumber" name="pniNumber" value="${
            currentVoyage.pniNumber || ""
          }" required />
        </div>
        <div>
          <label for="portOfLoading">Port of Loading:</label>
          <input type="text" id="portOfLoading" name="portOfLoading" value="${
            currentVoyage.portOfLoading || ""
          }" />
        </div>
        <div>
          <label for="portOfDischarge">Port of Discharge:</label>
          <input type="text" id="portOfDischarge" name="portOfDischarge" value="${
            currentVoyage.portOfDischarge || ""
          }" />
        </div>
        <div>
          <label for="date">Estimated date of arrival:</label>
          <input type="date" id="arrivalDate" name="arrivalDate" value="${
            currentVoyage.arrivalDate || ""
          }" required />
        </div>
        <div>
          <label for="cargo">Cargo:</label>
          <textarea id="cargo" name="cargo">${
            currentVoyage.cargo || ""
          }</textarea>
        </div>
        <div>
          <button type="submit">Save Voyage</button>
          <button type="button" id="deleteVoyageButton">Delete Current Voyage</button>
        </div>
      </form>
    `;

    loadShipsDropdown();

    // Hantera formulärens inlämning
    const voyageForm = document.getElementById("voyageForm");
    voyageForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Hämta värden från formuläret
      const vessel = document.getElementById("vessel").value;
      const date = document.getElementById("date").value;
      const arrivalDate = document.getElementById("arrivalDate").value;
      const pniNumber = document.getElementById("pniNumber").value;
      const portOfLoading = document.getElementById("portOfLoading").value;
      const portOfDischarge = document.getElementById("portOfDischarge").value;
      const cargo = document.getElementById("cargo").value;

      // Skapa ett objekt för resan
      const currentVoyage = {
        vessel,
        date,
        arrivalDate,
        pniNumber,
        portOfLoading,
        portOfDischarge,
        cargo,
      };

      // Spara resan i localStorage
      localStorage.setItem("currentVoyage", JSON.stringify(currentVoyage));

      // Bekräfta för användaren
      alert("Current voyage has been saved!");
    });

    // Hantera borttagning av currentVoyage
    const deleteVoyageButton = document.getElementById("deleteVoyageButton");
    deleteVoyageButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete the current voyage?")) {
        // Ta bort currentVoyage från localStorage
        localStorage.removeItem("currentVoyage");

        // Bekräfta för användaren
        alert("Current voyage has been deleted!");

        // Uppdatera sidan för att visa att ingen resa är aktiv
        loadCurrentVoyage();
      }
    });
  };

  // När användaren klickar på respektive menyalternativ
  currentVoyageLink.addEventListener("click", loadCurrentVoyage);
  statementOfFactLink.addEventListener("click", loadStatementOfFact);
  handelVoyageLink.addEventListener("click", loadHandleVoyage);
  handelCalculations.addEventListener("click", loadCalculations);

  // Ladda standardinnehåll (Current Voyage)
  loadCurrentVoyage();
});
