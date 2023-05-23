// Config for API
export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
  headers: {
    authorization: 'f5b55768-3b69-4e12-a737-dd1f60f911ee',
    'Content-Type': 'application/json'
  }
}

// Selectors for forms
export const settings = {                 // ToDo [teplokotov] Rename after refactor
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.btn-save',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

export const btnEdit = document.querySelector('.btn-edit');
export const btnAdd = document.querySelector('.btn-add');

export function setAction(name, func) {
  actions[name] = func;
}
