// Kontrollera om enheten är online
if (navigator.onLine) {
  // Hämta checklists.json från /data
  console.log("ONLINE");
  fetch("./data/checklists.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Misslyckades med att hämta checklists.json");
      }
      return response.json();
    })
    .then((data) => {
      // Spara data i localStorage
      localStorage.setItem("checklistsFromServer", JSON.stringify(data));
      console.log("Checklists sparade i localStorage:", data);
    })
    .catch((error) => {
      console.error("Fel vid hämtning av checklists.json:", error);
    });

  // Hämta ships.json från /data
  fetch("./data/ships.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Misslyckades med att hämta ships.json");
      }
      return response.json();
    })
    .then((data) => {
      // Spara data i localStorage
      localStorage.setItem("shipList", JSON.stringify(data));
      console.log("ship sparade i localStorage:", data);
    })
    .catch((error) => {
      console.error("Fel vid hämtning av ship.json:", error);
    });
} else {
  console.warn("Enheten är offline. Ingen data hämtades.");
}

if (window.location.pathname !== "/pages/dashboard.html") {
  window.location.href = "./pages/dashboard.html";
}
document
  .getElementById("clearStorageBtn")
  .addEventListener("click", function () {
    // Rensa hela localStorage
    localStorage.clear();
    console.log("LocalStorage rensat");

    // Valfritt: Ge användaren ett meddelande eller uppdatera sidan
    alert("LocalStorage har rensats!");
    // Om du vill redirecta till en annan sida efter rensning, kan du göra det här:
    // window.location.href = "./index.html";
  });

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
