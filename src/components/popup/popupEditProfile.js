import { PopupWithForm } from './popupWithForm';
import { userInfo } from '../..';

const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');

export const popupEditProfile = new PopupWithForm('.popup_type_edit', handleFormSubmitEditProfile);
popupEditProfile.setEventListeners();

//* функция для отправки данных по кнопке сохранить в профиле
function handleFormSubmitEditProfile() {
  const userData = userInfo.setUserInfo(date);
  profileName.textContent = userData.name;
  profileAboutMe.textContent = userData.about;
  // if (values['input-name']) {
  //   profileName.textContent = values['input-name'];
  // }
  // if (values['input-job']) {
  //   profileAboutMe.textContent = values['input-job'];
  // }
  popupEditProfile.close();
}

// const userData = userInfo.getUserInfo();
// nameInput.value = userData.name;
// aboutInput.value = userData.about;
