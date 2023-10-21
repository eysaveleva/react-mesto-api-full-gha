import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import * as auth from '../utils/auth.js';
import ConfirmDeletePopup from "./ConfirmDeletePopup.js";

import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute.js";


function App() {
  //попап
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setImagePopup] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [statusReg, setStatusReg] = useState(false);
  const [isRegStatusPopupOpen, setRegStatusPopupOpen] = useState(false);
  const [email, setEmail] = useState('');

  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
      if (token) {
      auth.checkToken(token)
        .then(res => {
          if (res) {
            setEmail(res.email);
            handleLoggedIn(true);
            navigate('/');
          }
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    }
  }, [navigate]);

  function handleRegister(data) {
    auth.registration(data)
      .then(() => {
        handleInfoTooltip(true);
        navigate('/sign-in')
      })
      .catch(err => {
        console.log(err);
        handleInfoTooltip(false);
      })
  }

  function handleLogin(data) {
    auth.login(data)
      .then((res) => {
        if (res.token) {
          handleLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          setEmail(data.email);
          navigate('/');
        }
      })
      .catch((err) => {
        handleInfoTooltip(false);
        console.log({ err });
      })
  }

  function handleLoggedIn(status) {
    setLoggedIn(status);
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail('');
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setImagePopup(false);
    setRegStatusPopupOpen(false);
  };

  function handleOverlayClose(event) {
    if (event.target.classList.contains("popup")) closeAllPopups();
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleUpdateAvatar(dataAvatar) {
    api.changedAvatar(dataAvatar)
      .then((data) => {
        setCurrentUser(data);
        console.log(data);
        closeAllPopups();
      })
      .catch(console.error);
  };


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleUpdateUser({ name, about }) {
    api.saveUserChanges(name, about)
      .then((data) => {
        console.log(data);
        setCurrentUser({ ...currentUser, name: data.name,about: data.about});
        closeAllPopups();
      })
      .catch(console.error);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      api.dislikedCard(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      api.likedCard(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function handleDeletePopupClick(card) {
    setIsConfirmDeletePopupOpen({ ...isConfirmDeletePopupOpen, isOpen: true, card: card });
  };

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        setCards(state => state.filter(item => item._id !== card._id));
        closeAllPopups();
      })
      .catch(console.error);
  };

  function handleAddPlaceSubmit(data) {
    api.postNewCard(data)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  };

  function handleInfoTooltip(status) {
    setRegStatusPopupOpen(true);
    setStatusReg(status);
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);
          console.log(initialCards);
          setCards(initialCards);
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={handleSignOut} />
        <Routes>
          <Route path="/" element={<ProtectedRoute
            element={Main}
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardDeleteClick={handleDeletePopupClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
        </Routes>
        <Footer />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClose}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onOverlayClose={handleOverlayClose}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onOverlayClose={handleOverlayClose}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onOverlayClose={handleOverlayClose}
        />
        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          onOverlayClose={handleOverlayClose}
          onCardDeleteClick={handleDeletePopupClick}
        />
        <InfoTooltip
          isOpen={isRegStatusPopupOpen}
          onClose={closeAllPopups}
          status={statusReg}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
