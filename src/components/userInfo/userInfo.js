export class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileAboutMe = document.querySelector(aboutSelector);
  }

  //публичный метод getUserInfo, который возвращает объект с данными пользователя.
  getUserInfo() {
    this._userData = {
      name: this._profileName.textContent,
      about: this._profileAboutMe.textContent,
    };
    return this._userData;
  }

  //публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileAboutMe.textContent = data.about;
  }
}
