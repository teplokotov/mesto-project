import {  request  } from '../components/utils.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
  headers: {
    authorization: 'f5b55768-3b69-4e12-a737-dd1f60f911ee',
    'Content-Type': 'application/json'
  }
}

export function getInitialCards() {
  return request(`${config.baseUrl}/cards`, {headers: config.headers});
}

export function getUserData() {
  return request(`${config.baseUrl}/users/me`, {headers: config.headers});
}

export function setUserData(name, status) {
  return request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({'name': name, 'about': status})
  });
}

export function setPhoto(name, link) {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({'name': name, 'link': link})
  })
  .then(res => {
    return res.owner._id ? res : Promise.reject('Ошибка: Не найден ID пользователя');
  });
}

export function deleteCard(card_id) {
  return request(`${config.baseUrl}/cards/${card_id}`, {
    method: 'DELETE',
    headers: config.headers
  });
}

export function toggleLike(card_id, action) {
  return request(`${config.baseUrl}/cards/likes/${card_id}`, {
    method: action,
    headers: config.headers
  });
}

export function setAvatar(link) {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({'avatar': link})
  });
}
