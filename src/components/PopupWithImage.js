import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {

  constructor(selector) {
    super(selector);
    this._popupImage = this._popup.querySelector(".figure__image");
    this._popupCaption = this._popup.querySelector(".figure__caption");
  }

  open(imageData) {
    super.open();
    this._popupImage.src = imageData.link;
    this._popupImage.alt = imageData.name;
    this._popupCaption.textContent = imageData.name;
  }
  
}
