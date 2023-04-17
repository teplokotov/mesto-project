import elements from '../blocks/elements/elements.js';

const btnEdit = document.querySelector('.btn-edit');
const popupEdit = document.querySelector('#popupEdit');
const btnAdd = document.querySelector('.btn-add');
const popupNewElement = document.querySelector('#popupNewElement');
//const closeBtns = document.querySelectorAll('.btn-close');
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
const formList = Array.from(document.querySelectorAll('.form'));
const popups = document.querySelectorAll('.popup');

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

function hideClosestPopup(evt) {
  closePopup(evt.target.closest('.popup'));
};

// Close each modal windows by 'close' buttons
// closeBtns.forEach(function (btn) {
//   const popup = btn.closest('.popup');
//   btn.addEventListener('click', function (evt) {
//     closePopup(popup);
//   });
// });

popups.forEach(function (popup) {
  //const popup = btn.closest('.popup');
  popup.addEventListener('click', function (evt) {
    if (!evt.target.className.includes('form')) {
      evt.target.closest('.popup').classList.remove('popup_opened');
    }
    //closePopup(evt);
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
function showInputError (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Decorate input field
  inputElement.classList.add('form__input_type_error');
  // Show error message (custom or default)
  if (inputElement.validity.patternMismatch) {
    errorElement.textContent = inputElement.dataset.errorMessage
  } else {
    errorElement.textContent = errorMessage;
  }
  errorElement.classList.add('form__input-error_active');
};

// Hiding error message
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Remove decoration of input field
  inputElement.classList.remove('form__input_type_error');
  // Remove error message
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

// Changing visibility of error messages
function toggleErrorMessage(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Checking input fields for validity (includes all validity pattern)
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Making button 'disabled' if some input field is invalid
function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.removeAttribute('disabled', 'disabled');
  }
};

// Setting event listeners for each input fileds of given fieldsetList
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const btnSave = formElement.querySelector('.btn-save');
  // Initial check for 'New place' form
  if (formElement.parentElement.name === 'formNewElement') toggleButtonState(inputList, btnSave);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, btnSave);
      toggleErrorMessage(formElement, inputElement);
    });
  });
};

// Enabling validation
function enableValidation() {
  formList.forEach((formElement) => {
    // Disable default error message style for all forms
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    // Add setEventListeners() for each fieldsets of all forms
    const fieldsetList = Array.from(formElement.querySelectorAll('.form__fieldset'));
    fieldsetList.forEach(fieldset => {
      setEventListeners(fieldset);
    });
  });
};

enableValidation();
