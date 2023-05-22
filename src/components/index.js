// Styles
import '../pages/index.css';

// Utils (Constants, Settings...)
import { config } from '../components/utils.js';

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
        const itemElement = Card.create(data);
        section.addItem(itemElement, 'append');
      }
    }, '.elements__list');
    section.drawItems(); // ToDo: [teplokotov] Check how to transfer userId
  })
  .catch(err => console.log(err));
