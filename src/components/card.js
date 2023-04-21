import {  openPopup, closePopupByEscape, hideClosestPopup  } from './modal.js';
import {  cardTemplateElement,
          figureImage,
          figureCaption,
          popupShowPhoto,
          formConsent
       } from './utils.js';
import {  deleteCard, toggleLike } from '../components/api.js'

// Creating card
export function createCard(name, link, likes, owner_id, user_id, card_id) {
  const cardElement = cardTemplateElement.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__image');
  const cardElementTitle = cardElement.querySelector('.element__title');
  const cardElementCounter = cardElement.querySelector('.counter');
  const btnLike = cardElement.querySelector('.btn-like');
  const btnTrash = cardElement.querySelector('.btn-trash');
  cardElementImage.setAttribute('alt', name);
  cardElementImage.setAttribute('src', link);
  cardElementTitle.textContent = name;
  // Show likes counter and toggle initial state of like
  if(likes.length !== 0) {
    cardElementCounter.textContent = likes.length;
    const isLiked = likes.find(like => like._id === user_id ? true : false);
    if (isLiked) btnLike.classList.toggle('btn-like_liked');
  }
  // Allow to make like
  btnLike.addEventListener('click', function () {
    let action = btnLike.classList.contains('btn-like_liked') ? 'DELETE' : 'PUT';
    // Toggle 'like' button before get response for better UX
    btnLike.classList.toggle('btn-like_liked');
    // Change counter after get response
    toggleLike(card_id, action)
      .then(res => cardElementCounter.textContent = res.likes.length)
      .catch(err => console.log(err));
  });
  // Allow to delete card
  if (user_id !== owner_id) {
    btnTrash.remove();
  } else {
    btnTrash.addEventListener('click', function (evt) {
      window.addEventListener('keydown', closePopupByEscape);
      openPopup(popupConsent);
      //Accept to delete card
      const closestElement = evt.target.closest('.element');
      formConsent.addEventListener('submit', function findAndRemoveCard(evt) {
        evt.preventDefault();
        deleteCard(card_id)
          .then(() => closestElement.remove())
          .catch(err => console.log(err));
        hideClosestPopup(evt);
        formConsent.removeEventListener('submit', findAndRemoveCard);
      });
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
