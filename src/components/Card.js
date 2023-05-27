export default class Card {

  constructor(data, selector, userId, handleCardClick) {

    [ this._name, this._link, this._likes, this._ownerId, this._cardId ] = [ data.name, data.link, data.likes, data.owner._id, data._id ];

    this._cardElement = document.querySelector(selector).content.querySelector('.element').cloneNode(true);
    this._cardElementImage = this._cardElement.querySelector('.element__image');
    this._cardElementTitle = this._cardElement.querySelector('.element__title');
    this._cardElementCounter = this._cardElement.querySelector('.counter');
    this._btnLike = this._cardElement.querySelector('.btn-like');
    this._btnTrash = this._cardElement.querySelector('.btn-trash');

    this._userId = userId;

    const { handlebtnLikeClick, handlebtnTrashClick, handleImageClick } = handleCardClick;
    this._handlebtnLikeClick =  handlebtnLikeClick;
    this._handlebtnTrashClick = handlebtnTrashClick;
    this._handleImageClick = handleImageClick;

  }

  _setEventListeners() {
    this._btnLike.addEventListener('click', () => this._handlebtnLikeClick(this));
    if (this._userId == this._ownerId) this._btnTrash.addEventListener('click', (evt) => this._handlebtnTrashClick(evt, this._cardId));
    this._cardElementImage.addEventListener('click', () => this._handleImageClick(this._name, this._link));
  }

  isLiked() {
    return this._btnLike.classList.contains('btn-like_liked');
  }

  toggleLike(res) {
    this._cardElementCounter.textContent = res.likes.length > 0 ? res.likes.length : '';
    this._btnLike.classList.toggle('btn-like_liked');
  }

  getId() {
    return this._cardId;
  }

  draw() {

    this._cardElementImage.setAttribute('alt', this._name);
    this._cardElementImage.setAttribute('src', this._link);
    this._cardElementTitle.textContent = this._name;
    // Show likes counter and toggle initial state of like
    if(this._likes.length !== 0) {
      this._cardElementCounter.textContent = this._likes.length;
      const isLiked = this._likes.find(like => like._id === this._userId ? true : false);
      if (isLiked) this._btnLike.classList.toggle('btn-like_liked');
    }
    // Remove trash from alien card
    if (this._userId !== this._ownerId) this._btnTrash.remove();

    this._setEventListeners();

    return this._cardElement;
  }

}
