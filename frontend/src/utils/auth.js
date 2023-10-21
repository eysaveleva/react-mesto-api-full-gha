export const BASE_URL = 'https://api.mesto77.nomoredomainsrocks.ru';
const checkServerResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const registration = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
       credentials: 'include',
    },
    body: JSON.stringify({ password, email })
  })
  .then(checkServerResponse)
};

export const login = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        credentials: 'include',
      },
      body: JSON.stringify({ password, email })
  })
  .then(checkServerResponse)
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
       credentials: 'include',
      
    }
  })
  .then(checkServerResponse)
}
