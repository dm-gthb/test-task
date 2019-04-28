import AbstractComponent from './abstract-component';

export default class TextBlockSimple extends AbstractComponent {
  constructor(data, id) {
    super();
    this._id = id;
    this._type = data.type;
    this._text = data.text;
    this._isHighlighted = data.isHighlighted;
    this._onTextClick = this._onTextClick.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onHighlight = null;
    this._onDelete = null;
  }

  get template() {
    return `<div>
      ${this._getMarkup()}
    </div>`;
  }

  set onHighlight(func) {
    this._onHighlight = func;
  }

  set onDelete(func) {
    this._onDelete = func;
  }

  _getMarkup() {
    return `<div class="text-block">
    <p class="text-block__content ${this._isHighlighted ? `text-block__content--highlighted` : ``}">${this._text}</p>
    <button class="text-block__button"><svg xmlns="http://www.w3.org/2000/svg" width="8px" height="8px" viewBox="0 0 357 357"><path d="M357 35.7L321.3 0 178.5 142.8 35.7 0 0 35.7l142.8 142.8L0 321.3 35.7 357l142.8-142.8L321.3 357l35.7-35.7-142.8-142.8z"/></svg></button>
  </div>`;
  }

  _updateMarkup() {
    this._element.innerHTML = this._getMarkup();
  }

  _onTextClick() {
    if (typeof this._onHighlight === 'function') {
      this._onHighlight(this._id);
    }
  }

  _onDeleteButtonClick() {
    if (typeof this._onDelete === 'function') {
      this._onDelete(this._id);
    }
  }

  bind() {
    const deleteButtonElement = this._element.querySelector('.text-block__button');
    const textBlock = this._element.querySelector('.text-block__content');

    deleteButtonElement.addEventListener('click', this._onDeleteButtonClick);
    textBlock.addEventListener('click', this._onTextClick);
  }

  unbind() {
    const deleteButtonElement = this._element.querySelector('.text-block__button');
    const textBlock = this._element.querySelector('.text-block__content');
    
    deleteButtonElement.removeEventListener('click', this._onDeleteButtonClick);
    textBlock.removeEventListener('click', this._onTextClick);
  }

  update(data, id) {
    this._id = id;
    this._type = data.type;
    this._text = data.text;
    this._isHighlighted = data.isHighlighted;
  }
}
