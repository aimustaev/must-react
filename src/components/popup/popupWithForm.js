import { Popup } from './popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSibmitForm) {
    super(popupSelector);
    this._callbackSibmitForm = callbackSibmitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    console.log(this);
  }

  // метод который собирает данные всех полей формы.
  _getInputValues() {
    const result = {};
    Array.from(this._inputList).forEach((input) => {
      result[input.name] = input.value;
    });
    return result;
  }

  // перезаписывает родительский метод setEventListeners.
  // должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      this._callbackSibmitForm(values);
    });
  }

  // перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    this._popupForm.reset();
  }
}

/*
Создайте класс PopupWithForm, который наследует от Popup.

Этот класс:
Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
Содержит приватный метод _getInputValues, который собирает данные тзьвсех полей формы.

Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса
PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.

Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
*/

/*
//* функция для отправки данных по кнопке сохранить в профиле
function handleFormSubmitEditProfile(evt) {
    evt.preventDefault(); //* отменяет стандартную отправку формы, так мы можем определить свою логику отправки
    profileName.textContent = nameInput.value;
    profileAboutMe.textContent = jobInput.value;
    popupEditProfile.close();
  }

  //* форма элемента  редактирования профиля
  formElementEdit.addEventListener('submit', handleFormSubmitEditProfile);
  const formEditValidator = new FormValidator(validationConfig, formElementEdit);
  formEditValidator.enableValidation();



  //* функция для отправки данных по кнопке сохранить в добавление нового места
  function handleFormSubmitAddNewCard(evt) {
    evt.preventDefault();
    createCard({ name: titleInput.value, link: photoInput.value });
    popupAddCard.close();
    evt.target.reset();
  }

  //* форма элемента добавления нового места
  formElementAdd.addEventListener('submit', handleFormSubmitAddNewCard);
  const formAddValidator = new FormValidator(validationConfig, formElementAdd);
  formAddValidator.enableValidation();
  */
