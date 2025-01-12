const tempSoF = {
  vessel: "M/T Fure Viten",
  date: "2025-01-30",
  pni: "2332",
  loadport: "Gothenburg",
  terminal: "Röda Sten",
  customerNumber: "23hej23",
  documentsCreated: true,
};

export const statementOfFact = (contentArea) => {
  let sof = JSON.parse(localStorage.getItem("SoF"));
  console.log(JSON.stringify(sof));
  const activities = JSON.parse(localStorage.getItem("activities")) || [];

  //Temporär data under testfasen
  if (!sof) {
    sof = tempSoF;
  }

  if (sof) {
    contentArea.innerHTML = `
      <h1>Statement of Fact</h1>
      <small>This data is temporary and will be fetched from elsewhere</small>
      <div class="sof-info-container">
        <table class="sof-info-table">
          <tr>
            <td class="sof-info-label">Vessel</td>
            <td>${sof.vessel}</td>
            <td class="sof-info-label">Date</td>
            <td>${sof.date}</td>
          </tr>
          <tr>
            <td class="sof-info-label">Terminal</td>
            <td>${sof.terminal}</td>
            <td class="sof-info-label">PNI</td>
            <td>${sof.pni}</td>
          </tr>
          <tr>
            <td class="sof-info-label">Load Port</td>
            <td>${sof.loadport}</td>
            <td class="sof-info-label">Customer Number</td>
            <td>${sof.customerNumber}</td>
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
            <input type="number" step="0.1" class="draft-input" data-type="fwd" data-index="first-line-ashore" placeholder="(m)" />
            <label>Aft Draft: (m)</label>
            <input type="number" step="0.1" class="draft-input" data-type="aft" data-index="first-line-ashore" placeholder="(m)" />
        </div>
    </td>    <td><button class="saveBtn" data-index="first-line-ashore">Save</button><button class="editBtn" data-index="first-line-ashore" style="display:none;">Edit</button></td>
</tr>
<tr>
    <td>All Fast</td>
    <td><input type="date" class="editable" data-index="all-fast" /></td>
    <td><input type="time" class="editable" data-index="all-fast" /></td>
    <td><textarea class="editable" data-index="all-fast"></textarea></td>
    <td><button class="saveBtn" data-index="all-fast">Save</button><button class="editBtn" data-index="all-fast" style="display:none;">Edit</button></td>
</tr>
<tr>
    <td>NOR Received</td>
    <td><input type="date" class="editable" data-index="nor-received" /></td>
    <td><input type="time" class="editable" data-index="nor-received" /></td>
    <td><textarea class="editable" data-index="nor-received"></textarea></td>
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
    <td><textarea class="editable" data-index="key-meeting-done"></textarea></td>
    <td><button class="saveBtn" data-index="key-meeting-done">Save</button><button class="editBtn" data-index="key-meeting-done" style="display:none;">Edit</button></td>
</tr>
<tr>
    <td>Connected</td>
    <td><input type="date" class="editable" data-index="connected" /></td>
    <td><input type="time" class="editable" data-index="connected" /></td>
    <td><textarea class="editable" data-index="connected"></textarea></td>
    <td><button class="saveBtn" data-index="connected">Save</button><button class="editBtn" data-index="connected" style="display:none;">Edit</button></td>
</tr>

</tbody>

      </table>

      <button id="deleteVoyageButton" type="deleteButton">Delete SoF</button>
    `;

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
        console.log(key);
        // Hämta värden från input- och textarea-fälten i kolumner 2, 3 och 4
        const date = row.querySelector("td:nth-child(2) input").value; // Andra kolumnen (date input)
        const time = row.querySelector("td:nth-child(3) input").value; // Tredje kolumnen (time input)
        let remarks = "";
        if (key === "first-line-ashore") {
          console.log("HEJ");
          // Hämta värden från Fwd och Aft Draft-fälten
          const fwdDraft = row.querySelector('input[data-type="fwd"]').value;
          const aftDraft = row.querySelector('input[data-type="aft"]').value;

          // Bygg remarks-strängen

          remarks =
            fwdDraft && aftDraft ? `F = ${fwdDraft}m A = ${aftDraft}m` : "";
        } else {
          remarks = row.querySelector("td:nth-child(4) textarea").value; // Fjärde kolumnen (textarea)
        }

        sof[key] = { date: date, time: time, remarks: remarks };
        //alert(`${key}{date: ${date}, time: ${time}, remarks: ${remarks}}`);
        // Switch to Edit mode after Save
        localStorage.setItem("SoF", JSON.stringify(sof));

        console.log(sof);
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

        // Switch to Save mode
        event.target.style.display = "none";
        const saveButton = row.querySelector(".saveBtn");
        saveButton.style.display = "inline-block";
      });
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
  } else {
    contentArea.innerHTML = `
      <h1>Statement of Fact</h1>
      <p>No current voyage available to display Statement of Fact.</p>
    `;
  }

  const initializeActivities = () => {
    // Hämta SoF-objektet från localStorage
    const sofData = JSON.parse(localStorage.getItem("SoF")) || {};
    console.log("Data från localStorage:", sofData);

    // Gå igenom varje rad i tabellen
    document.querySelectorAll(".activity-log-body tr").forEach((row) => {
      // Hämta data-index från valfri input i raden
      const dataIndex = row
        .querySelector("input, textarea")
        .getAttribute("data-index");

      // Om det finns data för denna aktivitet i SoF
      if (sofData[dataIndex]) {
        const { date, time, remarks } = sofData[dataIndex];
        console.log(`Förifyller för ${dataIndex}:`, { date, time, remarks });

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
        if (remarksInput && remarks) remarksInput.value = remarks;
        // Lås alla inputfält
        row.querySelectorAll(".editable").forEach((input) => {
          input.disabled = true;
        });

        // Visa Edit-knappen och dölj Save-knappen
        const saveButton = row.querySelector(".saveBtn");
        const editButton = row.querySelector(".editBtn");

        if (saveButton) saveButton.style.display = "none";
        if (editButton) editButton.style.display = "inline-block";
      }
    });
  };

  // Kontrollera om DOM är redo eller kör koden direkt
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeActivities);
  } else {
    initializeActivities();
  }
};
