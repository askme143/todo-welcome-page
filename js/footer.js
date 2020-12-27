const modalBtns = document.querySelectorAll('.js-modalBtn');
let openedBtn = undefined;

function handleModalClick(btn) {
  return function () {
    if (btn.classList.contains('opened')) {
      btn.classList.remove('opened');
    } else {
      if (openedBtn !== undefined) openedBtn.classList.remove('opened');
      btn.classList.add('opened');
      openedBtn = btn;
    }
  };
}

function init() {
  modalBtns.forEach(function (modalBtn) {
    modalBtn.addEventListener('click', handleModalClick(modalBtn));
  });
}

init();
