import elements from '../blocks/elements/elements.js';

const btnEdit = document.querySelector('.btn-edit');
const popupEdit = document.querySelector('#popupEdit');
const btnClose = document.querySelector('.btn-close');
const formElement = document.querySelector('.form');
const cardsContainer = document.querySelector('.elements__list');

// Open modal window (Edit profile)
btnEdit.addEventListener('click', function (evt) {
  const userName = document.querySelector('.info__name').textContent;
  const userStatus = document.querySelector('.info__status').textContent;
  document.querySelector('#profileName').value = userName;
  document.querySelector('#profileStatus').value = userStatus;
  popupEdit.classList.add('popup_opened');
});

// Closing modal window
function closePopup(item) {
  item.target.closest('.popup').classList.remove('popup_opened');
};

// Close modal window by 'close' button
btnClose.addEventListener('click', function (evt) {
  closePopup(evt);
});

// Set name and status from modal window to page and close modal window
formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const inputUserName = document.querySelector('#profileName').value;
  const inputUserStatus = document.querySelector('#profileStatus').value;
  document.querySelector('.info__name').textContent = inputUserName;
  document.querySelector('.info__status').textContent = inputUserStatus;
  closePopup(evt);
});

function addCard(name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').setAttribute('alt', name);
  cardElement.querySelector('.element__image').setAttribute('src', link);
  cardElement.querySelector('.element__title').textContent = name;
  cardsContainer.append(cardElement);
};

function drawCards(cards) {
  cards.forEach((item) => {
    addCard(item.name, item.link);
  });
};

drawCards(elements);
