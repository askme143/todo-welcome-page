const form = document.querySelector('.js-toDoForm');
const input = form.querySelector('input');
const toDoList = document.querySelector('.js-toDoList');
const emptyMsg = document.querySelector('.js-emptyMsg');
const toDoCount = document.querySelector('.js-toDoCount');

const TODOS_LS = 'toDos';
const toDos = [];

function handleAppend(event) {
  event.preventDefault();

  const toDoObj = {
    id: toDos.length > 0 ? toDos[toDos.length - 1].id + 1 : 1,
    text: input.value,
    checked: false,
  };

  appendToDo(toDoObj);
  saveToDos();

  input.value = '';
}

function handleCheck(event) {
  const input = event.target;
  const li = input.parentNode;
  const idx = getEntryIndex(input);

  toDos[idx].checked = input.checked;
  if (input.checked) {
    li.classList.add('checked');
  } else {
    li.classList.remove('checked');
  }

  updateToDoCount();
  saveToDos();
}

function handleEdit(event) {
  event.preventDefault();

  const form = event.target;
  const idx = getEntryIndex(form);

  toDos[idx].text = form[0].value;
  saveToDos();
}

function handleDelete(event) {
  const btn = event.target;
  const idx = getEntryIndex(btn);
  const li = btn.parentNode;

  toDos.splice(idx, 1);
  toDoList.removeChild(li);
  if (toDos.length === 0) showEmptyMsg();

  updateToDoCount();
  saveToDos();
}

function getEntryIndex(target) {
  const li = target.parentNode;

  let i = 0;
  for (i = 0; i < toDos.length && `todo${toDos[i].id}` !== li.id; i++);

  return i;
}

function showEmptyMsg() {
  toDoList.classList.add('hidden');
  emptyMsg.classList.remove('hidden');
}
function hideEmptyMsg() {
  toDoList.classList.remove('hidden');
  emptyMsg.classList.add('hidden');
}

function paintToDo(toDoObj) {
  const li = document.createElement('li');
  li.classList.add('todo-entry');
  li.id = `todo${toDoObj.id}`;

  const checkBox = document.createElement('input');
  const checkLabel = document.createElement('label');
  checkBox.type = 'checkbox';
  checkBox.classList.add('todo-cb');
  checkBox.id = `${toDoObj.id}_cb`;
  checkBox.checked = toDoObj.checked;
  checkLabel.htmlFor = `${toDoObj.id}_cb`;
  checkLabel.classList.add('todo-check');

  const todoTextForm = document.createElement('form');
  const todoTextInput = document.createElement('input');
  todoTextInput.type = 'text';
  todoTextInput.value = toDoObj.text;
  todoTextForm.appendChild(todoTextInput);

  const delBtn = document.createElement('button');
  delBtn.classList.add('todo-del-btn');
  delBtn.innerText = '❌';

  /* Event Listener*/
  checkBox.addEventListener('change', handleCheck);
  todoTextForm.addEventListener('submit', handleEdit);
  delBtn.addEventListener('click', handleDelete);

  li.appendChild(checkBox);
  li.appendChild(checkLabel);
  li.appendChild(todoTextForm);
  li.appendChild(delBtn);

  toDoList.appendChild(li);
}

function updateToDoCount() {
  const number = toDos.filter(function (toDoEntry) {
    return toDoEntry.checked === false;
  }).length;
  toDoCount.innerText = `${number}`;

  if (number === 0) toDoCount.classList.add('hidden');
  else toDoCount.classList.remove('hidden');
}

function appendToDo(toDoObj) {
  toDos.push(toDoObj);
  paintToDo(toDoObj);
  updateToDoCount();
  hideEmptyMsg();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function loadToDos() {
  const loadedToDos = JSON.parse(localStorage.getItem(TODOS_LS));

  if (loadedToDos !== null && loadedToDos.length > 0) {
    loadedToDos.forEach(appendToDo);
  } else {
    showEmptyMsg();
  }
}

function init() {
  loadToDos();
  form.addEventListener('submit', handleAppend);
}

init();
