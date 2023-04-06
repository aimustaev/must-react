export class Card {
  constructor({
    selector,
    name,
    link,
    callbackZoom,
    callbackLikeCard,
    callbackDeleteCard,
    ...props
  }) {
    this._element = this._cloneCard(selector);
    this._setCardData(name, link);
    this._data = { name, link, ...props };
    this._callbackZoom = callbackZoom;
    this._callbackLikeCard = callbackLikeCard;
    this._callbackDeleteCard = callbackDeleteCard;
    this._setEventListeners();
  }

  //* публичный метод, для получения dom элемента карточки
  getElement() {
    return this._element;
  }

  //* метод для получения шаблона карточки и наполнение данными
  _cloneCard(selector) {
    const card = document.querySelector(selector).content.querySelector('.card').cloneNode(true);

    return card;
  }

  //* метод наполнение данными карточки
  _setCardData(name, link) {
    this._setTitleData(name);
    this._setImageData(name, link);
  }

  _setImageData(name, link) {
    const image = this._element.querySelector('.card__photo');
    if (image) {
      image.src = link;
      image.alt = name;
    }
  }

  _setTitleData(name) {
    const title = this._element.querySelector('.card__title');
    if (title) {
      title.textContent = name;
    }
  }

  //* метод удаления карточки
  _deleteCard(evt) {
    if (evt.target.classList.contains('card__delete-button')) {
      this._element.remove();
      this._element = null;
      this._callbackDeleteCard(this._data._id);
    }
  }

  //* метод лайка карточки
  _handleLikeCard(evt) {
    const buttonLike = evt.target;
    if (buttonLike.classList.contains('card__like-button')) {
      this._callbackLikeCard(this._data._id);
      buttonLike.classList.toggle('card__like-button_active');
    }
  }

  // handleLikeCard() {
  //   const likeButton = this._view.querySelector('.elements__like-button')
  //   const likeCount = this._view.querySelector('.elements__like-count')

  //   if(!(likeButton.classList.contains('elements__like-button_active'))) {
  //     this._api.like(this._id)
  //       .then((data) => {
  //         likeButton.classList.add('elements__like-button_active')
  //         likeCount.textContent = data.likes.length
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   } else {
  //     this._api.dislike(this._id)
  //       .then((data) => {
  //         likeButton.classList.remove('elements__like-button_active')
  //         likeCount.textContent = data.likes.length
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   }
  // }

  _setEventListeners() {
    this._element.addEventListener('click', (evt) => {
      //! для сохранения контекста использовать только стрелочные функциии
      this._deleteCard(evt);
      this._handleLikeCard(evt);
      this._callbackZoom(evt, this._data);
    });
  }
}
