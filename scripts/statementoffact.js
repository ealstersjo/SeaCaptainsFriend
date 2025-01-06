export const statementOfFact = (contentArea) => {
  const sof = JSON.parse(localStorage.getItem("SoF"));
  if (sof) {
    contentArea.innerHTML = `
      <h1>Statement of Fact</h1>
            <pre>${JSON.stringify(sof, null, 2)}</pre>
                  <button id="deleteVoyageButton" type="deleteButton">Delete SoF</button>


    `;
    const deleteVoyageButton = document.getElementById("deleteVoyageButton");

    deleteVoyageButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete the SoF?")) {
        localStorage.removeItem("SoF");
        alert("SoF has been deleted!");
        statementOfFact(contentArea); // Ladda om innehållet
      }
    });
  } else {
    contentArea.innerHTML = `
      <h1>Statement of Fact</h1>
      <p>No current voyage available to display Statement of Fact.</p>
    `;
  }
};
