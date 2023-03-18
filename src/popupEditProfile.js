import { PopupWithForm } from './components';

const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');

/*
 ** popupEditProfile
 */
export const popupEditProfile = new PopupWithForm('.popup_type_edit', handleFormSubmitEditProfile);
popupEditProfile.setEventListeners();

//* функция для отправки данных по кнопке сохранить в профиле
function handleFormSubmitEditProfile(values) {
  if (values['input-name']) {
    profileName.textContent = values['input-name'];
  }
  if (values['input-job']) {
    profileAboutMe.textContent = values['input-job'];
  }
  popupEditProfile.close();
}
