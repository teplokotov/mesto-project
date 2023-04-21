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
          elementLink,
          btnEditAvatar,
          btnSaveAvatar,
          inputAvatarLink,
          formAvatar
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
          setPhoto,
          setAvatar
        } from '../components/api.js'

// Get user data from server and update information on page
getUserData()
  .then(result => {
    // Draw profile information
    drawUser(result);
    // Get user id
    const user_id = result._id;
    // Initial drawing cards
    getInitialCards()
      .then(result => drawCards(result, user_id))
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));

// Insert profile information to the page
function drawUser(data) {
  userName.textContent = data.name;
  userStatus.textContent = data.about;
  userPhoto.setAttribute('src', data.avatar);
  userPhoto.setAttribute('alt', data.name);
}

// Open modal window (Edit profile)
btnEdit.addEventListener('click', handleClickBtnEdit);

// Set name and status from modal window to page and close modal window
formProfile.addEventListener('submit', handleSubmitFormProfile);

// Add new card and close modal window
formNewElement.addEventListener('submit', handleSubmitFormNewElement);

// Add avatar and close modal window
formAvatar.addEventListener('submit', handleSubmitFormAvatar);

// Allow to close each modal windows if click on overlay
setEventListenersOnPopups();

// Open modal window (Add new card)
btnAdd.addEventListener('click', handleClickBtnAdd);

// Open modal window (Change avatar)
btnEditAvatar.addEventListener('click', handleClickBtnEditAvatar);

// Enabling validation of all forms
enableValidation(settings);

// Adding card to list
function addCard(name, link, likes, owner_id, user_id, card_id, place) {
  const cardElement = createCard(name, link, likes, owner_id, user_id, card_id);
  place === 'append' ? cardsContainer.append(cardElement) : cardsContainer.prepend(cardElement);
};

// Drawing cards
function drawCards(cards, user_id) {
  cards.forEach((item) => {
    addCard(item.name, item.link, item.likes, item.owner._id, user_id, item._id, 'append');
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
    .then(res => addCard(res.name, res.link, res.likes))
    .catch(err => console.log(err))
    .finally(() => renderSaving(false, evt.target.querySelector('.form__button')));
  evt.target.reset();
  hideClosestPopup(evt);
}

function handleClickBtnEditAvatar() {
  formAvatar.reset();
  resetFormError(popupAvatar, [inputAvatarLink], btnSaveAvatar, settings);
  window.addEventListener('keydown', closePopupByEscape);
  openPopup(popupAvatar);
}

function handleSubmitFormAvatar(evt) {
  evt.preventDefault();
  renderSaving(true, evt.target.querySelector('.form__button'));
  setAvatar(inputAvatarLink.value)
    .then(res => userPhoto.setAttribute('src', res.avatar))
    .catch(err => console.log(err))
    .finally(() => renderSaving(false, evt.target.querySelector('.form__button')));
  evt.target.reset();
  hideClosestPopup(evt);
}
