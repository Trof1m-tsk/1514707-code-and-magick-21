"use strict";

(function () {

  const save = function (data, onLoad, onError) {
    const URL = `https://21.javascript.pages.academy/code-and-magick`;

    const req = new XMLHttpRequest();

    req.responseType = `json`;
    req.addEventListener(`load`, function () {
      onLoad(req.response);
    });

    req.addEventListener(`error`, function () {
      onError(`Статус ответа: ${req.status} ${req.statusText}`);
    });

    req.open(`POST`, URL);
    req.send(data);
  };

  const load = function (onLoad, onError) {
    const URL = `https://21.javascript.pages.academy/code-and-magick/data`;

    const req = new XMLHttpRequest();

    req.responseType = `json`;
    req.open(`GET`, URL);

    req.addEventListener(`load`, function () {
      onLoad(req.response);
      window.backend.data = req.response;
    });

    req.addEventListener(`error`, function () {
      onError(`Произошла ошибка`);
    });

    req.send();
  };

  window.backend = {
    save: save,
    load: load
  };

})();
