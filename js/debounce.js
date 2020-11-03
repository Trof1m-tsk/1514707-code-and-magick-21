"use strict";

(function () {
  const DEBOUNCE_TIME = 500;
  let lastTimeout;

  window.debounce = function (callback) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(callback, DEBOUNCE_TIME);
  };

})();
