const form = document.querySelector('.js-greetingForm');
const input = form.querySelector('input');
const greeting = document.querySelector('.js-greetings');

const USER_LS = 'currentUser';
const HIDDEN_CN = 'hidden';

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();

  const currentValue = input.value;

  saveName(currentValue);
  paintGreeting(currentValue);
}

function askForName() {
  form.classList.remove(HIDDEN_CN);
  greeting.classList.add(HIDDEN_CN);
  form.addEventListener('submit', handleSubmit);
}

function paintGreeting(text) {
  form.classList.add(HIDDEN_CN);
  greeting.classList.remove(HIDDEN_CN);
  greeting.innerHTML = `Hello, ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
