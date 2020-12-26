const modalBtns = document.querySelectorAll('.js-modalBtn');

function handleModalClick(btn) {
  return function () {
    if (btn.classList.contains('opened')) {
      btn.classList.remove('opened');
    } else {
      btn.classList.add('opened');
    }
  };
}

function init() {
  modalBtns.forEach(function (modalBtn) {
    modalBtn.addEventListener('click', handleModalClick(modalBtn));
  });
}

init();
