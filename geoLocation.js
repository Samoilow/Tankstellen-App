// Geo-Location
// https://developer.mozilla.org/de/docs/Web/WebAPI/verwenden_von_geolocation

getPosition();

async function getPosition() {
    const position = await geoLocation();
    const { coords, timestamp } = position;
    const { latitude, longitude, accuracy } = coords;
    console.log("latitude:", latitude, "longitude:", longitude, "accuracy:", accuracy, "timestamp:", timestamp);
}

function geoLocation() {
    if (!navigator.geolocation) return "Geolokation wird von ihrem Browser nicht unterstützt.";
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}