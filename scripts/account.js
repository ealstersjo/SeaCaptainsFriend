export const account = (contentArea) => {
  const user = {
    username: "oscar",
    email: "oscar@example.com",
    fullName: "Oscar Palm",
    password: "oscar",
    roles: ["Chief Officer", "Sexy Beach", "Admin"],
  };

  const allRoles = [
    "Admin",
    "Master",
    "Chief Officer",
    "Sexy Beach",
    "Second Officer",
    "Office Personell",
  ]; // Alla tillgängliga roller

  const isAdminOrMaster =
    user.roles.includes("Admin") || user.roles.includes("Master");

  contentArea.innerHTML = `
        <h1 class="account-title">Handle Account</h1>
        <div class="account-container">
          <h2 class="account-subtitle">User Information</h2>
          <form id="accountForm">
            <div class="account-form-row">
              <label for="username" class="account-label">Username:</label>
              <input type="text" id="username" class="account-input" value="${
                user.username
              }" disabled />
            </div>
            <div class="account-form-row">
              <label for="email" class="account-label">Email:</label>
              <input type="email" id="email" class="account-input" value="${
                user.email
              }" />
            </div>
            <div class="account-form-row">
              <label for="fullName" class="account-label">Full Name:</label>
              <input type="text" id="fullName" class="account-input" value="${
                user.fullName
              }" />
            </div>
            <button type="submit" id="saveChangesButton" class="account-button">Save Changes</button>
          </form>

          <h2 class="account-subtitle">User Roles</h2>
          <form id="rolesForm">
            <ul id="rolesList" class="account-roles-list">
              ${allRoles
                .map(
                  (role) => `
                  <li>
                  <label class="custom-checkbox">
                      <input 
                        type="checkbox" 
                        value="${role}" 
                        ${user.roles.includes(role) ? "checked" : ""} 
                        ${!isAdminOrMaster ? "disabled" : ""}
                      />
                      <span class="checkmark"></span>
                      ${role}
                    </label>
                  </li>`
                )
                .join("")}
            </ul>
            ${
              isAdminOrMaster
                ? `<button type="submit" id="saveRolesButton" class="account-button">Save Roles</button>`
                : `<p class="info-message">You do not have permission to edit roles.</p>`
            }
          </form>
          
          <h2 class="account-subtitle">Change Password</h2>
          <form id="passwordForm">
            <div class="account-form-row">
              <label for="currentPassword" class="account-label">Current Password:</label>
              <input type="password" id="currentPassword" class="account-input" required />
            </div>
            <div class="account-form-row">
              <label for="newPassword" class="account-label">New Password:</label>
              <input type="password" id="newPassword" class="account-input" required />
            </div>
            <div class="account-form-row">
              <label for="confirmPassword" class="account-label">Confirm New Password:</label>
              <input type="password" id="confirmPassword" class="account-input" required />
            </div>
            <button type="submit" id="changePasswordButton" class="account-button">Change Password</button>
          </form>
          
          <button id="logoutButton" class="account-logout-button">Log Out</button>
        </div>
    `;

  // Event listener för att spara ändringar i användarinformation
  document.getElementById("accountForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const updatedEmail = document.getElementById("email").value;
    const updatedFullName = document.getElementById("fullName").value;

    alert(
      `User information updated:\nEmail: ${updatedEmail}\nFull Name: ${updatedFullName}`
    );
  });

  // Event listener för att spara roller (endast om användaren är admin eller master)
  if (isAdminOrMaster) {
    document.getElementById("rolesForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const selectedRoles = Array.from(
        document.querySelectorAll("#rolesList input[type='checkbox']:checked")
      ).map((checkbox) => checkbox.value);

      user.roles = selectedRoles;

      alert(`Roles updated: ${user.roles.join(", ")}`);
    });
  }

  // Event listener för att ändra lösenord
  document.getElementById("passwordForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (currentPassword !== user.password) {
      alert("Current password not correct!");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    alert("Password changed successfully!");
  });

  // Event listener för att logga ut användaren
  document.getElementById("logoutButton").addEventListener("click", () => {
    if (confirm("Are you sure you want to log out?")) {
      alert("User logged out.");
      // Lägg till eventuell logik för att hantera utloggning, t.ex. rensa lagrade tokens
    }
  });
};
