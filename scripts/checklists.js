export const checklists = (contentArea) => {
  // Hämta checklists.json med fetch
  fetch("../data/checklists.json")
    .then((response) => {
      // Kontrollera att filen finns och att det inte är ett fel
      if (!response.ok) {
        throw new Error("Filen kunde inte hämtas");
      }
      return response.json();
    })
    .then((checklists) => {
      // Rensa befintligt innehåll i checklist-container
      contentArea.innerHTML = "";

      // Lägg till rubrik för checklistor
      const title = document.createElement("h1");
      title.textContent = "Checklists";
      contentArea.appendChild(title);

      // Skapa en checklista för varje objekt i 'checklists'
      checklists.forEach((checklist) => {
        // Skapa en wrapper för varje checklista
        const checklistDiv = document.createElement("div");
        checklistDiv.classList.add("checklist");

        // Skapa en rubrik för checklistan
        const header = document.createElement("button");
        header.textContent = checklist.title;
        header.classList.add("checklist-header");
        header.onclick = () => {
          // Toggle expansionen av checklistans innehåll
          const content = checklistDiv.querySelector(".checklist-content");
          const printButton = checklistDiv.querySelector(".print-button");

          // Byt visibilitet av innehåll
          const isContentVisible = content.style.display === "block";
          content.style.display = isContentVisible ? "none" : "block";

          // Gör skriv ut-knappen synlig eller osynlig beroende på om innehållet är expanderat
          printButton.style.display = isContentVisible
            ? "none"
            : "inline-block";
        };

        checklistDiv.appendChild(header);

        // Skapa checklistans innehåll (utan checkboxar)
        const content = document.createElement("ul");
        content.classList.add("checklist-content");
        content.style.display = "none"; // Håll innehållet dolt initialt

        // Skapa skriv ut-knappen för varje checklista, initialt dold
        const printButton = document.createElement("button");
        printButton.textContent = "Print as PDF";
        printButton.classList.add("print-button");
        printButton.style.display = "none"; // Döljer knappen från början

        // Länk till den specifika PDF-filen för varje checklista
        printButton.onclick = () => {
          const pdfUrl = `../pdfs/${checklist.title}.pdf`; // Antag att varje PDF är namngiven efter checklistans titel
          window.open(pdfUrl, "_blank"); // Öppnar PDF:en i en ny flik
        };

        checklistDiv.appendChild(printButton);

        checklist.items.forEach((item) => {
          const listItem = document.createElement("li");
          listItem.textContent = item;
          content.appendChild(listItem);
        });

        checklistDiv.appendChild(content);

        // Lägg till checklistan i container
        contentArea.appendChild(checklistDiv);
      });
    })
    .catch((error) => {
      console.error("Fel vid hämtning av checklists.json:", error);
    });
};
