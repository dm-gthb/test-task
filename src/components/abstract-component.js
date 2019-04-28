import {renderElement} from '../util';

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error('Can\'t instantiate AbstractComponent');
    }

    this._element = null;
    this._state = {};
  }

  get template() {
    throw new Error('You have to define template.');
  }

  get element() {
    return this._element;
  }

  render() {
    this._element = renderElement(this.template.trim());
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }

  bind() {}
  unbind() {}
  update() {}
}
