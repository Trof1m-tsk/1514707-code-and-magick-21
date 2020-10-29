"use strict";

(function () {

  const WIZARDS_NUMBER = 4;

  const setupWindow = document.querySelector(`.setup`);
  const setupWindowOpen = document.querySelector(`.setup-open`);
  const setupWindowClose = document.querySelector(`.setup-close`);
  const setupUserName = document.querySelector(`.setup-user-name`);
  const setupWizardCoat = document.querySelector(`.setup-wizard`).querySelector(`.wizard-coat`);
  const setupWizardEyes = document.querySelector(`.setup-wizard`).querySelector(`.wizard-eyes`);
  const setupWizardFireball = document.querySelector(`.setup-fireball`);
  const setupHandle = setupWindow.querySelector(`.upload`);
  const form = setupWindow.querySelector(`.setup-wizard-form`);
  const similarElementsList = document.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
      .content
      .querySelector(`.setup-similar-item`);

  const onEscCloseSetup = function (evt) {
    if (evt.key === `Escape` && setupUserName !== document.activeElement) {
      evt.preventDefault();
      setupWindow.classList.add(`hidden`);
      closeSetupWindow();
    }
  };

  const onWizardChangeColors = function (evt) {
    const coatColorInput = document.querySelector(`.coat-color-input`);
    const eyesColorInput = document.querySelector(`.eyes-color-input`);
    const fireballColorInput = document.querySelector(`.fireball-color-input`);

    if (evt.target.matches(`.wizard-coat`)) {
      window.utils.applyRandomColor(setupWizardCoat, window.setup.coatColors, coatColorInput);
    } else if (evt.target.matches(`.wizard-eyes`)) {
      window.utils.applyRandomColor(setupWizardEyes, window.setup.eyesColors, eyesColorInput);
    } else if (evt.target.matches(`.setup-fireball`)) {
      window.utils.applyRandomColor(setupWizardFireball, window.setup.fireballColors, fireballColorInput);
    }
  };

  const openSetupWindow = function () {
    setupWindow.classList.remove(`hidden`);
    document.addEventListener(`keydown`, onEscCloseSetup);
    setupWindow.addEventListener(`click`, onWizardChangeColors);
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

  const createWizardElement = function (wizard) {
    const wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

    return wizardElement;
  };

  const loadHandler = function (wizards) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < WIZARDS_NUMBER; i++) {
      fragment.appendChild(createWizardElement(wizards[i]));
    }

    similarElementsList.appendChild(fragment);
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
