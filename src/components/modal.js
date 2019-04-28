import AbstractComponent from './abstract-component';

export default class Modal extends AbstractComponent {
  constructor() {
    super();
    this._onAgree = null;
    this._onDisagree = null;
  }

  get template() {
    return `<div class="modal">
    <div class="modal__inner">
      <p class="modal__text">Are you sure you want to delete it?</p>
      <div class="modal__button-wrapper">
        <button class="modal__btn">yes</button>
        <button class="modal__btn">no</button>
      </div>
    </div>
  </div>`;
  }

  set onAgree(func) {
    this._onAgree = func;
  }

  set onDisagree(func) {
    this._onDisagree = func;
  }

  _onAgreeButtonClick() {
    if (typeof this._onAgree === 'function') {
      this._onAgree();
    }
  }

  _onDisagreeButtonClick() {
    if (typeof this._onDisagree === 'function') {
      this._onDisagree();
    }
  }

  bind() {
    const optionsButtonsElements = this.element.querySelectorAll(`.modal__btn`);

    optionsButtonsElements[0].addEventListener(`click`, () => this._onAgreeButtonClick());
    optionsButtonsElements[1].addEventListener(`click`, () => this._onDisagreeButtonClick());
  }
}
