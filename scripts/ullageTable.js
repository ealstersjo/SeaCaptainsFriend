export const printUllageTable = (data) => {
  const container = document.getElementById("containerUllage");
  container.innerHTML =
    "<h3 class='ullage-header'>" + data.headers.headers.Header + "</h3>"; // Lägg till rubrik

  container.innerHTML +=
    "<div class='ullageHeader'><strong>Port: </strong>" +
    data.headers.headers.Port +
    ", <br/><strong>Terminal: </strong>" +
    data.headers.headers.Terminal +
    ", <br/><strong>Operator: </strong>" +
    data.headers.headers.Operator +
    ", <br/><strong>Date: </strong>" +
    data.headers.headers.Date +
    ", <br/><strong>Vessel: </strong>" +
    data.headers.headers.VesselAndHull +
    ", <br/><strong>Voyage: </strong>" +
    data.headers.headers.Voyage +
    "</div>";

  container.innerHTML +=
    "<div class='trimValues'><strong>Draft fore: </strong>" +
    data.headers.headers.DraftFore +
    ", <strong>Draft aft: </strong>" +
    data.headers.headers.DraftAft +
    ", <strong>Trim: </strong>" +
    data.headers.headers.Trim +
    ", <strong>Heel: </strong>" +
    data.headers.headers.Heel +
    "</div>";

  container.innerHTML +=
    "<div class='productInfo'><strong>Product: </strong>" +
    data.ullage.productAndDensity.Product +
    ", <br/><strong>Density in air at 15 deg C: </strong>" +
    data.ullage.productAndDensity.DensityInAir +
    " (t/m3), <br/><strong>Density in vac at 15 deg C: </strong>" +
    data.ullage.productAndDensity.DensityInVac +
    " (t/m3), <br/><strong>ASTM table: </strong>" +
    data.ullage.productAndDensity.ASTMTable +
    "</div>";

  // Skapa tabellen från tankData
  let tableHTML = "<table class='tank-data-table'>";

  // Skapa tabellrubriker
  tableHTML += "<thead>";

  // Första raden i rubriken
  tableHTML += "<tr>";
  tableHTML += "<th rowspan='2'>Tank</th>";
  tableHTML += "<th colspan='4'>Total</th>";
  tableHTML += "<th rowspan='2'>FWVolume</th>";
  tableHTML += "<th rowspan='2'>GOV</th>";
  tableHTML += "<th rowspan='2'>Temp</th>";
  tableHTML += "<th rowspan='2'>VCF</th>";
  tableHTML += "<th rowspan='2'>GSVA@5C</th>";
  tableHTML += "<th rowspan='2'>GSV@60F</th>";
  tableHTML += "<th colspan='2'>Weight</th>";

  tableHTML += "</tr>";

  // Andra raden i rubriken
  tableHTML += "<tr>";
  tableHTML += "<th rowspan='2'>GaugeSystem</th>";
  tableHTML += "<th>Obs</th>";
  tableHTML += "<th>Corr</th>";
  tableHTML += "<th rowspan='2'>Vol</th>";
  tableHTML += "<th rowspan='2'>In Air</th>";
  tableHTML += "<th rowspan='2'>In Vac</th>";
  tableHTML += "</tr>";

  tableHTML += "</thead>";

  // Skapa tabellinnehåll från tankData
  tableHTML += "<tbody>";
  data.ullage.tankData.forEach((tank) => {
    tableHTML += "<tr>";
    tableHTML += `<td>${tank.name}</td>`;
    tableHTML += `<td>${tank.GaugeSystem ? tank.GaugeSystem : ""}</td>`;
    tableHTML += `<td>${tank.Obs !== null ? tank.Obs : ""}</td>`;
    tableHTML += `<td>${tank.Corr !== null ? tank.Corr : ""}</td>`;
    tableHTML += `<td>${tank.Vol !== null ? tank.Vol : ""}</td>`;
    tableHTML += `<td>${tank.FWVolume !== null ? tank.FWVolume : ""}</td>`;
    tableHTML += `<td>${tank.GOV !== null ? tank.GOV : ""}</td>`;
    tableHTML += `<td>${tank.Temp !== null ? tank.Temp : ""}</td>`;
    tableHTML += `<td>${tank.VCF !== null ? tank.VCF : ""}</td>`;
    tableHTML += `<td>${tank.GSVAt15C !== null ? tank.GSVAt15C : ""}</td>`;
    tableHTML += `<td>${tank.GSVAt60F !== null ? tank.GSVAt60F : ""}</td>`;
    tableHTML += `<td>${
      tank.WeightInAir !== null ? tank.WeightInAir : ""
    }</td>`;
    tableHTML += `<td>${
      tank.WeightInVac !== null ? tank.WeightInVac : ""
    }</td>`;
    tableHTML += "</tr>";
  });
  tableHTML += "</tbody>";

  // Stäng table taggen
  tableHTML += "</table>";

  // Lägg till tabellen i container
  container.innerHTML += tableHTML;

  container.innerHTML += "<pre>" + JSON.stringify(data, null, 2) + "</pre>";

  console.log(data);
};
