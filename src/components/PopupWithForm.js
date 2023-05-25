import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {

  constructor(selector, submitFunc) {
    super(selector);
    this._formElement = this._popup.querySelector('.form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'));
    this._saveBtn = this._formElement.querySelector('.btn-save');
    this._submitForm = submitFunc;
  }

  _getInputValues() {
    this._inputValues = {};

    this._inputList.forEach((inputElement) => {
      this._inputValues[inputElement.name] = inputElement.value;
    });

    return this._inputValues;
  }

  setEventListeners() { // Исправленный метод
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._submitForm);
  }

  setInputValues(data) {
    this._inputList.forEach((inputElement) => {
      inputElement.value = data[inputElement.name];
    });
  }

  renderSaving(isLoading) {
    if (isLoading) {
      this._saveBtn.textContent = 'Сохранение...';
    } else {
      this._saveBtn.textContent = 'Сохранить';
    }
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}

