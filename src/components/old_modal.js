import {  popupAvatar,
          popupEdit,
          popupNewElement,
          popupShowPhoto,
          popupConsent
       } from '../components/old_utils.js';

// Opening modal window
export function openPopup(item) {
  item.classList.add('popup_opened');
  // Close popup if press 'Escape'
  window.addEventListener('keydown', closePopupByEscape);
};

// Closing popup by pressing Escape
export function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

// Closing modal window and removing 'keydown' event listener
export function closePopup(item) {
  window.removeEventListener('keydown', closePopupByEscape);
  item.classList.remove('popup_opened');
};

export function hideClosestPopup(evt) {
  closePopup(evt.target.closest('.popup'));
};

// Allow to close each modal windows if click on overlay
export function setEventListenersOnPopups() {
  [popupEdit, popupNewElement, popupShowPhoto, popupAvatar, popupConsent].forEach(function (popup) {
    popup.addEventListener('click', function (evt) {
      if (!evt.target.className.includes('form') &&
          !evt.target.className.includes('figure') ||
          evt.target.classList.contains('popup__container')) {
        hideClosestPopup(evt);
      }
    });
  });
}
