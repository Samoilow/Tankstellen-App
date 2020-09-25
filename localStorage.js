// Local-Storage
// https://developer.mozilla.org/de/docs/Web/API/Window/localStorage

const favIds = [
    "12c1ee3a-2e86-4b1c-9a4d-66dd0adc4c7e",
    "8e85a891-70b5-4240-addd-08e180442ce1",
    "72f6bb23-29e5-4533-8c32-9fb6a7a2c28c"
];

// Syntax:
// Item hinzufügen
localStorage.setItem("key", "value");
// Item auslesen
const value = localStorage.getItem("key");
console.log(value);
// löschen eines Items
localStorage.removeItem("key");

// Löscht alle Einträge
localStorage.clear();


// Objekte und Arrays können in Json Strings umgewandelt werden
localStorage.setItem("favs", JSON.stringify(favIds));

let favs = localStorage.getItem("favs");
favs = JSON.parse(favs);
console.log(favs);


