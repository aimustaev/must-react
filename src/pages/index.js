// fetch('https://mesto.nomoreparties.co/v1/cohort-63/cards', {
//   headers: {
//     authorization: 'e2050b48-b9af-478f-bd01-da5552cfcb90',
//   },
// })
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//   });

// fetch('https://nomoreparties.co/v1/cohort-63/users/me ', {
//   headers: {
//     authorization: 'e2050b48-b9af-478f-bd01-da5552cfcb90',
//   },
// })
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//   });

import {
  FormValidator,
  validationConfig,
  Card,
  initialCards,
  Section,
  PopupWithImage,
  UserInfo,
  PopupWithForm,
} from '../components';
import './index.css';
import Api from '../components/api/Api';

const editProfileButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__change-button');
//* Переменные попапа для редактирования профиля
const formElementEdit = document.querySelector('.popup__container_type_edit');
const formElementAvatar = document.querySelector('.popup__container_type_avatar');
const nameInput = formElementEdit.querySelector('.popup__input_data_name');
const aboutInput = formElementEdit.querySelector('.popup__input_data_job');
//* Переменные попапа для добавление новых карточек
const formElementAdd = document.querySelector('.popup__container_type_add');
const formAddNewCards = document.getElementsByName('popup-form-add-new-card')[0];
const titleInput = formElementAdd.querySelector('.popup__input_data_title');
const photoInput = formElementAdd.querySelector('.popup__input_data_photo');

export const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about-me',
  avatarSelector: '.profile__avatar',
});

export const api = new Api({
  url: `https://mesto.nomoreparties.co/v1/cohort-63`,
  headers: {
    authorization: 'e2050b48-b9af-478f-bd01-da5552cfcb90',
    'Content-Type': 'application/json',
  },
});

const popupZoomCard = new PopupWithImage('.popup_type_photo');
popupZoomCard.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_type_edit', handleFormSubmitEditProfile);
popupEditProfile.setEventListeners();

//* функция для отправки данных по кнопке сохранить в профиле
function handleFormSubmitEditProfile(values) {
  userInfo.setUserInfo(values);
  popupEditProfile.close();
}

const popupEditAvatar = new PopupWithForm('.popup_type_avatar', handleFormSubmitEditProfile);
popupEditAvatar.setEventListeners();

//* функция для отправки данных по кнопке сохранить в профиле
// function handleFormSubmitEditAvatar(values) {
//   userInfo.setUserInfo(values);
//   popupEditProfile.close();
// }

const popupAddCard = new PopupWithForm('.popup_type_add', handleFormSubmitAddNewCard);
popupAddCard.setEventListeners();

//* функция для отправки данных по кнопке сохранить
function handleFormSubmitAddNewCard() {
  createCard({ name: titleInput.value, link: photoInput.value });
  popupAddCard.close();
}

const createCard = (initialCard) => {
  const card = new Card({
    ...initialCard,
    selector: '.card-template',
    callbackZoom: (evt, props) => {
      const evtTarget = evt.target.closest('.card__photo');
      if (evtTarget) {
        popupZoomCard.open(evt, props);
      }
    },
  });
  section.addItem(card.getElement());
};

const section = new Section({ renderer: createCard }, '.galery');

section.renderItems(initialCards);

const formEditProfilValidator = new FormValidator(validationConfig, formElementEdit);
formEditProfilValidator.enableValidation();

//* получение данных с карточки пользователя в попап редактирования профиля
function getUserInfoInPopup() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  aboutInput.value = userData.about;
}

editProfileButton.addEventListener('click', () => {
  getUserInfoInPopup();
  popupEditProfile.open();
  formEditProfilValidator.disableSubmitButton();
  formEditProfilValidator.removeValidationErrors();
});

const formAddNewCardValidator = new FormValidator(validationConfig, formElementAdd);
formAddNewCardValidator.enableValidation();

addNewCardButton.addEventListener('click', () => {
  popupAddCard.open();
  formAddNewCards.reset();
  formAddNewCardValidator.disableSubmitButton();
  formAddNewCardValidator.removeValidationErrors();
});

const formEditAvatarValidator = new FormValidator(validationConfig, formElementAvatar);
formEditAvatarValidator.enableValidation();

editAvatarButton.addEventListener('click', () => {
  popupEditAvatar.open();
  formEditAvatarValidator.disableSubmitButton();
  formEditAvatarValidator.removeValidationErrors();
});

//переменная под id пользователя
// let userId;

// api
//   .getAllData() // возвращает результат исполнения нужных промисов (карточки и информация пользователя)
//   .then(([cards, userData]) => {
//     userInfo.setUserInfo(userData);
//     userId = userData._id;
//     section.renderItems(cards);
//   })
//   .catch((err) => console.log(err));
