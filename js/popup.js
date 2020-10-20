"use strict";

(function () {

const setupWindow = document.querySelector(`.setup`);
const setupWindowOpen = document.querySelector(`.setup-open`);
const setupWindowClose = document.querySelector(`.setup-close`);
const setupUserName = document.querySelector(`.setup-user-name`);
const setupWizardCoat = document.querySelector(`.setup-wizard`).querySelector(`.wizard-coat`);
const setupWizardEyes = document.querySelector(`.setup-wizard`).querySelector(`.wizard-eyes`);
const setupWizardFireball = document.querySelector(`.setup-fireball`);

window.setupWindow = setupWindow;

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
    window.utils.applyRandomColor(setupWizardCoat, window.setup.COAT_COLORS, coatColorInput);
  } else if (evt.target.matches(`.wizard-eyes`)) {
    window.utils.applyRandomColor(setupWizardEyes, window.setup.EYES_COLORS, eyesColorInput);
  } else if (evt.target.matches(`.setup-fireball`)) {
    window.utils.applyRandomColor(setupWizardFireball, window.setup.FIREBALL_COLORS, fireballColorInput);
  }
};

const openSetupWindow = function () {
  setupWindow.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onEscCloseSetup);
  setupWindow.addEventListener(`click`, onWizardChangeColors);
};

const closeSetupWindow = function () {
  setupWindow.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onEscCloseSetup);
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

}) ();
