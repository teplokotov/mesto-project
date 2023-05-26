// Styles
import '../pages/index.css';

// Constants
import {  config,
          btnEdit,
          btnAdd,
          btnEditAvatar,
          settings,
          inputUserName,
          inputUserStatus,
          inputAvatarLink,
          elementLink,
          elementName,
          actions,
        } from '../utils/constants.js';

// Utils
import { setAction } from '../utils/utils.js';

// Classes
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

// Instances of classes
const api = new Api(config);
const userInfo = new UserInfo({
  selectorUserName: '.info__name',
  selectorUserStatus: '.info__status',
  selectorUserPhoto: '.avatar'
});
const newElementValidator = new FormValidator(settings, 'formNewElement');
const formAvatarValidator = new FormValidator(settings, 'formEditAvatar');
const formProfileValidator = new FormValidator(settings, 'formEdit');

newElementValidator.enableValidation();
formAvatarValidator.enableValidation();
formProfileValidator.enableValidation();

const popupShowPhoto = new PopupWithImage('#popupShowPhoto');
const popupConsent = new PopupWithForm('#popupConsent', handleSubmitFormConsent);
const popupNewElement = new PopupWithForm('#popupNewElement', handleSubmitFormNewElement);
const popupEdit = new PopupWithForm('#popupEdit', handleSubmitFormEdit);
const popupAvatar = new PopupWithForm('#popupAvatar', handleSubmitFormAvatar);

popupShowPhoto.setEventListeners();
popupConsent.setEventListeners();
popupNewElement.setEventListeners();
popupEdit.setEventListeners();
popupAvatar.setEventListeners();

let section;

// Get user data from server and update information on page
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cards]) => {
    // Draw profile information
    userInfo.setUserInfo(userData);
    // Initial drawing cards
    section = new Section({
      items: cards,
      renderer: (data) => {
        const itemElement = createCard(data, userData._id);
        section.addItem(itemElement, 'append');
      }
    }, '.elements__list');
    section.drawItems();
  })
  .catch(err => console.log(err));

function createCard(data, userId) {
  const card = new Card(data, '#card-template', userId, {
    handlebtnLikeClick,
    handlebtnTrashClick,
    handleImageClick
  });
  return card.draw();
};

// Open modal window (Edit profile)
btnEdit.addEventListener('click', handleClickBtnEdit);

// Open modal window (Add new card)
btnAdd.addEventListener('click', handleClickBtnAdd);

// Open modal window (Change avatar)
btnEditAvatar.addEventListener('click', handleClickBtnEditAvatar);

function handlebtnLikeClick(btnLike, cardElementCounter, cardId) {
  const action = this.isLiked() ? 'DELETE' : 'PUT';
  // Change counter and toggle 'like' button after get response
  api.toggleLike(cardId, action)
    .then(res => this.toggleLike(res))
    .catch(err => console.log(err));
};

function handlebtnTrashClick(evt, cardId) {
  popupConsent.renderSaving(false);
  popupConsent.open();
  // Create function for delete card after consent
  setAction('findAndRemoveCard', () => {
    api.deleteCard(cardId)
      .then(() => {
        evt.target.closest('.element').remove();
        popupConsent.close();
      })
      .catch(err => console.log(err));
  });
};

function handleImageClick(name, link) {
  popupShowPhoto.open({ name, link });
}

function handleClickBtnAdd() {
  newElementValidator.resetFormError();
  popupNewElement.open()
}

function handleClickBtnEdit() {
  formProfileValidator.resetFormError();
  popupEdit.setInputValues(userInfo.getUserInfo());
  popupEdit.open();
}

function handleClickBtnEditAvatar() {
  formAvatarValidator.resetFormError();
  popupAvatar.open();
}

function handleSubmitFormConsent(evt) {
  evt.preventDefault();
  popupConsent.renderSaving(true);
  actions.findAndRemoveCard();
}

function handleSubmitFormNewElement(evt) {
  evt.preventDefault();
  popupNewElement.renderSaving(true);

  api.setPhoto(elementName.value, elementLink.value)
  .then(res => {
    const itemElement = createCard(res, res.owner._id);
    section.addItem(itemElement, 'prepend');
    popupNewElement.close();
  })
  .catch(err => console.log(err))
  .finally(() => {popupNewElement.renderSaving(false)});
}

function handleSubmitFormEdit(evt) {
  evt.preventDefault();
  popupEdit.renderSaving(true);

  api.setUserData(inputUserName.value, inputUserStatus.value)
  .then(res => {
      userInfo.setUserInfo(res);
      popupEdit.close();
  })
  .catch(err => console.log(err))
  .finally(() => popupEdit.renderSaving(false));
}

function handleSubmitFormAvatar(evt) {
  evt.preventDefault();
  popupAvatar.renderSaving(true);

  api.setAvatar(inputAvatarLink.value)
  .then(res => {
    userInfo.setUserInfo(res);
    popupAvatar.close();
  })
  .catch(err => console.log(err))
  .finally(() => popupAvatar.renderSaving(false))
}
