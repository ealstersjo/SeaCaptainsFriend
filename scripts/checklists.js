const printChecklist = (checklist) => {
  const printWindow = window.open("../pages/printChecklist.html", "_blank");

  // Vänta tills utskriftsmallen är laddad
  printWindow.onload = () => {
    // Hitta elementet i utskriftsmallen där vi ska fylla i data
    const headerSection = printWindow.document.querySelector(".header");
    const contentSection = printWindow.document.querySelector(".content");
    const footer = printWindow.document.querySelector(".footer");

    // Fyll i header-datan
    headerSection.innerHTML = `
      <h1>${checklist.title}</h1>
      <p>Checklist with comments and checks</p>
    `;

    // Skapa en tabell för checklist-items
    const itemsHTML = checklist.items
      .map(
        (item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${item}</td>
            <td></td>
          </tr>
        `
      )
      .join("");

    contentSection.innerHTML = `
      <table class="checklist-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Comments/Check</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>
    `;

    // Lägg till datum i footern
    footer.innerHTML = `Generated on: ${new Date().toLocaleString()}`;

    // När sidan är laddad, kalla på utskriftsdialogen
    printWindow.print();
  };
};

export const checklists = (contentArea) => {
  const checklistsData = localStorage.getItem("checklistsFromServer");

  if (checklistsData) {
    // Om data finns, parsa den
    const checklists = JSON.parse(checklistsData);

    // Rensa befintligt innehåll i checklist-container
    contentArea.innerHTML = "";

    // Lägg till rubrik för checklistor
    const title = document.createElement("h1");
    title.textContent = "Checklists";
    title.classList.add("checklist-title"); // Lägg till stilklass för rubriken
    contentArea.appendChild(title);

    // Skapa en checklista för varje objekt i 'checklists'
    checklists.forEach((checklist) => {
      // Skapa en wrapper för varje checklista
      const checklistDiv = document.createElement("div");
      checklistDiv.classList.add("checklist-card"); // Unik klassnamn för checklistkort

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
        printButton.style.display = isContentVisible ? "none" : "inline-block";
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

      // Lägg till renderChecklist-anropet på print-knappen
      printButton.onclick = () => {
        printChecklist(checklist);
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
  } else {
    console.error("Ingen checklista finns i localStorage.");
    // Du kan lägga till en fallback om det inte finns någon data
    contentArea.innerHTML = "<p>Inga checklistor finns tillgängliga.</p>";
  }
};
