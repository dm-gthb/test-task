import {getRandomArrayElement, getRandomArrayElements, getRandomNum} from '../util';

const TEXT_BLOCKS_QUANTITY = 5;
const MIN_TEXT_CONTENT = 1;
const MAX_TEXT_CONTENT = 2;
const TYPES = ['simple', 'colored'];
const COLORS = ['green', 'red'];

const TEXT_CONTENT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
const paragraphs = TEXT_CONTENT.split('. ');

const getTextData = (i) => {
  const id = i;
  const type = getRandomArrayElement(TYPES);
  const text = getRandomArrayElements(getRandomNum(MIN_TEXT_CONTENT, MAX_TEXT_CONTENT), paragraphs).join('. ');
  const color = type === 'colored' ? getRandomArrayElement(COLORS) : '';

  const data = {
    id,
    text,
    isHighlighted: false
  };

  if (color) {
    data.color = color;
  }

  return data;
};

const generateTextData = (quantity) => {
  let data = [];
  for (let i = 0; i < quantity; i++) {
    data.push(getTextData(i));
  }
  return data;
};

export const textBlocksData = generateTextData(TEXT_BLOCKS_QUANTITY);
