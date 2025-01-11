export const statementOfFact = (contentArea) => {
  const sof = JSON.parse(localStorage.getItem("SoF"));
  console.log(sof);
  const activities = JSON.parse(localStorage.getItem("activities")) || [];

  if (sof) {
    contentArea.innerHTML = `
      <h1>Statement of Fact</h1>
      
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
    <td><textarea class="editable" data-index="anchored"></textarea></td>
    <td><button class="saveBtn" data-index="anchored">Save</button><button class="editBtn" data-index="anchored" style="display:none;">Edit</button></td>
  </tr>
  <tr>
    <td>Anchor aweigh</td>
    <td><input type="date" class="editable" data-index="anchor-aweigh" /></td>
    <td><input type="time" class="editable" data-index="anchor-aweigh" /></td>
    <td><textarea class="editable" data-index="anchor-aweigh"></textarea></td>
    <td><button class="saveBtn" data-index="anchor-aweigh">Save</button><button class="editBtn" data-index="anchor-aweigh" style="display:none;">Edit</button></td>
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

        // Hämta värden från input- och textarea-fälten i kolumner 2, 3 och 4
        const date = row.querySelector("td:nth-child(2) input").value; // Andra kolumnen (date input)
        const time = row.querySelector("td:nth-child(3) input").value; // Tredje kolumnen (time input)
        const remarks = row.querySelector("td:nth-child(4) textarea").value; // Fjärde kolumnen (textarea)

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
};
