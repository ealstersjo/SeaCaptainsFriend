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

      Promise.all([parseUllageFile(file), parseUllageFileHeader(file)])
        .then(([ullageData, headerData]) => {
          // Kombinera de två resultaten
          const combinedData = {
            ullage: ullageData,
            headers: headerData,
          };
          // Returnera det kombinerade resultatet
          resolve(combinedData);
        })
        .catch((error) => {
          // Hantera eventuella fel
          reject("Error parsing files: " + error);
        });
    });

    fileInput.click();
  });
};

const parseUllageFileHeader = async (file) => {
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
    const exctractedQuantities = extractQuantities(fullText);
    const exctractedBill = extractBillOfLading(fullText);
    const combinedData = {
      headers: extractedValues,
      quantities: exctractedQuantities,
      billOfLading: exctractedBill,
    };

    return combinedData; // Returnera extraherade värden
  } catch (error) {
    throw new Error("Failed to parse PDF: " + error.message);
  }
};

const parseUllageFile = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = "";

    // Iterera över varje sida och hämta text med positionering
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      try {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();

        // Ordna texten baserat på position (sortera textobjekten efter y-position och sedan x-position)
        const sortedItems = textContent.items.sort((a, b) => {
          if (a.transform[5] === b.transform[5]) {
            return a.transform[4] - b.transform[4]; // Sortera efter x-position om y-positionen är lika
          }
          return b.transform[5] - a.transform[5]; // Sortera efter y-position
        });

        // Bygg upp texten i korrekt ordning
        const pageText = sortedItems.map((item) => item.str).join(" ");
        fullText += pageText + "\n";
      } catch (pageError) {
        console.error(`Error processing page ${pageNum}:`, pageError);
      }
    }

    //console.log(fullText);
    const extractProdAndDens = extractProductAndDensity(fullText);
    const exctractedTankData = extractTankData(fullText);
    const combinedData = {
      productAndDensity: extractProdAndDens,
      tankData: exctractedTankData,
    };

    //console.log(combinedData);
    return combinedData;
  } catch (error) {
    console.error("Failed to parse PDF:", error);
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
    /Vessel:\s*([^\n,]+(?:\s+[^\n,]+)*)\s*,\s*Hull\s*([^\n,]+)(?=\s*Voyage)/i
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
  // Matcha produktinformation och hantera "ASTM table: 54B" mellan Product och REFORMATE
  const productMatch = text.match(
    /Product:\s*(ASTM\s*table:\s*(\d+[A-Z]?)\s*)?([A-Za-z\s]+)(?=\s*Density)/i
  ); // Extrahera både ASTM table och produktnamn
  const densityInVacMatch = text.match(
    /Density in vac at 15 deg C:\s*([\d.]+)\s*\(t\/m3\)/i
  ); // Fångar Density in vac
  const densityInAirMatch = text.match(
    /Density in air at 15 deg C:\s*([\d.]+)\s*\(t\/m3\)/i
  ); // Fångar Density in air

  return {
    Product: productMatch ? productMatch[3].trim() : "Not Found", // Extrahera produktnamnet (REFORMATE)
    ASTMTable:
      productMatch && productMatch[2] ? productMatch[2].trim() : "Not Found", // Extrahera ASTM table (54B)
    DensityInVac: densityInVacMatch ? densityInVacMatch[1].trim() : "Not Found", // Extrahera Density in vac
    DensityInAir: densityInAirMatch ? densityInAirMatch[1].trim() : "Not Found", // Extrahera Density in air
  };
};

const extractTankData = (text) => {
  // Första regex för att hitta tabellen mellan "C1p" och "Quantities before load"
  const tableRegex = /C1p(.*?)(?=Quantities before load)/s;

  // Hitta tabellen i texten
  const matchTable = text.match(tableRegex);

  if (!matchTable) {
    console.log("Tabellen kunde inte hittas.");
    return [];
  }
  const tableData = JSON.stringify(matchTable[0]);
  // Regex för att lägga till radbrytning före varje kod som börjar med C och inkluderar Oil in Pipes och Total
  const formattedText = tableData.replace(
    /(C\d+[ps]|Oil in Pipes|Total)/g,
    "\n$1"
  );
  const lines = formattedText
    .split("\n")
    .filter((line) => line !== "" && line.trim().length > 0); // Filtrera bort rader som är tomma eller bara innehåller mellanslag
  const tanks = [];
  lines.forEach((line) => {
    const values = line.split(/\s+/); // Delar upp efter mellanrum
    if (values[0] !== '"') {
      if (values[0] === "Oil" && values[1] === "in" && values[2] === "Pipes") {
        // Hantera raden "Oil in Pipes" specifikt
        const oilInPipesTank = {
          name: "Oil in Pipes",
          GaugeSystem: null, // Radar
          Obs: null,
          Corr: null,
          Vol: parseFloat(values[3]),
          FWVolume: null,
          GOV: parseFloat(values[4]),
          Temp: parseFloat(values[5]),
          VCF: parseFloat(values[6]),
          GSVAt15C: parseFloat(values[7]),
          GSVAt60F: parseFloat(values[8]),
          WeightInAir: parseFloat(values[9]),
          WeightInVac: parseFloat(values[10]),
        };
        tanks.push(oilInPipesTank);
      } else if (values[0] === "Total") {
        const total = {
          name: values[0],
          GaugeSystem: null, // Radar
          Obs: null,
          Corr: null,
          Vol: parseFloat(values[1]),
          FWVolume: parseFloat(values[2]),
          GOV: parseFloat(values[3]),
          Temp: parseFloat(values[4]),
          VCF: null,
          GSVAt15C: parseFloat(values[5]),
          GSVAt60F: parseFloat(values[6]),
          WeightInAir: parseFloat(values[7]),
          WeightInVac: parseFloat(values[8]),
        };
        tanks.push(total);
      } else {
        // Skapa ett objekt för varje rad (för C1p, C2p, etc.)
        const tank = {
          name: values[0], // Första kolumnen är tankens namn (C1p, C1s, etc.)
          GaugeSystem: values[1], // Andra kolumnen är typen (Radar)
          Obs: parseFloat(values[2]),
          Corr: parseFloat(values[3]),
          Vol: parseFloat(values[4]),
          FWVolume: null,
          GOV: parseFloat(values[5]),
          Temp: parseFloat(values[6]),
          VCF: parseFloat(values[7]),
          GSVAt15C: parseFloat(values[8]),
          GSVAt60F: parseFloat(values[9]),
          WeightInAir: parseFloat(values[10]),
          WeightInVac: parseFloat(values[11]),
        };

        tanks.push(tank);
      }
    }
  });
  return tanks;
};

