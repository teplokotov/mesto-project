// Styles
import '../pages/index.css';

// Initial cards
import elements from '../blocks/elements/elements.js';

// Modules
import {  formProfile,
          formNewElement,
          btnEdit,
          btnAdd,
          cardsContainer,
          btnSaveProfile,
          userName,
          userStatus,
          userPhoto,
          inputUserName,
          inputUserStatus,
          btnSaveCard,
          elementName,
          elementLink
        } from '../components/utils.js';
import {  settings,
          resetFormError,
          enableValidation
        } from '../components/validate.js';
import {  createCard } from '../components/card.js';
import {  setEventListenersOnPopups,
          closePopupByEscape,
          openPopup,
          hideClosestPopup
        } from '../components/modal.js';
import { getUserData, setUserData, getInitialCards } from '../components/api.js'

// Initial drawing cards
getInitialCards()
  .then(result => drawCards(result))
  .catch(err => console.log(err));

// Get user data from server and update information on page
getUserData()
  .then(result => drawUser(result))
  .catch(err => console.log(err));

// Insert profile information to the page
function drawUser(data) {
  userName.textContent = data.name;
  userStatus.textContent = data.about;
  userPhoto.setAttribute('src', data.avatar);
}

// Open modal window (Edit profile)
btnEdit.addEventListener('click', handleClickBtnEdit);

// Set name and status from modal window to page and close modal window
formProfile.addEventListener('submit', handleSubmitFormProfile);

// Add new card and close modal window
formNewElement.addEventListener('submit', handleSubmitFormNewElement);

// Allow to close each modal windows if click on overlay
setEventListenersOnPopups();

// Initial drawing cards
//drawCards(elements);

// Open modal window (Add new card)
btnAdd.addEventListener('click', handleClickBtnAdd);

// Enabling validation of all forms
enableValidation(settings);

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

function handleClickBtnEdit(evt) {
  inputUserName.value = userName.textContent;
  inputUserStatus.value = userStatus.textContent;
  resetFormError(popupEdit, [inputUserName, inputUserStatus], btnSaveProfile, settings);
  openPopup(popupEdit);
}

function handleSubmitFormProfile(evt) {
  evt.preventDefault();
  setUserData(inputUserName.value, inputUserStatus.value)
    .then(() => {
        userName.textContent = inputUserName.value;
        userStatus.textContent = inputUserStatus.value;
    })
    .catch(err => console.log(err));
  hideClosestPopup(evt);
}

function handleClickBtnAdd() {
  formNewElement.reset();
  resetFormError(popupNewElement, [elementName, elementLink], btnSaveCard, settings);
  window.addEventListener('keydown', closePopupByEscape);
  openPopup(popupNewElement);
}

function handleSubmitFormNewElement(evt) {
  evt.preventDefault();
  addCard(elementName.value, elementLink.value);
  evt.target.reset();
  hideClosestPopup(evt);
}
