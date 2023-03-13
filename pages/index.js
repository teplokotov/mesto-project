import elements from '../blocks/elements/elements.js';

const btnEdit = document.querySelector('.btn-edit');
const popupEdit = document.querySelector('#popupEdit');
const btnAdd = document.querySelector('.btn-add');
const popupNewElement = document.querySelector('#popupNewElement');
const closeBtns = document.querySelectorAll('.btn-close');
const formProfile = popupEdit.querySelector('.form');
const formNewElement = popupNewElement.querySelector('.form');
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

// Close each modal windows by 'close' buttons
closeBtns.forEach(function (btn) {
  btn.addEventListener('click', function (evt) {
    closePopup(evt);
  });
});

// Set name and status from modal window to page and close modal window
formProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const inputUserName = document.querySelector('#profileName').value;
  const inputUserStatus = document.querySelector('#profileStatus').value;
  document.querySelector('.info__name').textContent = inputUserName;
  document.querySelector('.info__status').textContent = inputUserStatus;
  closePopup(evt);
});

// Adding card to list
function addCard(name, link, place) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').setAttribute('alt', name);
  cardElement.querySelector('.element__image').setAttribute('src', link);
  cardElement.querySelector('.element__title').textContent = name;
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
  const curPhoto = cardElement.querySelector('.element__image');
  curPhoto.addEventListener('click', function (evt) {
    const figTemplate = document.querySelector('#figure-template').content;
    const figElement = figTemplate.querySelector('.figure').cloneNode(true);
    figElement.querySelector('.figure__image').setAttribute('alt', name);
    figElement.querySelector('.figure__image').setAttribute('src', link);
    figElement.querySelector('.figure__caption').textContent = name;
    const popupShowPhoto = document.querySelector('#popupShowPhoto');
    // Remove previous photo
    const photoContainer = popupShowPhoto.querySelector('.popup__container');
    const prevPhoto = photoContainer.querySelector('.figure');
    if(prevPhoto) {
      prevPhoto.remove();
    }
    // Add selected photo to popup
    photoContainer.append(figElement);
    popupShowPhoto.classList.add('popup_opened');
  });
  place === 'append' ? cardsContainer.append(cardElement) : cardsContainer.prepend(cardElement);
};

// Drawing cards
function drawCards(cards) {
  cards.forEach((item) => {
    addCard(item.name, item.link, 'append');
  });
};

// Initial drawing cards
drawCards(elements);

// Open modal window (Add new card)
btnAdd.addEventListener('click', function () {
  popupNewElement.classList.add('popup_opened');
});

// Add new card and close modal window
formNewElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const elementName = document.querySelector('#elementName').value;
  const elementLink = document.querySelector('#elementLink').value;
  addCard(elementName, elementLink);
  document.querySelector('#elementName').value = '';
  document.querySelector('#elementLink').value = '';
  closePopup(evt);
});
