"use strict";

(function () {

  const setupWindow = document.querySelector(`.setup`);
  const setupWindowOpen = document.querySelector(`.setup-open`);
  const setupWindowClose = document.querySelector(`.setup-close`);
  const setupUserName = document.querySelector(`.setup-user-name`);
  const setupHandle = setupWindow.querySelector(`.upload`);
  const form = setupWindow.querySelector(`.setup-wizard-form`);

  const onEscCloseSetup = function (evt) {
    if (evt.key === `Escape` && setupUserName !== document.activeElement) {
      evt.preventDefault();
      setupWindow.classList.add(`hidden`);
      closeSetupWindow();
    }
  };

  const openSetupWindow = function () {
    setupWindow.classList.remove(`hidden`);
    document.addEventListener(`keydown`, onEscCloseSetup);
    setupWindow.addEventListener(`click`, window.render.onWizardChangeColors);
    setupHandle.addEventListener(`mousedown`,
        window.dragElement.drag(setupHandle, setupWindow));
  };

  const closeSetupWindow = function () {
    setupWindow.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onEscCloseSetup);
    setupHandle.removeEventListener(`mousedown`,
        window.dragElement.drag(setupHandle, setupWindow));
  };

  setupWindowOpen.addEventListener(`click`, function () {
    openSetupWindow();
  });

  setupWindowClose.addEventListener(`click`, function () {
    closeSetupWindow();
  });

  setupWindowOpen.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      openSetupWindow();
    }
  });

  setupWindowClose.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      closeSetupWindow();
    }
  });

  const onUserInputValidity = function () {
    if (setupUserName.validity.tooShort) {
      setupUserName.setCustomValidity(`Имя должно состоять минимум из 2-х символов`);
    } else if (setupUserName.validity.tooLong) {
      setupUserName.setCustomValidity(`Имя должно состоять максимум из 25-и символов`);
    } else if (setupUserName.validity.valueMissing) {
      setupUserName.setCustomValidity(`Обязательное поле`);
    } else {
      setupUserName.setCustomValidity(``);
    }

    setupUserName.reportValidity();
  };

  setupUserName.addEventListener(`invalid`, onUserInputValidity);

  const loadHandler = function () {
    document.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  const errorHandler = function (errorMessage) {
    const errPopup = document.createElement(`div`);
    errPopup.style = `width: 350px; height: auto; z-index: 100; margin: 0 auto; text-align: center; color: red; background-color: white; border: 3px solid red`;
    errPopup.style.position = `absolute`;
    errPopup.style.left = `50%`;
    errPopup.style.top = `50%`;
    errPopup.style.fontSize = `30px`;

    errPopup.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, errPopup);
  };

  window.backend.load(loadHandler, errorHandler);

  form.addEventListener(`submit`, function (evt) {
    window.backend.save(new FormData(form), function () {
      setupWindow.classList.add(`hidden`);
    }, errorHandler);
    evt.preventDefault();
  });

})();
