const puppeteer = require("puppeteer");

async function parsearUrls() {
  const urlToParse =
    "https://listado.mercadolibre.com.pe/inmuebles/departamentos/alquiler/lima";

  const options = { headless: false };

  const browser = await puppeteer.launch(options);

  const page = await browser.newPage();

  await page.setViewport({
    width: 1200,
    height: 1020,
    deviceScaleFactor: 1,
  });

  await page.goto(urlToParse);

  const obtenerLinkPromiset = page.evaluate(() => {
    const getLink = (publication) => {
      return publication.getElementsByClassName("ui-search-result__content")[0]
        .href;
    };

    const todasLasPublicaciones = document.getElementsByClassName(
      "ui-search-layout__item"
    );

    return Array.from(todasLasPublicaciones).map((publication) =>
      getLink(publication)
    );
  });

  const apartamentsLink = await obtenerLinkPromiset;
  // Array list liks
  console.log(apartamentsLink);
  guardarLinksEnBaseDeDatos(apartamentsLink);
}

function guardarLinksEnBaseDeDatos(apartamentos) {
  console.log("Guardando aparramentos en la base de datos");
  console.log("Han sido guardados");
}

parsearUrls();


exportToCsv = function() {
  var CsvString = "example";
  apartamentsLink.forEach(function(RowItem, RowIndex) {
    RowItem.forEach(function(ColItem, ColIndex) {
      CsvString += ColItem + ',';
    });
    CsvString += "\r\n";
  });
  CsvString = "data:application/csv," + encodeURIComponent(CsvString);
  var x = document.createElement("A");
  x.setAttribute("href", CsvString );
  x.setAttribute("download","somedata.csv");
  document.body.appendChild(x);
  x.click();
}

exportToCsv()


// 5
