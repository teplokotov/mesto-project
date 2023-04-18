import elements from '../blocks/elements/elements.js';

const btnEdit = document.querySelector('.btn-edit');
const popupEdit = document.querySelector('#popupEdit');
const btnAdd = document.querySelector('.btn-add');
const popupNewElement = document.querySelector('#popupNewElement');
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
const elementName = document.querySelector('#elementName');
const elementLink = document.querySelector('#elementLink');
const popups = document.querySelectorAll('.popup');

// Opening modal window
function openPopup(item) {
  item.classList.add('popup_opened');
};

// Open modal window (Edit profile)
btnEdit.addEventListener('click', function (evt) {
  window.addEventListener('keydown', closePopupEditByEscape);
  openPopup(popupEdit);
});

function closePopupEditByEscape(evt) {
  if (evt.key === 'Escape') closePopup(popupEdit);
}

function closePopupNewElementByEscape(evt) {
  if (evt.key === 'Escape') closePopup(popupNewElement);
}

function closePopupPhotoByEscape(evt) {
  if (evt.key === 'Escape') closePopup(popupShowPhoto);
}

// Closing modal window and removing 'keydown' event listener
function closePopup(item) {
  switch (item) {
    case popupEdit:
      window.removeEventListener('keydown', closePopupEditByEscape);
      break;
    case popupNewElement:
      window.removeEventListener('keydown', closePopupNewElementByEscape);
      break;
    case popupShowPhoto:
      window.removeEventListener('keydown', closePopupPhotoByEscape);
      break;
  }
  item.classList.remove('popup_opened');
};

function hideClosestPopup(evt) {
  closePopup(evt.target.closest('.popup'));
};

// Allow to close each modal windows if click on overlay
popups.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    if (!evt.target.className.includes('form') &&
        !evt.target.className.includes('figure') ||
        evt.target.classList.contains('popup__container')) {
      hideClosestPopup(evt);
    }
  });
});

// Set name and status from modal window to page and close modal window
formProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  userName.textContent = inputUserName.value;
  userStatus.textContent = inputUserStatus.value;
  hideClosestPopup(evt);
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
    // Close popup if press 'Escape'
    window.addEventListener('keydown', closePopupPhotoByEscape);
    openPopup(popupShowPhoto);
  });
  return cardElement;
};

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
  window.addEventListener('keydown', closePopupNewElementByEscape);
  openPopup(popupNewElement);
});

// Add new card and close modal window
formNewElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addCard(elementName.value, elementLink.value);
  evt.target.reset();
  hideClosestPopup(evt);
});

// Showing error message
function showInputError (formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Decorate input field
  inputElement.classList.add(settings.inputErrorClass);
  // Show error message (custom or default)
  if (inputElement.validity.patternMismatch) {
    errorElement.textContent = inputElement.dataset.errorMessage
  } else {
    errorElement.textContent = errorMessage;
  }
  errorElement.classList.add(settings.errorClass);
};

// Hiding error message
function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Remove decoration of input field
  inputElement.classList.remove(settings.inputErrorClass);
  // Remove error message
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

// Changing visibility of error messages
function toggleErrorMessage(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

// Checking input fields for validity (includes all validity pattern)
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => !inputElement.validity.valid);
};

// Making button 'disabled' if some input field is invalid
function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.removeAttribute('disabled');
  }
};

// Setting event listeners for each input fileds of given forms
function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const btnSave = formElement.querySelector(settings.submitButtonSelector);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, btnSave);
      toggleErrorMessage(formElement, inputElement, settings);
    });
  });
};

// Enabling validation of all forms
function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach(formElement => {
    // Initial validation after loading page
    if (formElement.name === 'formEdit') {
      inputUserName.value = userName.textContent;
      inputUserStatus.value = userStatus.textContent;
    }
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const btnSave = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, btnSave);
    // Make validation after changing inputs
    setEventListeners(formElement, settings);
  });
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.btn-save',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});
