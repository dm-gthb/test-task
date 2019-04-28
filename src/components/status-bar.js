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
      <h3>all</h3>
      <span>${all}</span>
    </div>
    <div class="status__item">
      <h3>highlighted</h3>
      <span>${highlighted}</span>
    </div>
    <div class="status__item status__item--green">
      <h3>highlighted green</h3>
      <span>${green}</span>
    </div>
    <div class="status__item status__item--red">
      <h3>highlighted red</h3>
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
