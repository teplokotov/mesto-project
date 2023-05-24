import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {

  constructor(selector, submitFunc) {
    super(selector);
    this._formElement= this._popup.querySelector('.form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'));
    this._submitForm = submitFunc;
  }

  _getInputValues() {
    this._inputValues = {};

    this._inputList.forEach((inputElement) => {
      this._inputValues[inputElement.name] = inputElement.value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
