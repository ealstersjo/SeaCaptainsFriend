export const statementOfFact = (contentArea) => {
  const voyages = JSON.parse(localStorage.getItem("currentVoyage")) || [];

  let selectedVoyageIndex = localStorage.getItem("selectedVoyageIndex");

  // Skapa voyageSelect varje gång baserat på selectedVoyageIndex
  const generateVoyageSelect = () => {
    return `
    <select id="voyageSelect">
      <option value="" selected disabled>Select trip</option>
      ${voyages
        .map(
          (voyage, index) => `
        <option value="${index}" ${
            index == selectedVoyageIndex ? "selected" : ""
          }>${voyage.vessel} från ${voyage.from} till ${voyage.to}</option>
      `
        )
        .join("")}
    </select>
  `;
  };

  let selectedVoyage;

  if (selectedVoyageIndex) {
    selectedVoyage = voyages[selectedVoyageIndex];
  }
  console.log(selectedVoyage);

  const renderSoFForm = () => {
    contentArea.innerHTML = `
      <h1>Statement of Fact</h1>
      <small>This data is temporary and will be fetched from elsewhere</small>
            <div class="select-container">
      ${generateVoyageSelect()}
      </div>
      <div class="sof-info-container">
        <table class="sof-info-table">
          <tr>
            <td class="sof-info-label">Vessel</td>
            <td>${selectedVoyage.vessel}</td>
            <td class="sof-info-label">Date</td>
            <td>${selectedVoyage.date}</td>
          </tr>
          <tr>
            <td class="sof-info-label">Jetty</td>
            <td>${selectedVoyage.jetty}</td>
            <td class="sof-info-label">Voyage</td>
            <td>${selectedVoyage.voyNo}</td>
          </tr>
          <tr>
            <td class="sof-info-label">Load Port</td>
            <td>${selectedVoyage.port}</td>
            <td class="sof-info-label">Customer Number</td>
            <td>0</td>
          </tr>
        </table>
      </div>

      <!-- Fixed Activities (Examples) -->
      <table class="activity-log-table">
        <thead>
          <tr>
            <th class="activity-log-header">Activity</th>
            <th class="activity-log-header">Date</th>
            <th class="activity-log-header">Time</th>
            <th class="activity-log-header">Remarks</th>
            <th class="activity-log-header">Actions</th>
          </tr>
        </thead>
        <tbody class="activity-log-body">
        <tr>
    <td>EOSP</td>
    <td><input type="date" class="editable" data-index="eosp" /></td>
    <td><input type="time" class="editable" data-index="eosp" /></td>
    <td><textarea class="editable" data-index="eosp"></textarea></td>
    <td><button class="saveBtn" data-index="eosp">Save</button><button class="editBtn" data-index="eosp" style="display:none;">Edit</button></td>
</tr>
<tr>
    <td>NOR Tendered</td>
    <td><input type="date" class="editable" data-index="nor-tendered" /></td>
    <td><input type="time" class="editable" data-index="nor-tendered" /></td>
    <td><textarea class="editable" data-index="nor-tendered" placeholder="Reason for delay:"></textarea></td>
    <td><button class="saveBtn" data-index="nor-tendered">Save</button><button class="editBtn" data-index="nor-tendered" style="display:none;">Edit</button></td>
</tr>
  <tr>
    <td>Free Pratique</td>
    <td><input type="date" class="editable" data-index="free-pratique" /></td>
    <td><input type="time" class="editable" data-index="free-pratique" /></td>
    <td><textarea class="editable" data-index="free-pratique"></textarea></td>
    <td><button class="saveBtn" data-index="free-pratique">Save</button><button class="editBtn" data-index="free-pratique" style="display:none;">Edit</button></td>
  </tr>
  <tr>
    <td>Pilot onboard</td>
    <td><input type="date" class="editable" data-index="pilot-onboard" /></td>
    <td><input type="time" class="editable" data-index="pilot-onboard" /></td>
    <td><textarea class="editable" data-index="pilot-onboard"></textarea></td>
    <td><button class="saveBtn" data-index="pilot-onboard">Save</button><button class="editBtn" data-index="pilot-onboard" style="display:none;">Edit</button></td>
  </tr>
  <tr>
    <td>Anchored</td>
    <td><input type="date" class="editable" data-index="anchored" /></td>
    <td><input type="time" class="editable" data-index="anchored" /></td>
    <td><textarea class="editable" data-index="anchored" placeholder="Reason for delay:"></textarea></td>
    <td><button class="saveBtn" data-index="anchored">Save</button><button class="editBtn" data-index="anchored" style="display:none;">Edit</button></td>
  </tr>
  <tr>
    <td>Anchor aweigh</td>
    <td><input type="date" class="editable" data-index="anchor-aweigh" /></td>
    <td><input type="time" class="editable" data-index="anchor-aweigh" /></td>
    <td><textarea class="editable" data-index="anchor-aweigh"></textarea></td>
    <td><button class="saveBtn" data-index="anchor-aweigh">Save</button><button class="editBtn" data-index="anchor-aweigh" style="display:none;">Edit</button></td>
  </tr>
  <tr>
    <td>(2nd Pilot Onboard)</td>
    <td><input type="date" class="editable" data-index="second-pilot-onboard" /></td>
    <td><input type="time" class="editable" data-index="second-pilot-onboard" /></td>
    <td><textarea class="editable" data-index="second-pilot-onboard"></textarea></td>
    <td><button class="saveBtn" data-index="second-pilot-onboard">Save</button><button class="editBtn" data-index="second-pilot-onboard" style="display:none;">Edit</button></td>
</tr>
<tr>
    <td>Changed Pilot I</td>
    <td><input type="date" class="editable" data-index="changed-pilot-i" /></td>
    <td><input type="time" class="editable" data-index="changed-pilot-i" /></td>
    <td><textarea class="editable" data-index="changed-pilot-i"></textarea></td>
    <td><button class="saveBtn" data-index="changed-pilot-i">Save</button><button class="editBtn" data-index="changed-pilot-i" style="display:none;">Edit</button></td>
</tr>
<tr>
    <td>Changed Pilot II</td>
    <td><input type="date" class="editable" data-index="changed-pilot-ii" /></td>
    <td><input type="time" class="editable" data-index="changed-pilot-ii" /></td>
    <td><textarea class="editable" data-index="changed-pilot-ii"></textarea></td>
    <td><button class="saveBtn" data-index="changed-pilot-ii">Save</button><button class="editBtn" data-index="changed-pilot-ii" style="display:none;">Edit</button></td>
</tr>
<tr>
    <td>Lock, In - Out</td>
    <td><input type="date" class="editable" data-index="lock-in-out" /></td>
    <td><input type="time" class="editable" data-index="lock-in-out" /></td>
    <td><textarea class="editable" data-index="lock-in-out"></textarea></td>
    <td><button class="saveBtn" data-index="lock-in-out">Save</button><button class="editBtn" data-index="lock-in-out" style="display:none;">Edit</button></td>
</tr>
<tr>
    <td>First Line Ashore</td>
    <td><input type="date" class="editable" data-index="first-line-ashore" /></td>
    <td><input type="time" class="editable" data-index="first-line-ashore" /></td>
    <td>
        <div>
            <label>Fwd Draft: (m)</label>
            <input type="number" step="0.01" class="draft-input" data-type="fwd" data-index="first-line-ashore" placeholder="(m)" />
            <label>Aft Draft: (m)</label>
            <input type="number" step="0.01" class="draft-input" data-type="aft" data-index="first-line-ashore" placeholder="(m)" />
        </div>
    </td>    
    <td><button class="saveBtn" data-index="first-line-ashore">Save</button><button class="editBtn" data-index="first-line-ashore" style="display:none;">Edit</button></td>
</tr>
<tr>
    <td>All Fast</td>
    <td><input type="date" class="editable" data-index="all-fast" /></td>
    <td><input type="time" class="editable" data-index="all-fast" /></td>
    <td>
        <div>
            <label>LNG: (mt)</label>
            <input type="number" step="0.1" class="draft-input" data-type="lng" data-index="all-fast" placeholder="(mt)" />
            <label>GO: (mt)</label>
            <input type="number" step="0.1" class="draft-input" data-type="go" data-index="all-fast" placeholder="(tm)" />
        </div>
    </td>
    <td><button class="saveBtn" data-index="all-fast">Save</button><button class="editBtn" data-index="all-fast" style="display:none;">Edit</button></td>
</tr>
<tr>
    <td>NOR Received</td>
    <td><input type="date" class="editable" data-index="nor-received" /></td>
    <td><input type="time" class="editable" data-index="nor-received" /></td>
    <td><textarea class="editable" data-index="nor-received"  placeholder="Reason for delay:"></textarea></td>
    <td><button class="saveBtn" data-index="nor-received">Save</button><button class="editBtn" data-index="nor-received" style="display:none;">Edit</button></td>
</tr>
<tr>
    <td>Tank Inspection</td>
    <td><input type="date" class="editable" data-index="tank-inspection" /></td>
    <td><input type="time" class="editable" data-index="tank-inspection" /></td>
    <td><textarea class="editable" data-index="tank-inspection"></textarea></td>
    <td><button class="saveBtn" data-index="tank-inspection">Save</button><button class="editBtn" data-index="tank-inspection" style="display:none;">Edit</button></td>
</tr>
<tr>
    <td>Key Meeting Done</td>
    <td><input type="date" class="editable" data-index="key-meeting-done" /></td>
    <td><input type="time" class="editable" data-index="key-meeting-done" /></td>
    <td><textarea class="editable" data-index="key-meeting-done" placeholder="Number & size(s):"></textarea></td>
    <td><button class="saveBtn" data-index="key-meeting-done">Save</button><button class="editBtn" data-index="key-meeting-done" style="display:none;">Edit</button></td>
</tr>
<tr>
    <td>Connected</td>
    <td><input type="date" class="editable" data-index="connected" /></td>
    <td><input type="time" class="editable" data-index="connected" /></td>
    <td><textarea class="editable" data-index="connected"></textarea></td>
    <td><button class="saveBtn" data-index="connected">Save</button><button class="editBtn" data-index="connected" style="display:none;">Edit</button></td>
</tr>
<tr>
    <td>Commenced Load</td>
    <td><input type="date" class="editable" data-index="commenced-load" /></td>
    <td><input type="time" class="editable" data-index="commenced-load" /></td>
    <td><textarea class="editable" data-index="commenced-load"></textarea></td>
    <td><button class="saveBtn" data-index="commenced-load">Save</button><button class="editBtn" data-index="commenced-load" style="display:none;">Edit</button></td>
</tr>
<tr>
    <td>Completed Load</td>
    <td><input type="date" class="editable" data-index="completed-load" /></td>
    <td><input type="time" class="editable" data-index="completed-load" /></td>
    <td><input type="number" step="0.01" class="editable" data-index="completed-load" placeholder="Ship fig.:"/></td>
    <td>
        <button class="saveBtn" data-index="completed-load">Save</button>
        <button class="editBtn" data-index="completed-load" style="display:none;">Edit</button>
    </td>
</tr>

<tr>
    <td>Ullage / Sampling</td>
    <td><input type="date" class="editable" data-index="ullage-sampling" /></td>
    <td><input type="time" class="editable" data-index="ullage-sampling" /></td>
    <td><input type="number" step="0.01" class="editable" data-index="ullage-sampling" placeholder="B/L fig:"/></td>
    <td>
        <button class="saveBtn" data-index="ullage-sampling">Save</button>
        <button class="editBtn" data-index="ullage-sampling" style="display:none;">Edit</button>
    </td>
</tr>
<tr>
    <td>Calculations Done</td>
    <td><input type="date" class="editable" data-index="calculations-done" disabled /></td>
    <td><input type="time" class="editable" data-index="calculations-done" disabled /></td>
    <td><textarea class="editable" data-index="calculations-done" disabled></textarea></td>
    <td>
        <button class="saveBtn" data-index="calculations-done">Calculate</button>
        <button class="editBtn" data-index="calculations-done" style="display:none;">Edit</button>
    </td>
</tr>
<tr>
    <td>Disconnected</td>
    <td><input type="date" class="editable" data-index="disconnected" /></td>
    <td><input type="time" class="editable" data-index="disconnected" /></td>
    <td><textarea class="editable" data-index="disconnected" placeholder="Reason for delay:"></textarea></td>
    <td>
        <button class="saveBtn" data-index="disconnected">Save</button>
        <button class="editBtn" data-index="disconnected" style="display:none;">Edit</button>
    </td>
</tr>
<tr>
    <td>Documents Onboard</td>
    <td><input type="date" class="editable" data-index="documents-onboard" /></td>
    <td><input type="time" class="editable" data-index="documents-onboard" /></td>
    <td><textarea class="editable" data-index="documents-onboard"></textarea></td>
    <td>
        <button class="saveBtn" data-index="documents-onboard">Save</button>
        <button class="editBtn" data-index="documents-onboard" style="display:none;">Edit</button>
    </td>
</tr>
<tr>
    <td>Documents Signed</td>
    <td><input type="date" class="editable" data-index="documents-signed" /></td>
    <td><input type="time" class="editable" data-index="documents-signed" /></td>
    <td><textarea class="editable" data-index="documents-signed" placeholder="Reason for delay:"></textarea></td>
    <td>
        <button class="saveBtn" data-index="documents-signed">Save</button>
        <button class="editBtn" data-index="documents-signed" style="display:none;">Edit</button>
    </td>
</tr>
<tr>
    <td>Pilot Onboard</td>
    <td><input type="date" class="editable" data-index="pilot-onboard" /></td>
    <td><input type="time" class="editable" data-index="pilot-onboard" /></td>
    <td><textarea class="editable" data-index="pilot-onboard"></textarea></td>
    <td>
        <button class="saveBtn" data-index="pilot-onboard">Save</button>
        <button class="editBtn" data-index="pilot-onboard" style="display:none;">Edit</button>
    </td>
</tr>
<tr>
    <td>Departure</td>
    <td><input type="date" class="editable" data-index="departure" /></td>
    <td><input type="time" class="editable" data-index="departure" /></td>
    <td><textarea class="editable" data-index="departure"></textarea></td>
    <td>
        <button class="saveBtn" data-index="departure">Save</button>
        <button class="editBtn" data-index="departure" style="display:none;">Edit</button>
    </td>
</tr>
<tr>
    <td>Changed Pilot</td>
    <td><input type="date" class="editable" data-index="changed-pilot" /></td>
    <td><input type="time" class="editable" data-index="changed-pilot" /></td>
    <td>
        <div>
            <label>LNG: (mt)</label>
            <input type="number" step="0.1" class="draft-input" data-type="lng" data-index="changed-pilot" placeholder="(mt)" />
            <label>GO: (mt)</label>
            <input type="number" step="0.1" class="draft-input" data-type="go" data-index="changed-pilot" placeholder="(tm)" />
        </div>
    </td>
    <td>
        <button class="saveBtn" data-index="changed-pilot">Save</button>
        <button class="editBtn" data-index="changed-pilot" style="display:none;">Edit</button>
    </td>
</tr>
<tr>
    <td>Pilot Disembarked</td>
    <td><input type="date" class="editable" data-index="pilot-disembarked" /></td>
    <td><input type="time" class="editable" data-index="pilot-disembarked" /></td>
<td>
        <div>
            <label>Fwd Draft: (m)</label>
            <input type="number" step="0.01" class="draft-input" data-type="fwd" data-index="pilot-disembarked" placeholder="(m)" />
            <label>Aft Draft: (m)</label>
            <input type="number" step="0.01" class="draft-input" data-type="aft" data-index="pilot-disembarked" placeholder="(m)" />
        </div>
    </td>
    <td>
        <button class="saveBtn" data-index="pilot-disembarked">Save</button>
        <button class="editBtn" data-index="pilot-disembarked" style="display:none;">Edit</button>
    </td>
</tr>
<tr>
    <td>S.O.S.P</td>
    <td><input type="date" class="editable" data-index="sosp" /></td>
    <td><input type="time" class="editable" data-index="sosp" /></td>
    <td><textarea class="editable" data-index="sosp"></textarea></td>
    <td>
        <button class="saveBtn" data-index="sosp">Save</button>
        <button class="editBtn" data-index="sosp" style="display:none;">Edit</button>
    </td>
</tr>
<tr>
    <td colspan="4">
        <label for="remarks">Remarks:</label>
        <textarea id="remarks" class="editable" data-index="sof-remarks" rows="4" style="width: 100%;"></textarea>
    </td>
    <td>
        <button class="saveBtn" data-index="pilot-disembarked">Save</button>
        <button class="editBtn" data-index="pilot-disembarked" style="display:none;">Edit</button>
    </td>
</tr>

      <button id="printSoF" type="button">Print SoF</button>

</tbody>

      </table>


      <button id="deleteVoyageButton" type="deleteButton">Delete SoF</button>
    `;
    initializeActivities();

    // Bind event listener till VoyageSelect varje gång efter rendering
    const voyageSelectElement = document.getElementById("voyageSelect");
    if (voyageSelectElement) {
      voyageSelectElement.addEventListener("change", function () {
        selectedVoyageIndex = this.value; // Uppdatera index när användaren väljer en resa
        selectedVoyage = voyages[selectedVoyageIndex]; // Hämta den valda resan baserat på index

        if (selectedVoyage) {
          // Spara det valda indexet i localStorage
          localStorage.setItem("selectedVoyageIndex", selectedVoyageIndex);

          renderSoFForm(); // Rendera om formuläret med den nya valda resan
        }
      });
    }

    const calculateVolumeDifference = () => {
      // Hämta sparade data från SoF (om de finns)
      const sofData = selectedVoyage.sof;
      //console.log(sofData);
      // Kontrollera om värden finns sparade i SoF-data
      const completedLoadValue =
        sofData["completed-load"] && sofData["completed-load"].remarks.shipLoad
          ? parseFloat(sofData["completed-load"].remarks.shipLoad)
          : parseFloat(
              document.querySelector(
                'input[data-index="completed-load"][type="number"]'
              ).value
            );

      const ullageSamplingValue =
        sofData["ullage-sampling"] && sofData["ullage-sampling"].remarks.ullage
          ? parseFloat(sofData["ullage-sampling"].remarks.ullage)
          : parseFloat(
              document.querySelector(
                'input[data-index="ullage-sampling"][type="number"]'
              ).value
            );

      // Kontrollera att båda värdena är giltiga
      if (!isNaN(completedLoadValue) && !isNaN(ullageSamplingValue)) {
        const difference = completedLoadValue - ullageSamplingValue;

        // Välj ett basvärde att relatera till för procentuell skillnad
        const baseValue = completedLoadValue !== 0 ? completedLoadValue : 1; // Undvik division med 0

        // Beräkna procentuell skillnad
        let percentage = (difference / baseValue) * 100;

        // Runda av till lämplig precision
        percentage = Math.round(percentage * 100) / 100; // Till två decimaler

        // Fyll i värden i "Calculations Done"
        const calculationsDate = document.querySelector(
          'input[data-index="calculations-done"][type="date"]'
        );
        const calculationsTime = document.querySelector(
          'input[data-index="calculations-done"][type="time"]'
        );
        const calculationsRemarks = document.querySelector(
          'textarea[data-index="calculations-done"]'
        );

        // Sätt dagens datum och tid för "Calculations Done"
        const now = new Date();
        const currentDate = now.toISOString().split("T")[0];
        const currentTime = now.toTimeString().split(" ")[0].slice(0, 5);

        calculationsDate.value = currentDate;
        calculationsTime.value = currentTime;
        calculationsRemarks.value = `Difference: ${difference.toFixed(
          2
        )}mt = ${percentage.toFixed(2)}%`;

        return {
          percentage: percentage,
          difference: difference,
        };
      } else {
        /*  alert(
          "Both 'Completed Load' and 'Ullage/Sampling' must have valid numeric values."
        ); */
      }
    };

    // Lägg till event listeners på nummerfält för completed-load och ullage-sampling
    ["completed-load", "ullage-sampling"].forEach((index) => {
      document
        .querySelectorAll(`input[data-index="${index}"]`)
        .forEach((input) => {
          input.addEventListener("input", calculateVolumeDifference);
        });
    });

    // Event listeners for Save/Edit
    const saveButtons = document.querySelectorAll(".saveBtn");
    saveButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        const row = event.target.closest("tr");

        // Disable inputs after Save
        row.querySelectorAll(".editable").forEach((input) => {
          input.disabled = true;
        });

        const key = row
          .querySelector("td:nth-child(2) input")
          .getAttribute("data-index"); // Andra kolumnen (date input)
        // Hämta värden från input- och textarea-fälten i kolumner 2, 3 och 4
        const date = row.querySelector("td:nth-child(2) input").value; // Andra kolumnen (date input)
        const time = row.querySelector("td:nth-child(3) input").value; // Tredje kolumnen (time input)
        let remarks = {};
        if (key === "first-line-ashore") {
          // Hämta värden från Fwd och Aft Draft-fälten
          const fwdDraft = row.querySelector('input[data-type="fwd"]').value;
          const aftDraft = row.querySelector('input[data-type="aft"]').value;

          // Bygg remarks-objektet
          remarks = {
            fwdDraft: fwdDraft || null,
            aftDraft: aftDraft || null,
          };
        } else if (key === "all-fast") {
          const lng = row.querySelector('input[data-type="lng"]').value;
          const go = row.querySelector('input[data-type="go"]').value;

          // Bygg remarks-objektet
          remarks = {
            lng: lng || null,
            go: go || null,
          };
        } else if (key === "changed-pilot") {
          const lng = row.querySelector('input[data-type="lng"]').value;
          const go = row.querySelector('input[data-type="go"]').value;

          // Bygg remarks-objektet
          remarks = {
            lng: lng || null,
            go: go || null,
          };
        } else if (key === "pilot-disembarked") {
          // Hämta värden från Fwd och Aft Draft-fälten
          const fwdDraft = row.querySelector('input[data-type="fwd"]').value;
          const aftDraft = row.querySelector('input[data-type="aft"]').value;

          // Bygg remarks-objektet
          remarks = {
            fwdDraft: fwdDraft || null,
            aftDraft: aftDraft || null,
          };
        } else if (key === "completed-load") {
          const shipLoad = row.querySelector("td:nth-child(4) input").value;

          // Bygg remarks-objektet
          remarks = {
            shipLoad: shipLoad || null,
          };
        } else if (key === "ullage-sampling") {
          const blValue = row.querySelector("td:nth-child(4) input").value;

          // Bygg remarks-objektet
          remarks = {
            ullage: blValue || null,
          };
        } else if (key === "calculations-done") {
          const blValue = calculateVolumeDifference();
          console.log(blValue);
          // Bygg remarks-objektet
          remarks = {
            calculations: blValue || null,
          };
        } else {
          const generalRemarks = row.querySelector(
            "td:nth-child(4) textarea"
          ).value;

          // Bygg remarks-objektet
          remarks = {
            general: generalRemarks || null,
          };
        }

        // Kontrollera om selectedVoyage har en sof och om inte, skapa den
        if (selectedVoyage) {
          if (!selectedVoyage.sof) {
            selectedVoyage.sof = {}; // Skapa ett tomt objekt för sof om det inte finns
          }

          // Uppdatera selectedVoyage.sof med den nya informationen
          selectedVoyage.sof[key] = {
            date: date || null,
            time: time || null,
            remarks: remarks, // Spara hela remarks-objektet
          };

          // Hitta indexet för den valda resan i currentVoyage
          const voyageIndex = voyages.findIndex(
            (voyage) => voyage === selectedVoyage
          );

          // Uppdatera currentVoyage med den uppdaterade selectedVoyage
          if (voyageIndex !== -1) {
            voyages[voyageIndex] = selectedVoyage;
            // Spara hela currentVoyage i localStorage
            localStorage.setItem("currentVoyage", JSON.stringify(voyages));
          }
        } else {
          console.error("selectedVoyage är inte definierad");
        }

        event.target.style.display = "none";
        const editButton = row.querySelector(".editBtn");
        editButton.style.display = "inline-block";
      });
    });

    const editButtons = document.querySelectorAll(".editBtn");
    editButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        const row = event.target.closest("tr");

        // Enable inputs for editing
        row.querySelectorAll(".editable").forEach((input) => {
          input.disabled = false;
        });
        // Hantera fall där det finns två inputfält i en specifik kolumn
        const draftInputs = row.querySelectorAll(
          'td:nth-child(4) input[type="number"]'
        );
        if (draftInputs.length === 2) {
          draftInputs.forEach((input) => {
            input.disabled = true; // Lås varje inputfält
          });
        }

        // Switch to Save mode
        event.target.style.display = "none";
        const saveButton = row.querySelector(".saveBtn");
        saveButton.style.display = "inline-block";
      });
    });

    const printSoFButton = document.getElementById("printSoF");
    printSoFButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to print the SoF?")) {
        alert("SoF has been printed!");
        //statementOfFact(contentArea); // Reload the content
      }
    });

    // Delete SoF button functionality
    const deleteVoyageButton = document.getElementById("deleteVoyageButton");
    deleteVoyageButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete the SoF?")) {
        localStorage.removeItem("SoF");
        alert("SoF has been deleted!");
        statementOfFact(contentArea); // Reload the content
      }
    });
  };

  const initializeActivities = () => {
    // Hämta SoF-objektet från localStorage
    const voyages = JSON.parse(localStorage.getItem("currentVoyage"));
    //console.log("current: " + JSON.stringify(voyages));
    //console.log("Choosen: " + JSON.stringify(voyages[selectedVoyageIndex]));
    let sofData = voyages[selectedVoyageIndex].sof;
    if (sofData) {
      // Gå igenom varje rad i tabellen
      document.querySelectorAll(".activity-log-body tr").forEach((row) => {
        // Hämta data-index från valfri input i raden
        const dataIndex = row
          .querySelector("input, textarea")
          .getAttribute("data-index");

        // Om det finns data för denna aktivitet i SoF
        if (sofData[dataIndex]) {
          const { date, time, remarks } = sofData[dataIndex];

          // Fyll i input-fälten med data
          const dateInput = row.querySelector(
            'td:nth-child(2) input[type="date"]'
          );
          const timeInput = row.querySelector(
            'td:nth-child(3) input[type="time"]'
          );
          const remarksInput = row.querySelector("td:nth-child(4) textarea");

          if (dateInput && date) dateInput.value = date;
          if (timeInput && time) timeInput.value = time;
          if (dataIndex === "first-line-ashore") {
            // För "First Line Ashore" dela upp remarks i två inputfält
            const draftInputs = row.querySelectorAll(
              'td:nth-child(4) input[type="number"]'
            );
            if (draftInputs.length === 2 && remarks) {
              draftInputs[0].value = remarks.fwdDraft || "";
              draftInputs[1].value = remarks.aftDraft || "";
            }
          } else if (dataIndex === "all-fast") {
            // För "First Line Ashore" dela upp remarks i två inputfält
            const draftInputs = row.querySelectorAll(
              'td:nth-child(4) input[type="number"]'
            );
            if (draftInputs.length === 2 && remarks) {
              draftInputs[0].value = remarks.lng || "";
              draftInputs[1].value = remarks.go || "";
            }
          } else if (dataIndex === "changed-pilot") {
            // För "First Line Ashore" dela upp remarks i två inputfält
            const draftInputs = row.querySelectorAll(
              'td:nth-child(4) input[type="number"]'
            );
            if (draftInputs.length === 2 && remarks) {
              draftInputs[0].value = remarks.lng || "";
              draftInputs[1].value = remarks.go || "";
            }
          } else if (dataIndex === "pilot-disembarked") {
            // För "First Line Ashore" dela upp remarks i två inputfält
            const draftInputs = row.querySelectorAll(
              'td:nth-child(4) input[type="number"]'
            );
            if (draftInputs.length === 2 && remarks) {
              draftInputs[0].value = remarks.fwdDraft || "";
              draftInputs[1].value = remarks.aftDraft || "";
            }
          } else if (dataIndex === "completed-load") {
            // För fält med ett enda nummerfält
            const numberInput = row.querySelector(
              'td:nth-child(4) input[type="number"]'
            );
            if (numberInput && remarks) {
              const value = remarks.shipLoad;
              if (!isNaN(value)) numberInput.value = value;
            }
          } else if (dataIndex === "ullage-sampling") {
            // För fält med ett enda nummerfält
            const numberInput = row.querySelector(
              'td:nth-child(4) input[type="number"]'
            );
            if (numberInput && remarks) {
              const value = remarks.ullage;
              if (!isNaN(value)) numberInput.value = value;
            }
          } else if (dataIndex === "calculations-done") {
            console.log("Fortsätt med calculations init");
            // För fält med ett enda nummerfält
            const remarkValue = `Differnce: ${remarks.calculations.difference} = ${remarks.calculations.percentage}%`;
            const remarksInput = row.querySelector("td:nth-child(4) textarea");
            if (remarksInput && remarkValue) {
              remarksInput.value = remarkValue;
            }
          } else {
            // Standardhantering för textarea
            const remarksInput = row.querySelector("td:nth-child(4) textarea");
            if (remarksInput && remarks) {
              remarksInput.value = remarks;
            }
          }
          // Lås alla inputfält
          row.querySelectorAll(".editable").forEach((input) => {
            input.disabled = true;
          });

          // Hantera fall där det finns två inputfält i en specifik kolumn
          const draftInputs = row.querySelectorAll(
            'td:nth-child(4) input[type="number"]'
          );
          if (draftInputs.length === 2) {
            draftInputs.forEach((input) => {
              input.disabled = true; // Lås varje inputfält
            });
          }
          // Visa Edit-knappen och dölj Save-knappen
          const saveButton = row.querySelector(".saveBtn");
          const editButton = row.querySelector(".editBtn");

          if (saveButton) saveButton.style.display = "none";
          if (editButton) editButton.style.display = "inline-block";
        }
      });
    }
  };

  if (selectedVoyage) {
    renderSoFForm();
  } else {
    contentArea.innerHTML = `
      <h1>Statement of Fact</h1>
      <div class="select-container">
      ${generateVoyageSelect()}
      </div>
    `;
  }

  // Hantera event för att välja rutt
  const voyageSelectElement = document.getElementById("voyageSelect");
  if (voyageSelectElement) {
    voyageSelectElement.addEventListener("change", function () {
      selectedVoyageIndex = this.value; // Uppdatera index när användaren väljer en resa
      selectedVoyage = voyages[selectedVoyageIndex]; // Hämta den valda resan baserat på index

      if (selectedVoyage) {
        localStorage.setItem("selectedVoyageIndex", selectedVoyageIndex);

        renderSoFForm(); // Rendera om formuläret med den nya valda resan
      }
    });
  }

  /*   // Kontrollera om DOM är redo eller kör koden direkt
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeActivities);
  } else {
    initializeActivities();
  }*/
};
