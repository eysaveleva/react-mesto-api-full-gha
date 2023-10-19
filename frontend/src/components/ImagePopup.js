import React from "react";

export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_open-image ${isOpen ? 'popup_opened' : false}`} onClick={onClose} >
      <div className="popup__container-open">
        <img className="popup__open-photo"
          src={card.link}
          alt={`Картинка - ${card.name}`} />
        <p className="popup__open-text">{card.name}</p>
        <button className="popup__close-btn" type="button" aria-label="Закрыть" onClick={onClose} />
      </div>
    </div>
  );
}

