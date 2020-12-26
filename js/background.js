const wrapper = document.querySelector('.wrapper');

function init() {
  const randomNum = Math.floor(Math.random() * 3) + 1;
  wrapper.style.backgroundImage = `url('../images/background_${randomNum}.jpg')`;
}

init();
