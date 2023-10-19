import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleAddLink(event) {
    setLink(event.target.value);
  };

  function handleAddName(event) {
    setName(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace({ name, link });
  };

  useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name='addcard'
      title='Новое место'
      isOpen={props.isOpen}
      titleBtn='Создать'
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input
        id="element-name"
        className="popup__input"
        type="text"
        placeholder="Название"
        name="name"
        minLength="2"
        maxLength="30"
        onChange={handleAddName}
        value={name}
        required
      />
      <span className="popup__input-error element-name-error"></span>
      <input
        id="element-link"
        className="popup__input"
        type="url"
        placeholder="Ссылка на изображение"
        name="link"
        onChange={handleAddLink}
        value={link}
        required
      />
      <span className="popup__input-error element-link-error"></span>
    </PopupWithForm>
  )
}