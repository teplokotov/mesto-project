export default class Section {

  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._itemsContainer = document.querySelector(selector);
  }

  drawItems() {
    this._items.forEach(item => this._renderer(item));
  }

  addItem(element, place) {
    place === 'append' ? this._itemsContainer.append(element) : this._itemsContainer.prepend(element);
  }

}
