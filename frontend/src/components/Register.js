import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(userData);
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
      <h2 className="sign__title">Регистрация</h2>
      <form className="sign__form" name="sign-up" onSubmit={handleSubmit}>
        <input className="sign__form-input" onChange={handleChange}
          placeholder="Email"
          value={userData.email}
          name="email"
          id="email"
          type="email"
          required
        />
        <input className="sign__form-input" onChange={handleChange}
          placeholder="Пароль"
          value={userData.password}
          name="password"
          id="password"
          type="password"
          required
        />
        <button className="sign__submit-btn"
          type="submit">Зарегистрироваться</button>
      </form>
      <div className="sign__reg">
        <p className="sign__reg-text">Уже зарегистрированы? </p>
        <Link className="sign__reg-link" to="/sign-in">Войти</Link>
      </div>
    </div>
  )
}