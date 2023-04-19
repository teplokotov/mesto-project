import {  closePopupByEscape, openPopup  } from './modal.js';
import {  cardTemplateElement,
          figureImage,
          figureCaption,
          popupShowPhoto
       } from './utils.js';

// Creating card
export function createCard(name, link) {
  const cardElement = cardTemplateElement.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__image');
  const cardElementTitle = cardElement.querySelector('.element__title');
  cardElementImage.setAttribute('alt', name);
  cardElementImage.setAttribute('src', link);
  cardElementTitle.textContent = name;
  // Make like/unlike
  const btnLike = cardElement.querySelector('.btn-like');
  btnLike.addEventListener('click', function () {
    btnLike.classList.toggle('btn-like_liked');
  });
  // Delete card
  const btnTrash = cardElement.querySelector('.btn-trash');
  btnTrash.addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
  // Open popup with photo
  cardElementImage.addEventListener('click', function (evt) {
    figureImage.setAttribute('alt', name);
    figureImage.setAttribute('src', link);
    figureCaption.textContent = name;
    openPopup(popupShowPhoto);
  });
  return cardElement;
};
