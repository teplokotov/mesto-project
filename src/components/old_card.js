import {  openPopup, closePopupByEscape, closePopup  } from '../components/old_modal.js';
import {  cardTemplateElement,
          figureImage,
          figureCaption,
          popupShowPhoto,
          setAction
       } from './old_utils.js';
import {  deleteCard, toggleLike } from './old_api.js'

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
    // Change counter and toggle 'like' button after get response
    toggleLike(card_id, action)
      .then(res => {
        cardElementCounter.textContent = res.likes.length > 0 ? res.likes.length : '';
        btnLike.classList.toggle('btn-like_liked');
      })
      .catch(err => console.log(err));
  });
  // Allow to delete card
  if (user_id !== owner_id) {
    btnTrash.remove();
  } else {
    btnTrash.addEventListener('click', function (evt) {
      openPopup(popupConsent);
      // Create function for delete card after consent
      setAction('findAndRemoveCard', () => {
        deleteCard(card_id)
          .then(() => {
            evt.target.closest('.element').remove();
            closePopup(popupConsent);
          })
          .catch(err => console.log(err));
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
