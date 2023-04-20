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
import {  getUserData,
          setUserData,
          getInitialCards,
          setPhoto
        } from '../components/api.js'

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

// Displaying loading text
function renderSaving(isSaving, btn) {
  if (isSaving) {
    if (!btn.classList.contains('btn-create')) {
      btn.textContent = 'Сохранение...';
    } else {
      btn.textContent = 'Создание...';
    }
  } else {
    if (!btn.classList.contains('btn-create')) {
      btn.textContent = 'Сохранить';
    } else {
      btn.textContent = 'Создать';
    }
  }
}

function handleClickBtnEdit(evt) {
  inputUserName.value = userName.textContent;
  inputUserStatus.value = userStatus.textContent;
  resetFormError(popupEdit, [inputUserName, inputUserStatus], btnSaveProfile, settings);
  openPopup(popupEdit);
}

function handleSubmitFormProfile(evt) {
  evt.preventDefault();
  renderSaving(true, evt.target.querySelector('.form__button'));
  setUserData(inputUserName.value, inputUserStatus.value)
    .then(res => {
        userName.textContent = res.name;
        userStatus.textContent = res.about;
    })
    .catch(err => console.log(err))
    .finally(() => renderSaving(false, evt.target.querySelector('.form__button')));
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
  renderSaving(true, evt.target.querySelector('.form__button'));
  setPhoto(elementName.value, elementLink.value)
    .then(res => addCard(res.name, res.link))
    .catch(err => console.log(err))
    .finally(() => renderSaving(false, evt.target.querySelector('.form__button')));
  evt.target.reset();
  hideClosestPopup(evt);
}
