export const handleVoyage = (contentArea) => {
  const currentVoyage = JSON.parse(localStorage.getItem("currentVoyage"));

  if (!currentVoyage) {
    // Om det inte finns en aktuell resa
    contentArea.innerHTML = `
      <h1>There is no current voyage.</h1>
      <h3>Would you like to commence a new voyage?</h3>
      <button id="commenceVoyageButton" type="commence">Commence Voyage</button>
    `;

    // Hantera när knappen trycks för att starta en ny resa
    const commenceVoyageButton = document.getElementById(
      "commenceVoyageButton"
    );
    commenceVoyageButton.addEventListener("click", () => {
      // Visa formuläret för att hantera resan
      contentArea.innerHTML = `
        <h1>Commence Voyage</h1>
        <form id="voyageForm">
          <div>
            <label for="vessel">Vessel:</label>
            <select id="vessel" name="vessel" required></select>
          </div>
          <div>
            <label for="date">Start date:</label>
            <input type="date" id="date" name="date" value="${
              new Date().toISOString().split("T")[0]
            }" required />
          </div>
          <div>
            <label for="voyageNumber">Voyage number:</label>
            <input type="text" id="voyageNumber" name="voyageNumber" required />
          </div>
          <div>
            <label for="pniNumber">PNI #:</label>
            <input type="text" id="pniNumber" name="pniNumber" required />
          </div>
          <div>
            <label for="portOfLoading">Port of Loading:</label>
            <input type="text" id="portOfLoading" name="portOfLoading" required/>
          </div>
          <div>
            <label for="portOfDischarge">Port of Discharge:</label>
            <input type="text" id="portOfDischarge" name="portOfDischarge" required />
          </div>
          <div>
            <label for="arrivalDate">Estimated date of arrival:</label>
            <input type="date" id="arrivalDate" name="arrivalDate" />
          </div>
          <div>
            <h3>Cargo</h3>
            <label for="type">Cargo:</label>
            <input type="text" id="type" name="type" required/>
          </div>
          <div>
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" />
          </div>
          <div>
            <label for="unit">Unit:</label>
            <input type="text" id="unit" name="unit" />
          </div>
          <div>
            <label for="cargo">Hazard class:</label>
            <textarea id="hazard" name="hazard" ></textarea>
          </div>
          <div>
          <h3>Crew</h3>
            <label for="master">Master:</label>
            <input type="text" id="master" name="master" required/>
          </div>
          <div>
            <label for="chiefOfficer">Chief Officer:</label>
            <input type="text" id="chiefOfficer" name="chiefOfficer" required/>
          </div>
          <div>
            <label for="secondOfficer1">Second Officer:</label>
            <input type="text" id="secondOfficer1" name="secondOfficer1" />
          </div>
          <div>
            <label for="secondOfficer2">Second Officer:</label>
            <input type="text" id="secondOfficer2" name="secondOfficer2" />
          </div>
          <div>
            <button type="submit">Commence Voyage</button>
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
        const pniNumber = document.getElementById("voyageNumber").value;
        const voyageNumber = document.getElementById("pniNumber").value;

        const portOfLoading = document.getElementById("portOfLoading").value;
        const portOfDischarge =
          document.getElementById("portOfDischarge").value;
        const type = document.getElementById("type").value;
        const unit = document.getElementById("unit").value;
        const quantity = document.getElementById("quantity").value;
        const hazard = document.getElementById("hazard").value;
        const master = document.getElementById("master").value;
        const chiefOfficer = document.getElementById("chiefOfficer").value;
        const secondOfficer1 = document.getElementById("secondOfficer1").value;
        const secondOfficer2 = document.getElementById("secondOfficer2").value;

        // Skapa ett objekt för resan
        const currentVoyage = {
          vessel,
          date,
          arrivalDate,
          pniNumber,
          voyageNumber,
          portOfLoading,
          portOfDischarge,
          cargo: {
            type,
            quantity,
            unit,
            hazard,
          },
          crew: {
            master,
            chiefOfficer,
            secondOfficer1,
            secondOfficer2,
          },
        };

        // Spara resan i localStorage
        localStorage.setItem("currentVoyage", JSON.stringify(currentVoyage));

        // Bekräfta för användaren
        alert("A new voyage has commenced");
        handleVoyage(contentArea); // Ladda om innehållet
      });
    });
  } else {
    // Om det finns en aktuell resa, visa JSON-datan för currentVoyage
    contentArea.innerHTML = `
      <h1>Current Voyage</h1>
      <pre>${JSON.stringify(currentVoyage, null, 2)}</pre>
      <button id="deleteVoyageButton" type="deleteButton">Delete Current Voyage</button>
    `;

    // Hantera borttagning av currentVoyage
    const deleteVoyageButton = document.getElementById("deleteVoyageButton");
    deleteVoyageButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete the current voyage?")) {
        // Ta bort currentVoyage från localStorage
        localStorage.removeItem("currentVoyage");

        // Bekräfta för användaren
        alert("Current voyage has been deleted!");

        // Ladda om sidan för att visa att ingen resa är aktiv
        handleVoyage(contentArea); // Ladda om innehållet
      }
    });
  }
};

// Ladda skeppsnamnen
const loadShipsDropdown = () => {
  fetch("../data/ships.json")
    .then((response) => response.json())
    .then((ships) => {
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

export const handleUllageReport = () => {
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
      parseUllageFile(file)
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

const parseUllageFile = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer(); // Läs in filen som ArrayBuffer
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = "";

    // Iterera över varje sida i PDF:en och extrahera text
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      // Extrahera text från textContent och sammanfoga
      const pageText = textContent.items.map((item) => item.str).join(" ");
      fullText += pageText + "\n";
    }
    const extractedValues = extractValues(fullText);
    //console.log(extractValues);
    return extractedValues; // Returnera extraherade värden
  } catch (error) {
    throw new Error("Failed to parse PDF: " + error.message);
  }
};

// Funktion för att extrahera "Port", "Terminal" och "Operator"
const extractValues = (text) => {
  const portMatch = text.match(/Port:\s*([^\n,]+)/i);
  const terminalMatch = text.match(/Terminal:\s*([^\n,]+)/i);
  const operatorMatch = text.match(/Operator:\s*([^\n]+?)(?=\s*Page:)/i); // Operator fram till Page
  const dateMatch = text.match(/\b(\d{4}-\d{2}-\d{2})\b/); // Datum i format YYYY-MM-DD
  const vesselAndHullMatch = text.match(
    /Vessel:\s*([^\n,]+(?:\s+[^\n,]+)*)\s*,\s*Hull\s*([^\n,]+)/i
  ); // Fångar både Vessel och Hull
  const voyageMatch = text.match(/Voyage:\s*([^\s]+)/i); // Fångar endast första ordet efter "Voyage:"
  const headerMatch = text.match(/(Ullage report\.[^\n]*?)(?=\s*Port:)/i); // Fångar rubriken fram till "Port:"

  const draftForeMatch = text.match(/Draft Fore:\s*([\d.,]+)\s*\(m\)/i);
  const draftAftMatch = text.match(/Draft Aft:\s*([\d.,]+)\s*\(m\)/i);
  const trimMatch = text.match(/Trim:\s*([\d.,]+)a\s*\(m\)/i);
  const heelMatch = text.match(/Heel:\s*([\d.,]+)s\s*\(deg\)/i);

  return {
    Port: portMatch ? portMatch[1].trim() : "Not Found",
    Terminal: terminalMatch ? terminalMatch[1].trim() : "Not Found",
    Operator: operatorMatch ? operatorMatch[1].trim() : "Not Found",
    Date: dateMatch ? dateMatch[1].trim() : "Not Found",
    VesselAndHull: vesselAndHullMatch
      ? `Vessel: ${vesselAndHullMatch[1].trim()}, Hull ${vesselAndHullMatch[2].trim()}`
      : "Not Found", // Kombinerar Vessel och Hull
    Voyage: voyageMatch ? voyageMatch[1].trim() : "Not Found", // Endast resenummer
    Header: headerMatch ? headerMatch[1].trim() : "Not Found",
    DraftFore: draftForeMatch ? draftForeMatch[1].trim() : "Not Found", // Extraherar Draft Fore
    DraftAft: draftAftMatch ? draftAftMatch[1].trim() : "Not Found", // Extraherar Draft Aft
    Trim: trimMatch ? trimMatch[1].trim() : "Not Found", // Extraherar Trim
    Heel: heelMatch ? heelMatch[1].trim() : "Not Found", // Extraherar Heel
  };
};

const extractProductAndDensity = (text) => {
  // Matcha alla 3 kolumner
  const match = text.match(
    /Product:\s*(\S+)\s+Density in vac at 15 deg C:\s*([\d.]+)\s+Density in air at 15 deg C:\s*([\d.]+)\s+ASTM table:\s*(\S+)/
  );

  if (match) {
    return {
      Product: match[1] || "Not Found",
      DensityInVac: match[2] ? `${match[2]} (t/m3)` : "Not Found",
      DensityInAir: match[3] ? `${match[3]} (t/m3)` : "Not Found",
      ASTMTable: match[4] || "Not Found",
    };
  }

  return {
    Product: "Not Found",
    DensityInVac: "Not Found",
    DensityInAir: "Not Found",
    ASTMTable: "Not Found",
  };
};
