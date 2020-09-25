// Geo-Location
// https://developer.mozilla.org/de/docs/Web/WebAPI/verwenden_von_geolocation

getPosition();

async function getPosition() {
  const position = await geoLocation();
  const { coords, timestamp } = position;
  const { latitude, longitude, accuracy } = coords;
  console.log(
    "latitude:",
    latitude,
    "longitude:",
    longitude,
    "accuracy:",
    accuracy,
    "timestamp:",
    timestamp
  );
}

function geoLocation() {
  if (!navigator.geolocation)
    return "Geolokation wird von ihrem Browser nicht unterstützt.";
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function resolve(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  output.innerHTML =
    "<p>Die Latitude ist " +
    latitude +
    "° <br>Die Longitude ist " +
    longitude +
    "°</p>";
}

function reject(position) {
  output.innerHTML = "Es war nicht möglich Sie zu lokalisieren";
}

function prompt(window, pref, message, callback) {
  let branch = Components.classes[
    "@mozilla.org/preferences-service;1"
  ].getService(Components.interfaces.nsIPrefBranch);

  if (branch.getPrefType(pref) === branch.PREF_STRING) {
    switch (branch.getCharPref(pref)) {
      case "always":
        return callback(true);
      case "never":
        return callback(false);
    }
  }

  let done = false;

  function remember(value, result) {
    return function () {
      done = true;
      branch.setCharPref(pref, value);
      callback(result);
    };
  }

  let self = window.PopupNotifications.show(
    window.gBrowser.selectedBrowser,
    "geolocation",
    message,
    "geo-notification-icon",
    {
      label: "Ort teilen",
      accessKey: "S",
      callback: function (notification) {
        done = true;
        callback(true);
      }
    },
    [
      {
        label: "Immer teilen",
        accessKey: "A",
        callback: remember("always", true)
      },
      {
        label: "Niemals teilen",
        accessKey: "N",
        callback: remember("never", false)
      }
    ],
    {
      eventCallback: function (event) {
        if (event === "dismissed") {
          if (!done) callback(false);
          done = true;
          window.PopupNotifications.remove(self);
        }
      },
      persistWhileVisible: true
    }
  );
}

prompt(
  window,
  "extensions.foo-addon.allowGeolocation",
  "Foo Add-on möchte deinen Ort abrufen.",
  function callback(allowed) {
    alert(allowed);
  }
);
