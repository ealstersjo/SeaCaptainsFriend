export const calculations = async (contentArea) => {
  contentArea.innerHTML = `
      <div>
        <h1>Do your calculation</h1>
        <h3>Stowage report</h3>
        <button type="button" id="stowage">Do stowage report</button>
      </div>
    `;

  // Lägg till eventlistener för stowage-knappen
  const stowageButton = document.getElementById("stowage");
  stowageButton.addEventListener("click", () => {
    // Visa formuläret för att mata in värden
    renderStowageForm(contentArea);
  });
};

// Funktion för att rendera stowage-formuläret
const renderStowageForm = (contentArea) => {
  contentArea.innerHTML = `
      <div>
        <h2>Stowage Report Form</h2>
        <form id="stowageForm">
          <div>
            <label for="cargoWeight">Cargo Weight (tons):</label>
            <input type="number" id="cargoWeight" name="cargoWeight" required />
          </div>
          <div>
            <label for="availableSpace">Available Space (cubic meters):</label>
            <input type="number" id="availableSpace" name="availableSpace" required />
          </div>
          <div>
            <label for="portDistance">Port Distance (nautical miles):</label>
            <input type="number" id="portDistance" name="portDistance" required />
          </div>
          <button type="button" id="calculateButton">Calculate</button>
        </form>
        <div id="calculationResult"></div>
        <button type="deleteButton" id="backButton">Back to Main Page</button>
      </div>
    `;

  // Lägg till eventlistener för Calculate-knappen
  const calculateButton = document.getElementById("calculateButton");
  calculateButton.addEventListener("click", () => {
    // Hämta värden från formuläret
    const cargoWeight = parseFloat(
      document.getElementById("cargoWeight").value
    );
    const availableSpace = parseFloat(
      document.getElementById("availableSpace").value
    );
    const portDistance = parseFloat(
      document.getElementById("portDistance").value
    );

    // Anropa beräkningsfunktionen
    const result = performCalculation(
      cargoWeight,
      availableSpace,
      portDistance
    );

    // Visa resultatet som JSON
    const resultContainer = document.getElementById("calculationResult");
    resultContainer.innerHTML = `
        <h3>Calculation Result</h3>
        <pre>${JSON.stringify(result, null, 2)}</pre>
      `;
  });

  // Lägg till eventlistener för Back-knappen
  const backButton = document.getElementById("backButton");
  backButton.addEventListener("click", () => {
    calculations(contentArea); // Gå tillbaka till huvudsidan
  });
};

// Beräkningsfunktion
const performCalculation = (cargoWeight, availableSpace, portDistance) => {
  const maxWeight = 500; // Max tillåten vikt i ton
  const requiredSpacePerTon = 2; // Utrymme i kubikmeter per ton
  const success =
    cargoWeight <= maxWeight &&
    availableSpace >= cargoWeight * requiredSpacePerTon;

  // Returnera resultatet som ett objekt
  return {
    success,
    message: success
      ? "Cargo can be safely loaded."
      : "Cargo exceeds weight or space limits.",
    calculations: {
      cargoWeight,
      availableSpace,
      portDistance,
      requiredSpace: cargoWeight * requiredSpacePerTon,
      maxWeight,
    },
  };
};
