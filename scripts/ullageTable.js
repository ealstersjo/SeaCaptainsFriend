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
    data.ullage.productAndDensityDensityInVac +
    " (t/m3), <br/><strong>ASTM table: </strong>" +
    data.ullage.productAndDensity.ASTMTable +
    "</div>";
  container.innerHTML += "<pre>" + JSON.stringify(data, null, 2) + "</pre>";

  console.log(data);
};
