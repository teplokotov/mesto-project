// Styles
import '../pages/index.css';

// Utils (Constants, Settings...)
import { config, setAction, btnEdit, btnAdd, settings } from '../components/utils.js';

// Classes of teplokotov:
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

// Classes of inkxivv:
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

const api = new Api(config);
const userInfo = new UserInfo({
  selectorUserName: '.info__name',
  selectorUserStatus: '.info__status',
  selectorUserPhoto: '.avatar'
});
const newElementValidator = new FormValidator(settings, 'formNewElement');
const formAvatarValidator = new FormValidator(settings, 'formAvatar');
const formProfileValidator = new FormValidator(settings, 'formProfile');

// [Важно!] (можно свернуть)
// Все экземпляры классов создаются только в файле index.js
// В конструкторе классов не содержится вызов различных методов — только объявление полей и привязка контекста выполнения методов класса.
// Описание классов:
// https://practicum.yandex.ru/learn/web-plus/courses/5fdf60f9-19c5-4c92-acb4-de8a5178d826/sprints/37311/topics/b968bfe5-3f2c-4b4a-a7df-b7f605f3d025/lessons/a81663db-9032-49a7-93d6-6ea73f49b5e7/
// Чек-лист:
// https://code.s3.yandex.net/web-developer/checklists-pdf/web-plus/checklist-10.pdf

// Get user data from server and update information on page
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cards]) => {
    // Draw profile information
    userInfo.setUserInfo(userData);
    // Initial drawing cards
    const section = new Section({
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

function handlebtnLikeClick(btnLike, cardElementCounter, cardId) {
  let action = btnLike.classList.contains('btn-like_liked') ? 'DELETE' : 'PUT';
  // Change counter and toggle 'like' button after get response
  api.toggleLike(cardId, action)
    .then(res => {
      cardElementCounter.textContent = res.likes.length > 0 ? res.likes.length : '';
      btnLike.classList.toggle('btn-like_liked');
    })
    .catch(err => console.log(err));
};

function handlebtnTrashClick(evt) {
  openPopup(popupConsent);              // ToDo [inkxivv]
  // Create function for delete card after consent
  setAction('findAndRemoveCard', () => {
    api.deleteCard(card_id)
      .then(() => {
        evt.target.closest('.element').remove();
        closePopup(popupConsent);       // ToDo [inkxivv]
      })
      .catch(err => console.log(err));
  });
};

const popupShowPhoto = new PopupWithImage('#popupShowPhoto');
popupShowPhoto.setEventListeners();

function handleImageClick(name, link) {
  popupShowPhoto.open({name, link});
}

// Open modal window (Edit profile)
btnEdit.addEventListener('click', handleClickBtnEdit);

// Open modal window (Add new card)
btnAdd.addEventListener('click', handleClickBtnAdd);

function handleClickBtnAdd() {
  newElementValidator.resetFormFields();  // ToDo [inkxivv]
  newElementValidator.resetFormErrors();  // ToDo [inkxivv]
  openPopup(popupNewElement);             // ToDo [inkxivv]
}

function handleClickBtnEdit() {
  //inputUserName.value = userName.textContent;         // ToDo [inkxivv] Replace as method of popup class
  //inputUserStatus.value = userStatus.textContent;     // ToDo [inkxivv] Replace as method of popup class
  formProfileValidator.resetFormError();                // ToDo [inkxivv]
  openPopup(popupEdit);                                 // ToDo [inkxivv]
}


