export const validationSetting = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_type_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input-error_active",
}

//Создание переменных
//ПОПАП
export const popupProfileEdit = document.querySelector(".popup_type_edit-profile");
export const popupElementAdd = document.querySelector(".popup_type_add-element");
export const popupImage = document.querySelector(".popup_type_open-image");
//КНОПКИ
export const popupProfileEditBtn = document.querySelector(".profile__edit-btn");
export const popupElementAddBtn = document.querySelector(".profile__add-btn");

// переменные профиля
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");

// Для добавления изображений
export const elementsList = document.querySelector(".elements");
export const elementTemplate = document.querySelector(".element-template").content.querySelector(".element");

// открыть картинку
export const popupOpenPhoto = document.querySelector(".popup__open-photo");
export const popupOpenText = document.querySelector(".popup__open-text");

//формы
export const formElement = document.forms['edit'];
export const formAddElement = document.forms['addcard'];

// поля ввода
export const profileNameInput = document.querySelector("#name-input");
export const profileJobInput = document.querySelector("#job-input");
export const elementNameInput = document.querySelector("#element-name");
export const elementLinkInput = document.querySelector("#element-link");

//
export const avatarPopup = document.querySelector('.popup-avatar');
export const changeAvatarButton = document.querySelector(".profile-image__change-button");