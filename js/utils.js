"use strict";

(function () {

  const randomArrayItem = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  const applyRandomColor = function (element, colors, colorInput) {
    const color = randomArrayItem(colors);

    if (element.tagName.toLowerCase() === `div`) {
      element.style.backgroundColor = color;
    } else {
      element.style.fill = color;
    }

    if (colorInput) {
      colorInput.value = color;
    }
  };

  window.utils = {
    randomArrayItem: randomArrayItem,
    applyRandomColor: applyRandomColor
  };

})();
