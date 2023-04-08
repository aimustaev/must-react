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
// import Api from '../components/api';
import {
  actionGetUserInfo,
  actionGetInitialCards,
  actionLikeCard,
  actionDeleteCard,
} from '../actions';

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

const popupZoomCard = new PopupWithImage('.popup_type_photo');
popupZoomCard.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_type_edit', handleFormSubmitEditProfile);
popupEditProfile.setEventListeners();

//* функция для отправки данных по кнопке сохранить в профиле
function handleFormSubmitEditProfile(values) {
  console.log(values);
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
  const userId = userInfo.getUserId();

  const card = new Card({
    ...initialCard,
    userId: userId,
    selector: '.card-template',
    callbackZoom: (props) => popupZoomCard.open(props),
  });
  section.addItem(card.getElement());
};

const section = new Section({ renderer: createCard }, '.galery');

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

actionGetUserInfo(handleFormSubmitEditProfile);

actionGetInitialCards((cards) => section.renderItems(cards));
// section.renderItems(initialCards);
