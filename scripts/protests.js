export const protests = (contentArea) => {
  // En lista över dokument och de fält som behöver fyllas i
  const ship = "M/T FURE VITEN"; //Skall hämtas från globalt givetvis
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
  ];

  // Visa en lista över alla dokument
  const renderDocumentList = () => {
    contentArea.innerHTML = `
        <h1>Protests</h1>
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
    // Rendera formuläret i contentArea
    contentArea.innerHTML = `
      <h1>${document.title}</h1>
      <form id="document-form" class="document-form">
        ${document.fields
          .map((field) => {
            if (field.type === "textarea") {
              return `
                <div class="form-group">
                  <label>${field.label}</label>
                  <textarea placeholder="${field.placeholder || ""}"></textarea>
                </div>
              `;
            } else {
              return `
                <div class="form-group">
                  <label>${field.label}</label>
                  <input type="${field.type}" placeholder="${
                field.placeholder || ""
              }" />
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

      formData["Ship"] = ship;

      // Öppna rätt HTML-sida för utskrift
      const printWindow = window.open(
        `../pages/protests/${document.id}.html`,
        "_blank"
      );

      printWindow.onload = () => {
        // Fyll i data på rätt ställen
        for (const [key, value] of Object.entries(formData)) {
          const placeholder = printWindow.document.getElementById(
            key.toLowerCase().replace(/ /g, "-")
          );
          if (placeholder) {
            placeholder.textContent = value;
          }
        }

        const shipPlaceholder = printWindow.document.getElementById("ship");
        if (shipPlaceholder) {
          shipPlaceholder.textContent = ship;
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
