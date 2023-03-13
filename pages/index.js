import elements from '../blocks/elements/elements.js';

const btnEdit = document.querySelector('.btn-edit');
const popupEdit = document.querySelector('#popupEdit');
const btnAdd = document.querySelector('.btn-add');
const popupNewElement = document.querySelector('#popupNewElement');
const closeBtns = document.querySelectorAll('.btn-close');
const formProfile = document.forms["formEdit"];
const formNewElement = document.forms["formNewElement"];
const cardsContainer = document.querySelector('.elements__list');
const userName = document.querySelector('.info__name');
const userStatus = document.querySelector('.info__status');
const inputUserName = document.querySelector('#profileName');
const inputUserStatus = document.querySelector('#profileStatus');
const cardTemplate = document.querySelector('#card-template').content;
const cardTemplateElement = cardTemplate.querySelector('.element');
const figure = document.querySelector('.figure');
const figureImage = figure.querySelector('.figure__image');
const figureCaption = figure.querySelector('.figure__caption');
const popupShowPhoto = document.querySelector('#popupShowPhoto');
const photoContainer = popupShowPhoto.querySelector('.popup__container');
const prevPhoto = photoContainer.querySelector('.figure');
const elementName = document.querySelector('#elementName');
const elementLink = document.querySelector('#elementLink');

// Opening modal window
function openPopup(item) {
  item.classList.add('popup_opened');
};

// Open modal window (Edit profile)
btnEdit.addEventListener('click', function (evt) {
  inputUserName.value = userName.textContent;
  inputUserStatus.value = userStatus.textContent;
  openPopup(popupEdit);
});

// Closing modal window
function closePopup(item) {
  item.classList.remove('popup_opened');
};

// Close each modal windows by 'close' buttons
closeBtns.forEach(function (btn) {
  btn.addEventListener('click', function (evt) {
    closePopup(evt.target.closest('.popup'));
  });
});

// Set name and status from modal window to page and close modal window
formProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  userName.textContent = inputUserName.value;
  userStatus.textContent = inputUserStatus.value;
  closePopup(evt.target.closest('.popup'));
});

// Creating card
function createCard(name, link) {
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
    // Remove previous photo
    if(prevPhoto) {
      prevPhoto.remove();
    }
    // Add selected photo to popup
    photoContainer.append(figure);
    openPopup(popupShowPhoto);
  });
  return cardElement;
}

// Adding card to list
function addCard(name, link, place) {
  const cardElement = createCard(name, link);
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
  openPopup(popupNewElement);
});

// Add new card and close modal window
formNewElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addCard(elementName.value, elementLink.value);
  evt.target.reset();
  closePopup(evt.target.closest('.popup'));
});
