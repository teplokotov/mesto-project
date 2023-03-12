const btnEdit = document.querySelector('.btn-edit');
const popupEdit = document.querySelector('#popupEdit');
const btnClose = document.querySelector('.btn-close');

// Открытие модального окна (Редактировать профиль)
btnEdit.addEventListener('click', function (evt) {
  popupEdit.classList.add('popup_opened');
});

// Закрытие модальных окон
btnClose.addEventListener('click', function (evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
});
