export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    console.log(res);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _fetch(path, method, data) {
    let body = data;
    if (method === 'PATCH' && data) {
      body = JSON.stringify(data);
    }

    return fetch(this._url + path, {
      method,
      headers: this._headers,
      body,
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  getUserInfo() {
    return this._fetch('/users/me', 'GET');
  }

  setUserInfo(data) {
    return this._fetch('/users/me', 'PATCH', data);
  }

  addNewCard(data) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  getInitialCards() {
    return this._fetch('/cards', 'GET');
  }

  likeCard(id) {
    return this._fetch(`/cards/likes/${id}`, 'PUT');
  }
  //а он вообще нужен? куда его прикрутить?
  dislikeCard(id) {
    return this._fetch(`/cards/likes/${id}`, 'DELETE');
  }

  deleteCard(id) {
    return this._fetch(`/cards/${id}`, 'DELETE');
  }

  handleUserAvatar(data) {
    return fetch(this._url + `/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.userAvatar,
      }),
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  getAllData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
}

export const api = new Api({
  url: `https://mesto.nomoreparties.co/v1/cohort-63`,
  headers: {
    authorization: 'e2050b48-b9af-478f-bd01-da5552cfcb90',
    'Content-Type': 'application/json',
  },
});
