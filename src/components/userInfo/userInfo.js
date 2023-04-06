export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileAboutMe = document.querySelector(aboutSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  getUserId() {
    return this._id;
  }

  //публичный метод getUserInfo, который возвращает объект с данными пользователя.
  getUserInfo() {
    this._userData = {
      name: this._profileName.textContent,
      about: this._profileAboutMe.textContent,
      avatar: this._profileAvatar.src,
    };
    return this._userData;
  }

  //публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
  // setUserInfo(values) {
  //   this._profileName.textContent = values['input-name'];
  //   this._profileAboutMe.textContent = values['input-job'];
  // }

  setUserInfo({
    name = this._profileName.textContent,
    about = this._profileAboutMe.textContent,
    avatar = this._profileAvatar.src,
    _id,
  }) {
    this._profileName.textContent = name;
    this._profileAboutMe.textContent = about;
    this._profileAvatar.src = avatar;
    this._id = _id;
  }
}
