export const settings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.btn-save',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

// Clear error messages and toggle state of submit button
export function resetFormError(popup, inputs, btn, settings) {
  inputs.forEach(input => hideInputError(popup, input, settings));
  toggleButtonState(inputs, btn);
}

// Showing error message
export function showInputError (formElement, inputElement, errorMessage, settings) {
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
export function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Remove decoration of input field
  inputElement.classList.remove(settings.inputErrorClass);
  // Remove error message
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

// Changing visibility of error messages
export function toggleErrorMessage(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

// Checking input fields for validity (includes all validity pattern)
export function hasInvalidInput(inputList) {
  return inputList.some(inputElement => !inputElement.validity.valid);
};

// Making button 'disabled' if some input field is invalid
export function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.removeAttribute('disabled');
  }
};

// Setting event listeners for each input fileds of given forms
export function setEventListeners(formElement, settings) {
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
export function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, settings);
  });
};
