export const statementOfFact = (contentArea) => {
  const sof = JSON.parse(localStorage.getItem("SoF"));
  const activities = JSON.parse(localStorage.getItem("activities")) || []; // Hämtar aktiviteter om de finns

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
    <tr>
      
    </tr>
    <tr>
      
    </tr>
  </table>
</div>

      <!-- Activity Log Table -->
<h2>Activity Log</h2>
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
    ${activities
      .map(
        (activity) => `
      <tr>
        <td>${activity.activity}</td>
        <td>${activity.date}</td>
        <td>${activity.time}</td>
        <td>${activity.remarks}</td>
        <td>
          <button class="editBtn">Delete</button>
        </td>
      </tr>
    `
      )
      .join("")}
  </tbody>
</table>


      <!-- Activity Form -->
<h2>Add Activity</h2>
<form id="activityForm">
  <div class="form-row">
    <div class="form-item">
      <label for="activity">Activity:</label>
      <input type="text" id="activity" required />
    </div>

    <div class="form-item">
      <label for="date">Date:</label>
      <input type="date" id="date" required />
    </div>

    <div class="form-item">
      <label for="time">Time:</label>
      <input type="time" id="time" required />
    </div>

    <div class="form-item">
      <label for="remarks">Remarks:</label>
      <textarea id="remarks" required></textarea>
    </div>
  </div>
  <button type="submit" id="saveActivityButton">Save Activity</button>
</form>


      

      <button id="deleteVoyageButton" type="deleteButton">Delete SoF</button>
    `;

    window.addEventListener("DOMContentLoaded", () => {
      // Get the current date and time
      const today = new Date();

      // Format the date as YYYY-MM-DD for the input[type="date"]
      const formattedDate = today.toISOString().split("T")[0];

      // Format the time as HH:MM for the input[type="time"]
      const formattedTime = today.toTimeString().split(" ")[0].substring(0, 5);

      // Set the default values for the form inputs
      document.getElementById("date").value = formattedDate;
      document.getElementById("time").value = formattedTime;
    });

    // Event listener for adding activity
    const activityForm = document.getElementById("activityForm");
    activityForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const activity = document.getElementById("activity").value;
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
      const remarks = document.getElementById("remarks").value;

      const newActivity = { activity, date, time, remarks };
      activities.push(newActivity);

      // Save to localStorage
      localStorage.setItem("activities", JSON.stringify(activities));

      // Reload activities table
      statementOfFact(contentArea);
    });

    // Edit button functionality
    const editButtons = document.querySelectorAll(".editBtn");
    editButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const activity = activities[index];

        // Populate the form with the activity's data
        document.getElementById("activity").value = activity.activity;
        document.getElementById("date").value = activity.date;
        document.getElementById("time").value = activity.time;
        document.getElementById("remarks").value = activity.remarks;

        // Remove the activity from the list
        activities.splice(index, 1);
        localStorage.setItem("activities", JSON.stringify(activities));

        // Reload the content and show the updated list
        statementOfFact(contentArea);
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
