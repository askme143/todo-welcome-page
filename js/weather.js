const API_KEY = '5e59383bc5ac9beedeb3ae7b46c40533';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const UV_URL =
  'http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}';
const ICON_URL = 'http://openweathermap.org/img/wn/'; // + code + @2x.png
const COORDS = 'coordinates';

const weatherBtn = document.querySelector('.js-weatherBtn');
const gpsBtnList = document.querySelectorAll('.js-gps');

/* Weather Button */
const weatherImg = document.querySelector('.js-weatherImg');
const weatherTemp = document.querySelector('.js-weatherTemp');
const weatherCity = document.querySelector('.js-weatherCity');
const noLocInfo = document.querySelector('.js-noLocInfo');

/* Modal */
const modalCity = document.querySelector('.js-modalCity');
const modalImg = document.querySelector('.js-modalImg');
const modalTemp = document.querySelector('.js-modalTemp');
const descripText = document.querySelector('.js-descripText');

/* Modal Details */
const rainLi = document.querySelector('.js-rain');
const rainText = document.querySelector('.js-rainText');
const windImg = document.querySelector('.js-windImg');
const windText = document.querySelector('.js-windText');
const pressText = document.querySelector('.js-pressText');
const humidText = document.querySelector('.js-humidText');
// const uvText = document.querySelector('.js-uvText');
// const dewText = document.querySelector('.js-dewText');
const visibText = document.querySelector('.js-visibText');

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGpsClick(btn) {
  return function () {
    const img = btn.children[0];
    img.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(180deg)' }], {
      duration: 500,
      iterations: 1,
    });
    askForCoords();
  };
}

function makeDescription(weatherJson) {
  const feelsLikeTemp = weatherJson.main.feels_like;
  const weatherList = weatherJson.weather;
  const weatherTypes = [];
  const descriptions = [];

  let descriptionText = `Feels like ${feelsLikeTemp}℃.`;

  for (let i = 0; i < weatherList.length; i++) {
    weatherTypes.push(weatherList[i].main);
    descriptions.push(weatherList[i].description);
  }

  for (let i = 0; i < weatherList.length; i++)
    descriptionText += ` ${weatherTypes[i]}, ${descriptions[i]}.`;

  return descriptionText;
}

function paintWeather(weatherJson) {
  weatherBtn.classList.remove('hidden');
  noLocInfo.classList.add('hidden');

  const iconUrl = ICON_URL + `${weatherJson.weather[0].icon}@2x.png`;
  const temp = weatherJson.main.temp;
  const city = weatherJson.name;

  weatherImg.src = iconUrl;
  weatherTemp.innerText = temp;
  weatherCity.innerText = city;

  modalCity.innerText = city;
  modalImg.src = iconUrl;
  modalTemp.innerText = temp;
  descripText.innerText = makeDescription(weatherJson);

  if (weatherJson.rain !== undefined) {
    rainLi.classList.remove('hidden');
    rainText.innerText = weatherJson.rain['1h'];
  }

  windImg.style.transform = `rotate(${weatherJson.wind.deg}deg)`;
  windText.innerText = weatherJson.wind.speed;
  pressText.innerText = weatherJson.main.pressure;
  humidText.innerText = weatherJson.main.humidity;
  visibText.innerText = parseInt(weatherJson.visibility) / 1000;
}

function showDefaultMsg() {
  weatherBtn.classList.add('hidden');
  noLocInfo.classList.remove('hidden');
  noLocInfo.animate([{ opacity: 0.3 }, { opacity: 0.7 }, { opacity: 1 }], {
    duration: 750,
  });
}

async function getWeather(coordsObj) {
  const url = `${API_URL}?lat=${coordsObj.latitude}&lon=${coordsObj.longitude}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const weatherJson = await response.json();
  console.log(weatherJson);

  paintWeather(weatherJson);
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
  localStorage.removeItem(COORDS);
  showDefaultMsg();
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
  gpsBtnList.forEach((btn) => {
    btn.addEventListener('click', handleGpsClick(btn));
  });
  loadCoords();
}

init();
