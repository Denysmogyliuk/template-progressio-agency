let modalOverlay = document.querySelector('.modal');
let modalCard = document.querySelector('.modal__card');
let modalButtons = document.querySelectorAll('.modal-button');
let modalButtonArray = Array.prototype.slice.call(modalButtons);

if (document.querySelector('.modal')) {
  modalButtonArray.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      modalOverlay.classList.remove('visually-hidden');
      modalOverlay.classList.add('modal--open');
      modalCard.classList.add('modal__card--open');
      document.body.style.overflow = 'hidden';
      document.body.style.padding = '0 15px 0 0';
      if (modalCard.classList.contains('modal__card--open')) {
        window.addEventListener('click', function (e) {
          if (e.target === modalOverlay) {
            document.body.style.overflow = 'visible';
            document.body.style.padding = '0';
            modalOverlay.classList.remove('modal--open');
            modalCard.classList.remove('modal__card--open');
          }
        });
      }
    });
  });
}
