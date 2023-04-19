import {  settings, resetFormError  } from './validate.js';
import {  btnSaveProfile, formNewElement } from './utils.js';
import {  addCard } from './card.js';

const userName = document.querySelector('.info__name');
const userStatus = document.querySelector('.info__status');
const inputUserName = document.querySelector('#profileName');
const inputUserStatus = document.querySelector('#profileStatus');
const popupEdit = document.querySelector('#popupEdit');
const popupNewElement = document.querySelector('#popupNewElement');
const popupShowPhoto = document.querySelector('#popupShowPhoto');
const btnSaveCard = popupNewElement.querySelector(settings.submitButtonSelector);
const elementName = document.querySelector('#elementName');
const elementLink = document.querySelector('#elementLink');

// Opening modal window
export function openPopup(item) {
  item.classList.add('popup_opened');
};

// Closing popup by pressing Escape
export function closePopupByEscape(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') closePopup(popupOpened);
}

// Closing modal window and removing 'keydown' event listener
export function closePopup(item) {
  window.removeEventListener('keydown', closePopupByEscape);
  item.classList.remove('popup_opened');
};

export function hideClosestPopup(evt) {
  closePopup(evt.target.closest('.popup'));
};

// Open modal window (Edit profile)
export function handleClickBtnEdit(evt) {
  inputUserName.value = userName.textContent;
  inputUserStatus.value = userStatus.textContent;
  resetFormError(popupEdit, [inputUserName, inputUserStatus], btnSaveProfile, settings);
  window.addEventListener('keydown', closePopupByEscape);
  openPopup(popupEdit);
}

// Set name and status from modal window to page and close modal window
export function handleSubmitFormProfile (evt) {
  evt.preventDefault();
  userName.textContent = inputUserName.value;
  userStatus.textContent = inputUserStatus.value;
  hideClosestPopup(evt);
}

// Allow to close each modal windows if click on overlay
export function setEventListenersOnPopups() {
  [popupEdit, popupNewElement, popupShowPhoto].forEach(function (popup) {
    popup.addEventListener('click', function (evt) {
      if (!evt.target.className.includes('form') &&
          !evt.target.className.includes('figure') ||
          evt.target.classList.contains('popup__container')) {
        hideClosestPopup(evt);
      }
    });
  });
}

// Open modal window (Add new card)
export function handleClickBtnAdd() {
  formNewElement.reset();
  resetFormError(popupNewElement, [elementName, elementLink], btnSaveCard, settings);
  window.addEventListener('keydown', closePopupByEscape);
  openPopup(popupNewElement);
}

// Add new card and close modal window
export function handleSubmitFormNewElement(evt) {
  evt.preventDefault();
  addCard(elementName.value, elementLink.value);
  evt.target.reset();
  hideClosestPopup(evt);
}
