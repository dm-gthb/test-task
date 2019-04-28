import TextBlockSimple from './text-block-simple';

export default class TextBlockColored extends TextBlockSimple {
  constructor(data, id) {
    super(data, id);
    this._color = data.color;
    this._onTextDoubleClick = this._onTextDoubleClick.bind(this);
    this._onColorChange = null;
  }

  get template() {
    return `<div>
      ${this._getMarkup()}
    </div>`;
  }

  set onColorChange(func) {
    this._onColorChange = func;
  }

  _getMarkup() {
    return `<div class="text-block text-block--${this._color}">
    <p class="text-block__content ${this._isHighlighted ? `text-block__content--highlighted` : ``}">${this._text}</p>
    <button class="text-block__button"><svg xmlns="http://www.w3.org/2000/svg" width="8px" height="8px" viewBox="0 0 357 357"><path d="M357 35.7L321.3 0 178.5 142.8 35.7 0 0 35.7l142.8 142.8L0 321.3 35.7 357l142.8-142.8L321.3 357l35.7-35.7-142.8-142.8z"/></svg></button>
  </div>`;
  }

  _onTextDoubleClick() {
    if (typeof this._onColorChange === 'function') {
      this._onColorChange(this._id);
    }
  }

  bind() {
    const deleteButtonElement = this._element.querySelector('.text-block__button');
    const textBlock = this._element.querySelector('.text-block__content');

    deleteButtonElement.addEventListener('click', this._onDeleteButtonClick);
    textBlock.addEventListener('click', this._onTextClick);
    textBlock.addEventListener('dblclick', this._onTextDoubleClick);
  }

  unbind() {
    const deleteButtonElement = this._element.querySelector('.text-block__button');
    const textBlock = this._element.querySelector('.text-block__content');
    
    deleteButtonElement.removeEventListener('click', this._onDeleteButtonClick);
    textBlock.removeEventListener('click', this._onTextClick);
    textBlock.removeEventListener('dblclick', this._onTextDoubleClick);
  }

  update(data, id) {
    this._id = id;
    this._type = data.type;
    this._text = data.text;
    this._color = data.color;
    this._isHighlighted = data.isHighlighted;
  }
}
