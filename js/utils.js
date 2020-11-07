"use strict";

(function () {

  const randomArrayItem = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  window.utils = {
    randomArrayItem: randomArrayItem
  };

})();
