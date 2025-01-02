// Kontrollera om användaren är inloggad
if (localStorage.getItem("loggedIn") !== "true") {
  // Redirecta tillbaka till inloggningssidan om användaren inte är inloggad
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  // Hämta referenser till menylänkarna
  const statementOfFactLink = document.getElementById("statementoffact");
  const hanteraResaLink = document.getElementById("hantera-resa");
  const berakningarLink = document.getElementById("berakningar");

  // Hämta referens till innehållsområdet
  const contentArea = document.querySelector(".content");

  // Funktion för att ladda "Statement of Fact"-innehåll
  const loadStatementOfFact = () => {
    contentArea.innerHTML = `
      <h1>Statement of Fact</h1>
      <table>
        <tr>
          <th>Vessel</th>
          <td>Fure Viten</td>
          <th>Date</th>
          <td>8/17/2024</td>
          <th>PNI #</th>
          <td>3525013</td>
        </tr>
        <tr>
          <th>Loadport</th>
          <td>Sarnia</td>
          <th>Disport</th>
          <td>SUNCOR North Dock</td>
          <th>Terminal</th>
          <td>24 665 ER 128</td>
        </tr>
        <tr>
          <th>Customer #</th>
          <td colspan="3">-</td>
        </tr>
      </table>
      
      <h2>Activity</h2>
      <table>
        <tr>
          <th>Activity</th>
          <th>Date</th>
          <th>Time</th>
          <th>Remarks</th>
        </tr>
        <tr>
          <td>EOSP</td>
          <td>16-Aug-24</td>
          <td>03:40</td>
          <td>Arrival Draft: F: 4.5 m A: 5.7m</td>
        </tr>
        <tr>
          <td>At Anchor</td>
          <td colspan="3"></td>
        </tr>
        <tr>
          <td>Anchor Aweigh</td>
          <td colspan="3"></td>
        </tr>
        <tr>
          <td>FLA</td>
          <td>16-Aug-24</td>
          <td>04:20</td>
          <td>Number of tugs in use: 1 (Mandatory)</td>
        </tr>
        <tr>
          <td>All Fast</td>
          <td>16-Aug-24</td>
          <td>04:50</td>
          <td></td>
        </tr>
        <tr>
          <td>NORT</td>
          <td>16-Aug-24</td>
          <td>04:55</td>
          <td></td>
        </tr>
        <tr>
          <td>Gangway Down</td>
          <td>16-Aug-24</td>
          <td>04:55</td>
          <td></td>
        </tr>
        <tr>
          <td>Commenced Key Safety Meeting</td>
          <td>16-Aug-24</td>
          <td>05:05</td>
          <td></td>
        </tr>
        <tr>
          <td>Tank Inspection Commenced</td>
          <td>16-Aug-24</td>
          <td>05:10</td>
          <td></td>
        </tr>
        <tr>
          <td>End of Key Safety Meeting</td>
          <td>16-Aug-24</td>
          <td>05:30</td>
          <td></td>
        </tr>
        <tr>
          <td>Cargo hose/arm Connected</td>
          <td>16-Aug-24</td>
          <td>05:30</td>
          <td>1x8"</td>
        </tr>
        <tr>
          <td>Tank Inspection Completed</td>
          <td>16-Aug-24</td>
          <td>05:45</td>
          <td></td>
        </tr>
        <tr>
          <td>NORA</td>
          <td>16-Aug-24</td>
          <td>06:45</td>
          <td></td>
        </tr>
        <tr>
          <td>Awaiting Shore or Ship Readiness</td>
          <td colspan="3"></td>
        </tr>
        <tr>
          <td>Commenced Loading</td>
          <td>16-Aug-24</td>
          <td>07:00</td>
          <td>Cargo: CBOB</td>
        </tr>
        <tr>
          <td>Stop</td>
          <td>16-Aug-24</td>
          <td>07:55</td>
          <td>Reason: Line proof</td>
        </tr>
        <tr>
          <td>Start</td>
          <td>16-Aug-24</td>
          <td>08:15</td>
          <td></td>
        </tr>
        <tr>
          <td>Stop</td>
          <td>16-Aug-24</td>
          <td>09:10</td>
          <td>Reason: Foot sampling</td>
        </tr>
        <tr>
          <td>Start</td>
          <td>16-Aug-24</td>
          <td>10:05</td>
          <td></td>
        </tr>
        <tr>
          <td>Completed Loading CBOB</td>
          <td>16-Aug-24</td>
          <td>21:55</td>
          <td></td>
        </tr>
        <tr>
          <td>Commence Draining Cargo Hose</td>
          <td>16-Aug-24</td>
          <td>22:00</td>
          <td></td>
        </tr>
        <tr>
          <td>Completed Draining Cargo Hose</td>
          <td>16-Aug-24</td>
          <td>22:20</td>
          <td></td>
        </tr>
        <tr>
          <td>Cargo hose disconnected</td>
          <td>16-Aug-24</td>
          <td>22:30</td>
          <td></td>
        </tr>
        <tr>
          <td>Cargo hose reconnected</td>
          <td>16-Aug-24</td>
          <td>22:45</td>
          <td></td>
        </tr>
        <tr>
          <td>Commence Loading ULSD</td>
          <td>16-Aug-24</td>
          <td>22:50</td>
          <td></td>
        </tr>
        <tr>
          <td>Stop</td>
          <td>16-Aug-24</td>
          <td>23:20</td>
          <td>Reason: Line proof</td>
        </tr>
        <tr>
          <td>Start</td>
          <td>16-Aug-24</td>
          <td>23:35</td>
          <td></td>
        </tr>
        <tr>
          <td>Stop</td>
          <td>17-Aug-24</td>
          <td>00:25</td>
          <td>Reason: Foot sampling and analysis</td>
        </tr>
        <tr>
          <td>Start</td>
          <td>17-Aug-24</td>
          <td>02:00</td>
          <td></td>
        </tr>
        <tr>
          <td>Sampling CBOB Commenced</td>
          <td>17-Aug-24</td>
          <td>09:00</td>
          <td></td>
        </tr>
        <tr>
          <td>Sampling CBOB Completed</td>
          <td>17-Aug-24</td>
          <td>09:45</td>
          <td></td>
        </tr>
        <tr>
          <td>Completed Loading or Discharging</td>
          <td>17-Aug-24</td>
          <td>12:30</td>
          <td></td>
        </tr>
        <tr>
          <td>Sampling ULSD Commenced</td>
          <td>17-Aug-24</td>
          <td>12:30</td>
          <td></td>
        </tr>
        <tr>
          <td>Cargo Hose Disconnected</td>
          <td>17-Aug-24</td>
          <td>13:20</td>
          <td></td>
        </tr>
        <tr>
          <td>Sampling ULSD Completed</td>
          <td>17-Aug-24</td>
          <td>13:30</td>
          <td></td>
        </tr>
        <tr>
          <td>Ullaging Commenced</td>
          <td>17-Aug-24</td>
          <td>12:30</td>
          <td></td>
        </tr>
        <tr>
          <td>Ullaging Completed</td>
          <td>17-Aug-24</td>
          <td>13:40</td>
          <td></td>
        </tr>
        <tr>
          <td>Completed Operations</td>
          <td>17-Aug-24</td>
          <td>14:00</td>
          <td></td>
        </tr>
      </table>
    `;
  };

  // När användaren klickar på "Statement of Fact" i menyn
  statementOfFactLink.addEventListener("click", loadStatementOfFact);

  // Ladda startinnehåll (t.ex. en välkomstskärm eller annan standard)
  loadStatementOfFact();
});
