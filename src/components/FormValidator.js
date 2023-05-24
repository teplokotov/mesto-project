export default class FormValidator {

  constructor(settings, formSelector) {
    this._settings = settings;
    this._formElement = document.forms[formSelector];
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._btnSave = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  resetFormError() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState(this._btnSave);
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);

    if (inputElement.validity.patternMismatch) {
      this._errorElement.textContent = inputElement.dataset.errorMessage
    } else {
      this._errorElement.textContent = errorMessage;
    }

    this._errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    this._errorElement.classList.remove(this._settings.errorClass);
    this._errorElement.textContent = '';
  }

  _toggleErrorMessage(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  _toggleButtonState(buttonElement) {
    if(this._hasInvalidInput()) {
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState(this._btnSave);
        this._toggleErrorMessage(inputElement);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
