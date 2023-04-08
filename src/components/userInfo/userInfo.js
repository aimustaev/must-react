export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this.name = document.querySelector(nameSelector);
    this.about = document.querySelector(aboutSelector);
    this.avatar = document.querySelector(avatarSelector);
  }

  getUserId() {
    return this._id;
  }

  //публичный метод getUserInfo, который возвращает объект с данными пользователя.
  getUserInfo() {
    this._userData = {
      name: this.name.textContent,
      about: this.about.textContent,
      avatar: this.avatar.src,
      _id: this._id,
    };
    return this._userData;
  }

  //публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
  // setUserInfo(values) {
  //   this.name.textContent = values['input-name'];
  //   this.about.textContent = values['input-job'];
  // }

  setUserInfo({
    name = this.name.textContent,
    about = this.about.textContent,
    avatar = this.avatar.src,
    _id,
  }) {
    this.name.textContent = name;
    this.about.textContent = about;
    this.avatar.src = avatar;
    this._id = _id;
  }
}
