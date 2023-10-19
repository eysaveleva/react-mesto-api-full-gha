import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Card(props) {//{ card, onCardClick, onCardDeleteClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like-btn ${isLiked && 'element__like-btn_active'}`
  );

  function handleLikeClick() {
    props.onCardLike(props.card);
  };

  function handleDeleteClick() {
    props.onCardDeleteClick(props.card);
  };

  return (
    <div className="element">
      {isOwn &&
        <button className="element__delete"
          type="button"
          aria-label="удалить"
          onClick={handleDeleteClick} />
      }
      <div className="element__image"
        style={{ backgroundImage: `url(${props.card.link})` }}
        onClick={() => props.onCardClick({ link: props.card.link, name: props.card.name })}
      />
      <div className="element__title">
        <h2 className="element__text">{props.card.name}</h2>
        <div className="element__like-block">
          <button type="button" className={cardLikeButtonClassName} title="like" onClick={handleLikeClick}></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}