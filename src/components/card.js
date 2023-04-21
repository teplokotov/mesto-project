import {  openPopup  } from './modal.js';
import {  cardTemplateElement,
          figureImage,
          figureCaption,
          popupShowPhoto
       } from './utils.js';
import {  deleteCard } from '../components/api.js'

// Creating card
export function createCard(name, link, likes, owner_id, user_id, card_id) {
  const cardElement = cardTemplateElement.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__image');
  const cardElementTitle = cardElement.querySelector('.element__title');
  const cardElementCounter = cardElement.querySelector('.counter');
  cardElementImage.setAttribute('alt', name);
  cardElementImage.setAttribute('src', link);
  cardElementTitle.textContent = name;
  if(likes.length !== 0) cardElementCounter.textContent = likes.length;
  // Allow to make like
  const btnLike = cardElement.querySelector('.btn-like');
  btnLike.addEventListener('click', function () {
    btnLike.classList.toggle('btn-like_liked');
  });
  // Allow to delete card
  const btnTrash = cardElement.querySelector('.btn-trash');
  if (user_id !== owner_id) {
    btnTrash.remove();
  } else {
    btnTrash.addEventListener('click', function (evt) {
      deleteCard(card_id)
        .then(() => evt.target.closest('.element').remove())
        .catch(err => console.log(err));
    });
  }
  // Open popup with photo
  cardElementImage.addEventListener('click', function (evt) {
    figureImage.setAttribute('alt', name);
    figureImage.setAttribute('src', link);
    figureCaption.textContent = name;
    openPopup(popupShowPhoto);
  });
  return cardElement;
};
