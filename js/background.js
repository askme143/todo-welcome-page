const wrapper = document.querySelector('.wrapper');

function init() {
  const randomNum = Math.floor(Math.random() * 3) + 1;
  wrapper.style.backgroundImage = `url('/todo-welcome-page/images/background_${randomNum}.jpg')`;
}

init();
