import AbstractComponent from './abstract-component';

export default class AddItemBar extends AbstractComponent {
  constructor() {
    super();
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onSubmit = null;
  }

  get template() {
    return `<form class="add-item-bar">
    <input type="text" placeholder="add item" class="add-item-bar__item" name="text" required>
    <label for="colored">colored</label>
    <input class="add-item-bar__checkbox" id="colored" type="checkbox" placeholder="add item" name="colored"></input>
    <div class="add-item-bar__color-picker">
      <label><input type="radio" name="color" value="green">green</input></label>
      <label><input type="radio" name="color" value="red">red</input></label>
    </div>
    <button class="add-item-bar__button">Add Item</button>
  </form>`;
  }

  set onSubmit(func) {
    this._onSubmit = func;
  }

  _onInput(evt) {
    this._value = evt.target.value;
  }

  _onFormSubmit(evt) {
    evt.preventDefault();
    const newData = {
      text: evt.target.text.value,
      colored: evt.target.colored.checked,
      color: evt.target.color.value
    };

    if (typeof this._onSubmit === 'function') {
      this._onSubmit(newData);
    }

    evt.target.reset();
  }

  bind() {
    this._element.addEventListener('submit', this._onFormSubmit);
  }

  unbind() {
    this._element.removeEventListener('submit', this._onFormSubmit);
  }
}