const extractQuantities = (text) => {
  // Regex för att hitta texten mellan de olika delarna
  const quantitiesBeforeRegex =
    /Quantities before load(.*?)(?=Quantities after load)/s;
  const quantitiesAfterRegex =
    /Quantities after load(.*?)(?=Loaded quantities)/s;
  const quantitiesLoadedRegex = /Loaded quantities(.*?)(?=Bill of lading)/s;

  // Hitta matcherna i texten
  const matchBeforeQuantities = text.match(quantitiesBeforeRegex);
  const matchAfterQuantities = text.match(quantitiesAfterRegex);
  const matchLoadedQuantities = text.match(quantitiesLoadedRegex);

  if (
    !matchBeforeQuantities ||
    !matchAfterQuantities ||
    !matchLoadedQuantities
  ) {
    console.log("En eller flera kvantiteter kunde inte hittas.");
    return null;
  }

  // Funktion för att extrahera och skapa objekt från numeriska värden
  const extractQuantitiesFromText = (quantitiesText) => {
    // Regex för att extrahera alla numeriska värden
    const numberRegex = /\d+\.\d+/g;
    const numbers = quantitiesText.match(numberRegex);

    if (!numbers) {
      console.log("Inga numeriska värden hittades.");
      return null;
    }

    // Konvertera strängarna till flyttal
    const numericValues = numbers.map((value) => parseFloat(value));

    // Bygg objektet med värdena
    return {
      TOV: numericValues[0] !== undefined ? numericValues[0] : 0,
      F_W: numericValues[1] !== undefined ? numericValues[1] : 0,
      GOV: numericValues[2] !== undefined ? numericValues[2] : 0,
      GSVAt15C: numericValues[3] !== undefined ? numericValues[3] : 0,
      GSVAt60F: numericValues[4] !== undefined ? numericValues[4] : 0,
      WeightInAir: numericValues[5] !== undefined ? numericValues[5] : 0,
      WeightInVac: numericValues[6] !== undefined ? numericValues[6] : 0,
    };
  };

  // Extrahera de numeriska värdena för varje del
  const quantBefore = extractQuantitiesFromText(
    matchBeforeQuantities[0].trim()
  );
  const quantAfter = extractQuantitiesFromText(matchAfterQuantities[0].trim());
  const quantLoaded = extractQuantitiesFromText(
    matchLoadedQuantities[0].trim()
  );

  // Returnera alla extraherade objekt
  return {
    quantBefore,
    quantAfter,
    quantLoaded,
  };
};

const extractBillOfLading = (text) => {
  // Regex för att hitta texten mellan "Bill of lading" och "Master"
  const billOfLadingRegex = /Bill of lading(.*?)(?=Master)/s;

  // Hitta matchen i texten
  const matchBill = text.match(billOfLadingRegex);

  if (!matchBill) {
    console.log("Bill of lading kunde inte hittas.");
    return null;
  }

  const billOfLadingText = matchBill[0].trim();

  // Regex för att extrahera alla numeriska värden
  const numberRegex = /\d+\.\d+/g;
  const numbers = billOfLadingText.match(numberRegex);

  if (!numbers) {
    console.log("Inga numeriska värden hittades.");
    return null;
  }

  // Konvertera de extraherade strängarna till flyttal
  const numericValues = numbers.map((value) => parseFloat(value));
  // Bygg objektet med de extraherade värdena
  const billOfLading = {
    WtVac: numericValues[0] !== undefined ? numericValues[0] : 0,
    DiffShipFig: numericValues[1] !== undefined ? numericValues[1] : 0,
    VEF: numericValues[2] !== undefined ? numericValues[2] : 0,
    GSVAt15C: numericValues[3] !== undefined ? numericValues[3] : 0,
    GSVAt60F: numericValues[4] !== undefined ? numericValues[4] : 0,
    WeightInAir: numericValues[5] !== undefined ? numericValues[5] : 0,
    WeightInVac: numericValues[6] !== undefined ? numericValues[6] : 0,
  };

  return billOfLading;
};
