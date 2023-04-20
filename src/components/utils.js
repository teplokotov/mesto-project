import { settings } from '../components/validate.js';

export const formProfile = document.forms["formEdit"];
export const formNewElement = document.forms["formNewElement"];
export const btnSaveProfile = formProfile.querySelector(settings.submitButtonSelector);
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
export const userPhoto = document.querySelector('.profile__avatar');
export const inputUserName = document.querySelector('#profileName');
export const inputUserStatus = document.querySelector('#profileStatus');
export const popupEdit = document.querySelector('#popupEdit');
export const popupNewElement = document.querySelector('#popupNewElement');
export const btnSaveCard = popupNewElement.querySelector(settings.submitButtonSelector);
export const elementName = document.querySelector('#elementName');
export const elementLink = document.querySelector('#elementLink');
