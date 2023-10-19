import React, { useState } from "react";

export default function Register({ onLogin }) {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(userData);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value
    });

  }

  return (
    <div className="sign">
      <h2 className="sign__title">Вход</h2>
      <form className="sign__form" name="sign-up" onSubmit={handleSubmit}>
        <input className="sign__form-input" onChange={handleChange}
          placeholder="Email"
          name="email"
          type="email"
          value={userData.email}
          required
        />
        <input className="sign__form-input" onChange={handleChange}
          placeholder="Пароль"
          name="password"
          type="password"
          value={userData.password}
          required
        />
        <button className="sign__submit-btn"
          type="submit">Войти
        </button>
      </form>
    </div>
  )
}