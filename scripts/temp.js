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
