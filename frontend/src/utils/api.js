class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._cardsUrl = `${this._baseUrl}/cards`;
  }

  _checkResponse(res) {
    if (res.ok) {
      return Promise.resolve(res.json());
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }


  getUserData() {
    return this._request(this._userUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
  }

  saveUserChanges(name, about) {
    return this._request(this._userUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
  }

  changedAvatar({ link }) {
    return this._request(`${this._userUrl}/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({ avatar: link })
    })
  }


  getInitialCards() {
    return this._request(this._cardsUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
  }

  postNewCard(card) {
    console.log(card);
    return this._request(this._cardsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(card)
    })
  }

  removeCard(cardId) {
    return this._request(`${this._cardsUrl}/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
  }

  likedCard(cardId) {
    return this._request(`${this._cardsUrl}/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
  }

  dislikedCard(cardId) {
    return this._request(`${this._cardsUrl}/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
  }

}

const api = new Api({
  baseUrl: 'https://api.mesto77.nomoredomainsrocks.ru', // 'http://localhost:3000',
  /* headers: {
    authorization: '70b5a854-9915-4cad-abf7-c60ff6335d2e',
    'Content-Type': 'application/json'
  } */
});

export default api;
