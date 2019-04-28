import {textBlocksData} from './data/data';
import TextBlockColored from './components/text-block-colored';
import TextBlockSimple from './components/text-block-simple';
import Modal from './components/modal';
import StatusBar from './components/status-bar';
import AddItemBar from './components/add-item-bar';
import {debounce} from './util';

const containerElement = document.querySelector('.container');
const textBlocksContainerElement = containerElement.querySelector('.text-blocks');
const findIndexById = (array, id) => {
  const index = array.findIndex((item) => {
    if (item) {
      return item.id === id;
    }
  });
  return index;
};

const getStatistics = (data) => {
  const statistics = {
    all: 0,
    highlighted: 0,
    green: 0,
    red: 0
  };

  for (const item of data) {
    if (item) {
      statistics.all++;
      if (item.isHighlighted) {
        statistics.highlighted++;
        if (item.color === 'green') {
          statistics.green++;
        } else if (item.color === 'red') {
          statistics.red++;
        }
      }
    }
  }
  return statistics;
}

const updateStatusDisplay = (data) => {
  statusBarComponent._update(getStatistics(data));
  statusBarComponent._updateMarkup();
}

const rerender = (component, dataItem, id) => {
  component.update(dataItem, id);
  component.unbind();
  component._updateMarkup();
  component.bind();
}

const renderNewItem = (dataItem) => {
  if (dataItem.color) {
    const textColoredComponent = new TextBlockColored(dataItem, initId);
    initId++;
    textBlocksContainerElement.appendChild(textColoredComponent.render());

    textColoredComponent.onHighlight = (id) => {        
      const toggleHighlight = () => {
        const isHighlighted = dataItem.isHighlighted;
        dataItem.isHighlighted = !isHighlighted;
        textBlocksData[findIndexById(textBlocksData, id)].isHighlighted = !isHighlighted;
        rerender(textColoredComponent, dataItem, id);
        updateStatusDisplay(textBlocksData);
      }
      
      debounce(toggleHighlight);
    };

    textColoredComponent.onColorChange = (id) => {
      const toggleColor = () => {
        const newColor = dataItem.color === 'red' ? 'green' : 'red';
        dataItem.color = newColor;
        textBlocksData[findIndexById(textBlocksData, id)].color = newColor;
        rerender(textColoredComponent, dataItem, id);
        updateStatusDisplay(textBlocksData);
      };

      debounce(toggleColor);
    };
    
    textColoredComponent.onDelete = (id) => {
      const popupComponent = new Modal();
      document.body.appendChild(popupComponent.render());

      popupComponent.onAgree = () => {
        textBlocksData[findIndexById(textBlocksData, id)] = null;
        textColoredComponent.unrender();
        popupComponent.unrender();
        updateStatusDisplay(textBlocksData);
      }

      popupComponent.onDisagree = () => {
        popupComponent.unrender();
      }
    };

  } else {
    const textSimpleComponent = new TextBlockSimple(dataItem, initId);
    initId++;
    textBlocksContainerElement.appendChild(textSimpleComponent.render());

    textSimpleComponent.onHighlight = (id) => {        
      const toggleHighlight = () => {
        const isHighlighted = dataItem.isHighlighted;
        dataItem.isHighlighted = !isHighlighted;
        textBlocksData[findIndexById(textBlocksData, id)].isHighlighted = !isHighlighted;
        rerender(textSimpleComponent, dataItem, id);
        updateStatusDisplay(textBlocksData);
      }
      
      debounce(toggleHighlight);
    };

    textSimpleComponent.onDelete = (id) => {
      textBlocksData[findIndexById(textBlocksData, id)] = null;
      textSimpleComponent.unrender();
      updateStatusDisplay(textBlocksData);
    };
  }
}

let initId = 0;

const statusBarComponent = new StatusBar(getStatistics(textBlocksData));
containerElement.insertBefore(statusBarComponent.render(), containerElement.firstChild);

const addItemComponent = new AddItemBar();
containerElement.appendChild(addItemComponent.render());

addItemComponent.onSubmit = (data) => {
  const newItemData = {
    id: initId,
    text: data.text,
    isHighlighted: false
  };

  if (data.colored) {
    newItemData.color = data.color;
  }

  textBlocksData.push(newItemData);
  renderNewItem(newItemData);
  updateStatusDisplay(textBlocksData);
}

const renderTextBlocks = (data) => {
  data.map((dataItem) => {
    renderNewItem(dataItem);
  });
};

renderTextBlocks(textBlocksData);
getStatistics(textBlocksData);
