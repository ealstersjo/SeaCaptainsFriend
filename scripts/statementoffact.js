export const statementOfFact = (contentArea) => {
  const currentVoyage = localStorage.getItem("currentVoyage");
  if (currentVoyage) {
    const voyageData = JSON.parse(currentVoyage);
    contentArea.innerHTML = `
      <h1>Statement of Fact</h1>
      <table>
        <tr>
          <th>Vessel</th>
          <td>${voyageData.vessel}</td>
          <th>Date</th>
          <td>${voyageData.date}</td>
          <th>PNI #</th>
          <td>${voyageData.pniNumber}</td>
        </tr>
      </table>
    `;
  } else {
    contentArea.innerHTML = `
      <h1>Statement of Fact</h1>
      <p>No current voyage available to display Statement of Fact.</p>
    `;
  }
};
