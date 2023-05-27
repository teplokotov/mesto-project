// Config for API
export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
  headers: {
    authorization: 'f5b55768-3b69-4e12-a737-dd1f60f911ee',
    'Content-Type': 'application/json'
  }
}

// Selectors for forms
export const settings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.btn-save',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

export const btnEdit = document.querySelector('.btn-edit');
export const btnAdd = document.querySelector('.btn-add');
export const btnEditAvatar = document.querySelector('.profile__avatar');
export const inputUserName = document.querySelector('#profileName');
export const inputUserStatus = document.querySelector('#profileStatus');
export const inputAvatarLink = document.querySelector('#avatarLink');
export const elementName = document.querySelector('#elementName');
export const elementLink = document.querySelector('#elementLink');
export const actions = {};
