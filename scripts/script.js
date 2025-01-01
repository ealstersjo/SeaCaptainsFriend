document
  .getElementById("lookup-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const value1 = parseInt(document.getElementById("value1").value, 10);
    const value2 = parseInt(document.getElementById("value2").value, 10);
    const value3 = parseInt(document.getElementById("value3").value, 10);

    // Läs in data från JSON-filen
    const response = await fetch("data.json");
    const data = await response.json();

    // Sök efter rätt värde i tabellen
    const match = data.find(
      (item) =>
        item.value1 === value1 &&
        item.value2 === value2 &&
        item.value3 === value3
    );

    // Visa resultatet
    const resultElement = document.getElementById("result");
    if (match) {
      resultElement.textContent = `Resultat: ${match.result}`;
    } else {
      resultElement.textContent = "Inga matchningar hittades.";
    }
  });
