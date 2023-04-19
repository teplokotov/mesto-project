import {  closePopupByEscape, openPopup  } from './modal.js';

const cardsContainer = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card-template').content;
const cardTemplateElement = cardTemplate.querySelector('.element');
const figure = document.querySelector('.figure');
const figureImage = figure.querySelector('.figure__image');
const figureCaption = figure.querySelector('.figure__caption');
const popupShowPhoto = document.querySelector('#popupShowPhoto');

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
    // Close popup if press 'Escape'
    window.addEventListener('keydown', closePopupByEscape);
    openPopup(popupShowPhoto);
  });
  return cardElement;
};

// Adding card to list
export function addCard(name, link, place) {
  const cardElement = createCard(name, link);
  place === 'append' ? cardsContainer.append(cardElement) : cardsContainer.prepend(cardElement);
};

// Drawing cards
export function drawCards(cards) {
  cards.forEach((item) => {
    addCard(item.name, item.link, 'append');
  });
};
