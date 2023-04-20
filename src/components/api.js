const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
  headers: {
    authorization: 'f5b55768-3b69-4e12-a737-dd1f60f911ee',
    'Content-Type': 'application/json'
  }
}

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {headers: config.headers})
    .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function getUserData() {
  return fetch(`${config.baseUrl}/users/me`, {headers: config.headers})
    .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function setUserData(name, status) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({'name': name, 'about': status})
  })
  .then(res => {
    if (res.ok) return true;
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}