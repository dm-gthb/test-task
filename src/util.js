const DEBOUNCE_INTERVAL = 200;
let lastTimeout;

export const getRandomNum = (min, max) => Math.floor(min + Math.random() * (max - min + 1));

export const renderElement = (template) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = template.trim();
  return wrapper.firstChild;
};

export const renderElements = (template) => {
  const wrapper = document.createElement('template');
  wrapper.innerHTML = template.trim();
  return wrapper.content;
};

export const appendElement = (element, container) => {
  container.appendChild(element);
};

export const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

export const getRandomArrayElements = (quantity, initArray) => {
  let array = [];
  for (let i = 0; i < quantity; i++) {
    array.push(getRandomArrayElement(initArray));
  }

  return array;
};

export const debounce = (fun) => {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
};
