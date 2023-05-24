import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {

  constructor(selector, submitFunc) {
    super(selector);
    this._form = this._popup.querySelector('.form');
    this._submitForm = submitFunc;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList = this._form.querySelectorAll('.form__input');

    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}
