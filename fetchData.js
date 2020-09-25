// Fetch Data
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

// ----------------------------------------------------------------
// Tankerkönig-Api

// Info und Key beantragen: https://creativecommons.tankerkoenig.de/
// Tankerkönig Api stellt:
// Umkreissuche, Preisabfrage und Detailabfrage zur Verfügung
// nähere Infos in der Doku von Tankerkönig
console.log('start');
getTankerkoenigData();

async function getTankerkoenigData() {
  // Beispiel mit Umkreissuche:
  const url = new URL("https://creativecommons.tankerkoenig.de/json/list.php");
  const params = url.searchParams;

  params.set("lat", position.coords.latitude); // Breitengrad
  params.set("lng", "lng"); // Längengrad
  params.set("rad", 10); // Suchradius in km (max 25 km)
  params.set("type", "diesel"); // Spritsorte: 'e5', 'e10', 'diesel' oder 'all'
  params.set("sort", "price"); // Sortierung: price, dist
  params.set("apikey", "bfc1eb8b-7404-aba9-55e1-62dcb16fdc1c"); //persönlicher Api-Key
  // ich hab meinen mal eingefügt -> ich habe ihn für eine App/Android generieren lassen; btw die Schriftart ist ja mal fancy

  const tankerkoenigData = await fetchData(url);
  console.log(tankerkoenigData);
  // Mit Daten weiterarbeiten...
}

// ----------------------------------------------------------------
// Vis-Api

getVisData();

async function getVisData() {
  const stationId = "b4ed695f-2cfc-4688-8ecf-268b10cdb93e";
  const stationPath = stationId.split("-").join("/");

  const urlVisHead =
    "https://www.volzinnovation.com/fuel_price_variations_germany/data2/";
  const urlVisTail = "/e10.json";

  const visData = await fetchData(urlVisHead + stationPath + urlVisTail);
  console.log(visData);
  // Mit Daten weiterarbeiten...
}

// ----------------------------------------------------------------
// fetchData function
async function fetchData(url) {
  // fetch url
  const response = await fetch(url);
  // parse response body and return
  return await response.json();
}


