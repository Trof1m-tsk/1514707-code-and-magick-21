"use strict";

(function () {

  const drag = function (handle, element) {
    handle.addEventListener(`mousedown`, function (evt) {
      evt.preventDefault();

      let initialCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      const onHandleClick = function(evtClick) {
        evtClick.preventDefault();
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

        element.style.top = (element.offsetTop - shift.y) + `px`;
        element.style.left = (element.offsetLeft - shift.x) + `px`;
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    })
  };

  window.dragElement = {
    drag: drag
  };

})();
