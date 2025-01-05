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
    " (m), <strong>Draft aft: </strong>" +
    data.headers.headers.DraftAft +
    " (m), <strong>Trim: </strong>" +
    data.headers.headers.Trim +
    " (m), <strong>Heel: </strong>" +
    data.headers.headers.Heel +
    " (deg)</div>";

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
  tableHTML += "<th rowspan='2'>FWVolume(m3)</th>";
  tableHTML += "<th rowspan='2'>GOV(m3)</th>";
  tableHTML += "<th rowspan='2'>Temp(C)</th>";
  tableHTML += "<th rowspan='2'>VCF</th>";
  tableHTML += "<th rowspan='2'>GSVA@5C(m3)</th>";
  tableHTML += "<th rowspan='2'>GSV@60F(Bbls)</th>";
  tableHTML += "<th colspan='2'>Weight</th>";

  tableHTML += "</tr>";

  // Andra raden i rubriken
  tableHTML += "<tr>";
  tableHTML += "<th rowspan='2'>GaugeSystem</th>";
  tableHTML += "<th>Obs(m)</th>";
  tableHTML += "<th>Corr(m)</th>";
  tableHTML += "<th rowspan='2'>Vol(m3)</th>";
  tableHTML += "<th rowspan='2'>In Air(Mt)</th>";
  tableHTML += "<th rowspan='2'>In Vac(Mt)</th>";
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

  container.innerHTML +=
    "<div class='quantBefore'><h4>Quantities before load</h4>" +
    "</br><strong>TOV: </strong>" +
    data.headers.quantities.quantBefore.TOV +
    " (m3)</br><strong>F.W: </strong>" +
    data.headers.quantities.quantBefore.F_W +
    "</br><strong>GOV: </strong>" +
    data.headers.quantities.quantBefore.GOV +
    " (m3)</br><strong>GSV@15C: </strong>" +
    data.headers.quantities.quantBefore.GSVAt15C +
    " (m3)</br><strong>GSV@60F: </strong>" +
    data.headers.quantities.quantBefore.GSVAt60F +
    " (Bbls)</br><strong>Weight in air: </strong>" +
    data.headers.quantities.quantBefore.WeightInAir +
    " (Mt)</br><strong>Weight in vac: </strong>" +
    data.headers.quantities.quantBefore.WeightInVac +
    " (Mt)</div>";

  container.innerHTML +=
    "<div class='quantAfter'><h4>Quantities after load</h4>" +
    "</br><strong>TOV: </strong>" +
    data.headers.quantities.quantAfter.TOV +
    " (m3)</br><strong>F.W: </strong>" +
    data.headers.quantities.quantAfter.F_W +
    "</br><strong>GOV: </strong>" +
    data.headers.quantities.quantAfter.GOV +
    " (m3)</br><strong>GSV@15C: </strong>" +
    data.headers.quantities.quantAfter.GSVAt15C +
    " (m3)</br><strong>GSV@60F: </strong>" +
    data.headers.quantities.quantAfter.GSVAt60F +
    " (Bbls)</br><strong>Weight in air: </strong>" +
    data.headers.quantities.quantAfter.WeightInAir +
    " (Mt)</br><strong>Weight in vac: </strong>" +
    data.headers.quantities.quantAfter.WeightInVac +
    " (Mt)</div>";

  container.innerHTML +=
    "<div class='quantLoaded'><h4>Loaded quantities</h4>" +
    "</br><strong>TOV: </strong>" +
    data.headers.quantities.quantLoaded.TOV +
    " (m3)</br><strong>F.W: </strong>" +
    data.headers.quantities.quantLoaded.F_W +
    "</br><strong>GOV: </strong>" +
    data.headers.quantities.quantLoaded.GOV +
    " (m3)</br><strong>GSV@15C: </strong>" +
    data.headers.quantities.quantLoaded.GSVAt15C +
    " (m3)</br><strong>GSV@60F: </strong>" +
    data.headers.quantities.quantLoaded.GSVAt60F +
    " (Bbls)</br><strong>Weight in air: </strong>" +
    data.headers.quantities.quantLoaded.WeightInAir +
    " (Mt)</br><strong>Weight in vac: </strong>" +
    data.headers.quantities.quantLoaded.WeightInVac +
    " (Mt)</div>";

  container.innerHTML +=
    "<div class='billOfLading'><h4>Bill of Lading</h4>" +
    "</br><strong>WtVac: </strong>" +
    data.headers.billOfLading.WtVac +
    " (Mt)</br><strong>Diff. Ship Fig: </strong>" +
    data.headers.billOfLading.DiffShipFig +
    " (%)</br><h5>Values VEF applied:</h5><strong>VEF: </strong>" +
    data.headers.billOfLading.VEF +
    "</br><strong>GSV@15C: </strong>" +
    data.headers.billOfLading.GSVAt15C +
    " (m3)</br><strong>GSV@60F: </strong>" +
    data.headers.billOfLading.GSVAt60F +
    " (Bbls)</br><strong>Weight in air: </strong>" +
    data.headers.billOfLading.WeightInAir +
    " (Mt)</br><strong>Weight in vac: </strong>" +
    data.headers.billOfLading.WeightInVac +
    " (Mt)</div>";
};
