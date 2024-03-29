import { settings } from '../components/validate.js';

export const formProfile = document.forms["formEdit"];
export const formAvatar = document.forms["formEditAvatar"];
export const formNewElement = document.forms["formNewElement"];
export const formConsent = document.forms["formConsent"];
export const btnSaveProfile = formProfile.querySelector(settings.submitButtonSelector);
export const btnSaveAvatar = formAvatar.querySelector(settings.submitButtonSelector);
export const btnEdit = document.querySelector('.btn-edit');
export const btnAdd = document.querySelector('.btn-add');
export const cardsContainer = document.querySelector('.elements__list');
export const cardTemplate = document.querySelector('#card-template').content;
export const cardTemplateElement = cardTemplate.querySelector('.element');
export const figure = document.querySelector('.figure');
export const figureImage = figure.querySelector('.figure__image');
export const figureCaption = figure.querySelector('.figure__caption');
export const popupShowPhoto = document.querySelector('#popupShowPhoto');
export const userName = document.querySelector('.info__name');
export const userStatus = document.querySelector('.info__status');
export const userPhoto = document.querySelector('.avatar');
export const btnEditAvatar = document.querySelector('.profile__avatar');
export const inputUserName = document.querySelector('#profileName');
export const inputUserStatus = document.querySelector('#profileStatus');
export const inputAvatarLink = document.querySelector('#avatarLink');
export const popupEdit = document.querySelector('#popupEdit');
export const popupNewElement = document.querySelector('#popupNewElement');
export const btnSaveCard = popupNewElement.querySelector(settings.submitButtonSelector);
export const elementName = document.querySelector('#elementName');
export const elementLink = document.querySelector('#elementLink');
export const popupAvatar = document.querySelector('#popupAvatar');
export const popupConsent = document.querySelector('#popupConsent');
export const actions = {};

export function setAction(name, func) {
  actions[name] = func;
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function checkResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
}
