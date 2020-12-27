const API_KEY = '5e59383bc5ac9beedeb3ae7b46c40533';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const COORDS = 'coordinates';

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function paintWeather() {}

async function getWeather(coordsObj) {
  const response = await fetch(
    `${API_URL}?lat=${coordsObj.latitude}&lon=${coordsObj.longitude}&appid=${API_KEY}&units=metric`
  );
  const weatherJson = await response.json();
  console.log(weatherJson);
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };

  saveCoords(coordsObj);
  getWeather(coordsObj);
}
function handleGeoError() {
  console.log("Can't access geolocation");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = JSON.parse(localStorage.getItem(COORDS));
  if (loadedCoords === null) {
    askForCoords();
  } else {
    getWeather(loadedCoords);
  }
}

function init() {
  loadCoords();
}

init();
