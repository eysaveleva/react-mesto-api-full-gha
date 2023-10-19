import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const currentAvatar = useRef();

  useEffect(() => {
    currentAvatar.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar({
      link: currentAvatar.current.value
    });
  };

  return (
    <PopupWithForm
      name='popupAvatar'
      title='Обновить аватар'
      titleBtn='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClose={props.onOverlayClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={currentAvatar}
        id="link-avatar-input"
        className="popup__input"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required
      />
      <span className="link-avatar-input-error popup__input-error"></span>
    </PopupWithForm>
  )
}