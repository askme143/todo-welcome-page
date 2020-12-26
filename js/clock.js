const clockContainer = document.querySelector('.js-clock'),
  clockTitle = clockContainer.querySelector('h1');

function formatNumber(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

function getTime() {
  const date = new Date();
  const hours = formatNumber(date.getHours());
  const minutes = formatNumber(date.getMinutes());
  const seconds = formatNumber(date.getSeconds());

  clockTitle.innerText = `${hours}:${minutes}:${seconds}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
