// Data för Statement of Fact
const statementOfFactContent = {
  generalInfo: {
    vessel: "Fure Viten",
    date: "8/17/2024",
    pni: "3525013",
    loadport: false,
    disport: true,
    terminal: "SUNCOR North Dock",
    customer: "24 665 ER 128",
  },
  activityLog: [
    {
      activity: "EOSP",
      date: "16-Aug-24",
      time: "03:40",
      remarks: "Arrival Draft: F: 4.5 m A: 5.7m",
    },
    {
      activity: "FLA",
      date: "16-Aug-24",
      time: "04:20",
      remarks: "Number of tugs in use: 1 (Mandatory)",
    },
    { activity: "All Fast", date: "16-Aug-24", time: "04:50", remarks: "" },
    // Lägg till fler aktiviteter...
  ],
  delays: [
    { type: "Stop", date: "16-Aug-24", time: "07:55", reason: "Line proof" },
    { type: "Start", date: "16-Aug-24", time: "08:15", reason: "" },
    { type: "Stop", date: "16-Aug-24", time: "09:10", reason: "Foot sampling" },
    { type: "Start", date: "16-Aug-24", time: "10:05", reason: "" },
    // Lägg till fler fördröjningar...
  ],
  completionDetails: {
    loadingCompleted: "17-Aug-24 12:30",
    ullagingCompleted: "17-Aug-24 13:30",
    calculationsCompleted: "17-Aug-24 14:30",
    departureDraft: "F: 7,35 m A: 7,35 m",
  },
};

// Funktion för att rendera Statement of Fact
export function renderStatementOfFact() {
  const content = document.querySelector(".content");

  // Rendera General Info
  let html = `
      <h1>Statement of Fact</h1>
      <h2>General Info</h2>
      <p><strong>Vessel:</strong> ${statementOfFactContent.generalInfo.vessel}</p>
      <p><strong>Date:</strong> ${statementOfFactContent.generalInfo.date}</p>
      <p><strong>PNI #:</strong> ${statementOfFactContent.generalInfo.pni}</p>
      <p><strong>Terminal:</strong> ${statementOfFactContent.generalInfo.terminal}</p>
      <p><strong>Customer #:</strong> ${statementOfFactContent.generalInfo.customer}</p>
    `;

  // Rendera Activity Log
  html += `
      <h2>Activity Log</h2>
      <table>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Date</th>
            <th>Time</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
    `;
  statementOfFactContent.activityLog.forEach((log) => {
    html += `
        <tr>
          <td>${log.activity}</td>
          <td>${log.date}</td>
          <td>${log.time}</td>
          <td>${log.remarks}</td>
        </tr>
      `;
  });
  html += `</tbody></table>`;

  // Rendera Delays
  html += `
      <h2>Delays</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Date</th>
            <th>Time</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
    `;
  statementOfFactContent.delays.forEach((delay) => {
    html += `
        <tr>
          <td>${delay.type}</td>
          <td>${delay.date}</td>
          <td>${delay.time}</td>
          <td>${delay.reason}</td>
        </tr>
      `;
  });
  html += `</tbody></table>`;

  // Rendera Completion Details
  html += `
      <h2>Completion Details</h2>
      <p><strong>Loading Completed:</strong> ${statementOfFactContent.completionDetails.loadingCompleted}</p>
      <p><strong>Ullaging Completed:</strong> ${statementOfFactContent.completionDetails.ullagingCompleted}</p>
      <p><strong>Calculations Completed:</strong> ${statementOfFactContent.completionDetails.calculationsCompleted}</p>
      <p><strong>Departure Draft:</strong> ${statementOfFactContent.completionDetails.departureDraft}</p>
    `;

  // Uppdatera innehållet i sidan
  content.innerHTML = html;
}

// Kör funktionen för att rendera datan
document.addEventListener("DOMContentLoaded", () => {
  renderStatementOfFact();
});
