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
  const pdf = await pdfjsLib.getDocument(URL.createObjectURL(pdfFile)).promise;

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

  const parsedTable = parseStabilityTableToJSON(foundTable);
  return parsedTable;
};

export const handleStabilityReport = () => {
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

export const printStabilityTable = (data) => {
  const tableContainer = document.getElementById("tableContainerStability");

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
