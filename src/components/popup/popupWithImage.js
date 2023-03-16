import { Popup } from './popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._link = this._container.querySelector('.popup__photo');
    this._name = this._container.querySelector('.popup__subtitle');
  }

  open(values) {
    // console.log(values);
    super.open();
    this._link.src = values.link;
    this._link.alt = values.name;
    this._name.textContent = values.name;
  }
}

/*Создайте класс PopupWithImage, который наследует от Popup. 
Этот класс должен перезаписывать родительский метод open.
В методе open класса PopupWithImage нужно вставлять в попап 
картинку с src изображения и подписью к картинке.*/

/*
//* функция для увеличения фото в карточке
function handleZoomCard(evt, { name, link }) {
    const evtTarget = evt.target.closest('.card__photo');
    if (evtTarget) {
      popupPhoto.src = link;
      popupPhoto.alt = name;
      popupSubtitle.textContent = name;
      openPopup(popupCardPhoto);
    }
  }
  */
