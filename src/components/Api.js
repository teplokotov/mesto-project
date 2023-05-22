export default class Api {

  constructor(config) {
    this._config = config;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getInitialCards() {
    return this._request(`${this._config.baseUrl}/cards`, {headers: this._config.headers});
  }

  getUserData() {
    return this._request(`${this._config.baseUrl}/users/me`, {headers: this._config.headers});
  }

  setUserData(name, status) {
    return this._request(`${this._config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._config.headers,
      body: JSON.stringify({'name': name, 'about': status})
    });
  }

  setPhoto(name, link) {
    return this._request(`${this._config.baseUrl}/cards`, {
      method: 'POST',
      headers: this._config.headers,
      body: JSON.stringify({'name': name, 'link': link})
    })
    .then(res => {
      return res.owner._id ? res : Promise.reject('Ошибка: Не найден ID пользователя');
    });
  }

  deleteCard(card_id) {
    return this._request(`${this._config.baseUrl}/cards/${card_id}`, {
      method: 'DELETE',
      headers: this._config.headers
    });
  }

  toggleLike(card_id, action) {
    return this._request(`${config.baseUrl}/cards/likes/${card_id}`, {
      method: action,
      headers: this._config.headers
    });
  }

  setAvatar(link) {
    return this._request(`${this._config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._config.headers,
      body: JSON.stringify({'avatar': link})
    });
  }
}
