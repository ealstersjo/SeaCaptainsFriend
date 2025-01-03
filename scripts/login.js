window.location.href = "./pages/dashboard.html";

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Kontrollera om användarnamn och lösenord är korrekta
    if (username === "oscar" && password === "oscar") {
      // Spara inloggningsstatus i localStorage
      localStorage.setItem("loggedIn", "true");
      // Redirecta till dashboard.html
      window.location.href = "./pages/dashboard.html";
    } else {
      // Visa felmeddelande
      document.getElementById("error-message").textContent =
        "Fel användarnamn eller lösenord.";
    }
  });
