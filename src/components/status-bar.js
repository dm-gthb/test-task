import AbstractComponent from './abstract-component';

export default class StatusBar extends AbstractComponent {
  constructor(state) {
    super();
    this._state = state;
  }

  get template() {
    return `<div>
      ${this._getMarkup()}
    </div>`;
  }

  _getMarkup() {
    const {all, highlighted, green, red} = this._state;
    return `<div class="status">
    <div class="status__item">
      <h3>All</h3>
      <span>${all}</span>
    </div>
    <div class="status__item">
      <h3>Highlighted</h3>
      <span>${highlighted}</span>
    </div>
    <div class="status__item">
      <h3>Highlighted green</h3>
      <span>${green}</span>
    </div>
    <div class="status__item">
      <h3>Highlighted red</h3>
      <span>${red}</span>
    </div>
  </div>`;
  }

  _updateMarkup() {
    this._element.innerHTML = this._getMarkup();
  }

  _update(state) {
    this._state = state;
  }
}
