export const protests = (contentArea) => {
  const voyages = JSON.parse(localStorage.getItem("currentVoyage")) || [];
  const shipSettings = JSON.parse(localStorage.getItem("shipSettings")) || {
    shipName: "",
  };

  let selectedVoyageIndex = localStorage.getItem("selectedVoyageIndex");

  const generateVoyageSelect = () => {
    return `
      <select id="voyageSelect">
        <option value="" selected disabled>Select trip</option>
        ${voyages
          .map(
            (voyage, index) => `
          <option value="${index}" ${
              index == selectedVoyageIndex ? "selected" : ""
            }>${voyage.vessel} from ${voyage.from} to ${voyage.to}</option>
        `
          )
          .join("")}
      </select>
    `;
  };

  // Hämta vald resa
  let selectedVoyage;

  if (selectedVoyageIndex) {
    selectedVoyage = voyages[selectedVoyageIndex];
  }
  // En lista över dokument och de fält som behöver fyllas i
  const documents = [
    {
      title: "Delay protest",
      id: "lop-delay",
      fields: [
        {
          label: "To",
          type: "text",
          placeholder: "Enter receiver of protest",
        },
        {
          label: "Port",
          type: "text",
          placeholder: "Enter port",
        },
        {
          label: "Voy",
          type: "text",
          placeholder: "Enter voyage number",
        },
        { label: "Date", type: "date" },
        { label: "C/P Date", type: "date" },
        { label: "Vessel arrived", type: "datetime-local" },
        { label: "Notice of Readiness tendered", type: "datetime-local" },
        { label: "Loading commenced", type: "datetime-local" },
      ],
    },
    {
      title: "Awaiting documents",
      id: "lop-awaiting-doc",
      fields: [
        {
          label: "To",
          type: "text",
          placeholder: "Enter receiver of protest",
        },
        {
          label: "Port",
          type: "text",
          placeholder: "Enter port",
        },
        {
          label: "Voy",
          type: "text",
          placeholder: "Enter voyage number",
        },
        { label: "Date", type: "date" },
        { label: "C/P Date", type: "date" },
        { label: "Hose/Arms disconnected", type: "datetime-local" },
        { label: "Documents onboard", type: "datetime-local" },
        {
          label: "Documents duly signed",
          type: "datetime-local",
        },
      ],
    },
  ];

  // Visa en lista över alla dokument
  const renderDocumentList = () => {
    contentArea.innerHTML = `
        <h1>Protests</h1>
         <small>Select a voyage to proceed</small>
              <div class="select-container">${generateVoyageSelect()}</div>
        <ul class="document-list">
          ${documents
            .map(
              (doc, index) => `
            <li>
              <button class="document-button" data-index="${index}">
                ${doc.title}
              </button>
            </li>
          `
            )
            .join("")}
        </ul>
      `;

    // Hantera ändring av vald resa
    contentArea.addEventListener("change", (e) => {
      if (e.target.id === "voyageSelect") {
        selectedVoyageIndex = e.target.value;
        localStorage.setItem("selectedVoyageIndex", selectedVoyageIndex);
        selectedVoyage = voyages[selectedVoyageIndex];
        renderCleanlinessCertificateForm();
      }
    });
    // Lägg till eventlyssnare för knapparna
    document.querySelectorAll(".document-button").forEach((button) => {
      button.addEventListener("click", (event) => {
        const docIndex = event.target.getAttribute("data-index");
        renderDocumentForm(documents[docIndex]);
      });
    });
  };

  // Visa formuläret för att fylla i ett dokument
  const renderDocumentForm = (document) => {
    // Funktion för att hämta förifyllt värde baserat på label
    const getPrefillValue = (label) => {
      switch (label) {
        case "Voy":
          return selectedVoyage.voyNo;
        case "To":
          return selectedVoyage.supplierReceiver;
        case "Port":
          return selectedVoyage.port;
        case "Date":
          return selectedVoyage.date || "";
        case "C/P Date":
          return selectedVoyage.cpDated || ""; // Om kontraktsdatum finns
        case "Vessel arrived":
          return (
            selectedVoyage.sof?.eosp?.date +
              " " +
              selectedVoyage.sof?.eosp?.time ||
            "" ||
            ""
          );
        case "Notice of Readiness tendered":
          return (
            selectedVoyage.sof?.["nor-tendered"]?.date +
              " " +
              selectedVoyage.sof?.["nor-tendered"]?.time || ""
          );
        case "Loading commenced":
          return (
            selectedVoyage.sof?.["commenced-load"]?.date +
              " " +
              selectedVoyage.sof?.["commenced-load"]?.time || ""
          );
        case "Hose/Arms disconnected":
          return (
            selectedVoyage.sof?.["disconnected"]?.date +
              " " +
              selectedVoyage.sof?.["disconnected"]?.time || ""
          );
        case "Documents onboard":
          return (
            selectedVoyage.sof?.["documents-onboard"]?.date +
              " " +
              selectedVoyage.sof?.["documents-onboard"]?.time || ""
          );
        case "Documents duly signed":
          return (
            selectedVoyage.sof?.["documents-signed"]?.date +
              " " +
              selectedVoyage.sof?.["documents-signed"]?.time || ""
          );
        default:
          return ""; // Tomt för andra fält
      }
    };
    // Rendera formuläret i contentArea
    contentArea.innerHTML = `
  <h1>${document.title}</h1>
  <form id="document-form" class="document-form">
    ${document.fields
      .map((field) => {
        const prefillValue = getPrefillValue(field.label); // Funktion för att hämta förifyllt värde
        if (field.type === "textarea") {
          return `
            <div class="form-group">
              <label>${field.label}</label>
              <textarea placeholder="${field.placeholder || ""}">${
            prefillValue || ""
          }</textarea>
            </div>
          `;
        } else {
          return `
            <div class="form-group">
              <label>${field.label}</label>
              <input type="${field.type}" placeholder="${
            field.placeholder || ""
          }" value="${prefillValue || ""}" />
            </div>
          `;
        }
      })
      .join("")}
    <button type="submit" class="submit-button">Print Document</button>
    <button type="button" class="back-button">Back to List</button>
  </form>
`;

    // Hämta formulärelementet
    const loadingForm = contentArea.querySelector("#document-form");

    // Lägg till event för formuläret
    loadingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Hämta inskrivna data
      const formData = Array.from(loadingForm.querySelectorAll("input")).reduce(
        (acc, input) => {
          acc[input.previousElementSibling.textContent.trim()] = input.value;
          return acc;
        },
        {}
      );

      formData["Ship"] = shipSettings.shipName;

      // Öppna rätt HTML-sida för utskrift
      const printWindow = window.open(
        `../pages/protests/${document.id}.html`,
        "_blank"
      );

      printWindow.onload = () => {
        // Fyll i data på rätt ställen
        for (const [key, value] of Object.entries(formData)) {
          let formattedValue = value;

          // RegEx för att matcha datetime-local format
          const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
          if (dateTimeRegex.test(value)) {
            // Ersätt "T" med mellanslag
            formattedValue = value.replace("T", "    ");
          }
          const placeholder = printWindow.document.getElementById(
            key
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]/g, "")
          );

          console.log("nyckel: " + key + " -- value: " + formattedValue);

          if (placeholder) {
            placeholder.textContent = formattedValue;
          }
        }

        const shipPlaceholder = printWindow.document.getElementById("ship");
        if (shipPlaceholder) {
          shipPlaceholder.textContent = shipSettings.shipName;
        }
        // Fyll i fartygets namn även i master-protest-delen
        const shipProtestPlaceholder =
          printWindow.document.getElementById("ship-protest");
        if (shipProtestPlaceholder) {
          shipProtestPlaceholder.textContent = ship;
        }

        // Skriv ut sidan
        printWindow.print();
      };
    });

    // Lägg till funktionalitet för 'Back'-knappen
    const backButton = contentArea.querySelector(".back-button");
    backButton.addEventListener("click", renderDocumentList);
  };

  // Starta med att visa listan över dokument
  renderDocumentList();
};
