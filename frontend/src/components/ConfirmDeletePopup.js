import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeletePopup(props) {
  function handleSubmit(event) {
    event.preventDefault();
    props.onCardDelete(props.isOpen.card);
  }

  return (
    <PopupWithForm
      name='confirm'
      title='Вы уверены?'
      titleBtn='Да'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClose={props.onOverlayClose}
      onSubmit={handleSubmit}>
    </PopupWithForm>
  )
}