// Kontrollera om användaren är inloggad
if (localStorage.getItem("loggedIn") !== "true") {
  // Redirecta tillbaka till inloggningssidan om användaren inte är inloggad
  window.location.href = "index.html";
}

// Få referenser till menyalternativen och innehållsområdet
const hanteraResa = document.getElementById("hantera-resa");
const berakningar = document.getElementById("berakningar");
const protests = document.getElementById("protests");
const content = document.querySelector(".content");

// Funktion för att uppdatera innehållet
function updateContent(title, description) {
  content.innerHTML = `
        <h1>${title}</h1>
        <p>${description}</p>
    `;
}

// Funktion för att markera valt alternativ i menyn
function highlightSelectedMenu(selectedMenu) {
  const menuItems = document.querySelectorAll(".menu a");
  menuItems.forEach((item) => {
    item.style.fontWeight = "normal"; // Återställ alla till normal vikt
    item.style.textDecoration = "none"; // Återställ textdekorering
  });
  selectedMenu.style.fontWeight = "bold"; // Markera vald meny
  selectedMenu.style.textDecoration = "underline"; // Lägg till understrykning på vald meny
}

// Lägg till eventlyssnare på menyalternativen
hanteraResa.addEventListener("click", function () {
  updateContent(
    "Hantera en resa",
    "Här kan du hantera dina resor och bokningar."
  );
  highlightSelectedMenu(hanteraResa);
});

berakningar.addEventListener("click", function () {
  updateContent(
    "Beräkningar",
    "Här kan du göra olika beräkningar relaterade till dina resor."
  );
  highlightSelectedMenu(berakningar);
});

protests.addEventListener("click", function () {
  updateContent(
    "Protests",
    "Här kan du hantera eventuella protester och klagomål."
  );
  highlightSelectedMenu(protests);
});
