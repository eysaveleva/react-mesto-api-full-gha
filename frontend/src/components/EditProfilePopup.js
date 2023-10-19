import React, { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";


export default function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleChangeName(event) {
    setName(event.target.value);
  };

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  };

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      isOpen={props.isOpen}
      titleBtn='Сохранить'
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onOverlayClose={props.onOverlayClose}>
      <input
        id="name-input"
        className="popup__input"
        type="text"
        placeholder="Имя"
        name="newName"
        minLength="2"
        maxLength="40"
        required
        value={name || ''}
        onChange={handleChangeName}
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        id="job-input"
        className="popup__input"
        type="text"
        placeholder="О себе"
        name="about"
        minLength="2"
        maxLength="200"
        required
        value={description || ''}
        onChange={handleChangeDescription}
      />
      <span className="popup__input-error job-input-error"></span>
    </PopupWithForm>
  )
}