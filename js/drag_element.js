"use strict";

(function () {

  const setupHandle = window.setupWindow.querySelector(`.upload`);

  setupHandle.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let initialCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shift = {
        x: initialCoords.x - moveEvt.clientX,
        y: initialCoords.y - moveEvt.clientY
      };

      initialCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.setupWindow.style.top = (window.setupWindow.offsetTop - shift.y) + `px`;
      window.setupWindow.style.left = (window.setupWindow.offsetLeft - shift.x) + `px`;
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

})();
