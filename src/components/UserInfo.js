export default class UserInfo {

  constructor({ selectorUserName, selectorUserStatus, selectorUserPhoto }) {
    this._userId = null;
    this._userName = document.querySelector(selectorUserName);
    this._userStatus = document.querySelector(selectorUserStatus);
    this._userPhoto = document.querySelector(selectorUserPhoto);
  }

  getUserInfo() {
    return {
      userId: this._userId,
      userName: this._userName,
      userStatus: this._userStatus,
      userPhoto: this._userPhoto,
    };
  }

  setUserInfo({ _id, name, about, avatar }) {
    this._userId = _id;
    this._userName.textContent = name;
    this._userStatus.textContent = about;
    this._userPhoto.src = avatar;
    this._userPhoto.alt = name;
  }

}
