"use strict";

(function () {

  const drag = function (handle, element) {
    handle.addEventListener(`mousedown`, function (evt) {
      evt.preventDefault();

      let initialCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      let dragged = false;

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        dragged = true;

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

        if (dragged) {
          const onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            handle.removeEventListener(`click`, onClickPreventDefault);
          };
          handle.addEventListener(`click`, onClickPreventDefault);
        }
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    });
  };

  window.dragElement = {
    drag: drag
  };

})();
