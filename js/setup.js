"use strict";

const FIRST_NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`];
const SECOND_NAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвин`];
const COAT_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`];
const EYES_COLORS = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`];
const FIREBALL_COLORS = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`];
const SIMILAR_WIZARDS_NUMBER = 4;
const setupWindow = document.querySelector(`.setup`);
const similarElementsList = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);
const wizards = [];
const setupWindowOpen = document.querySelector(`.setup-open`);
const setupWindowClose = document.querySelector(`.setup-close`);
const setupUserName = document.querySelector(`.setup-user-name`);
const setupWizardCoat = document.querySelector(`.setup-wizard`).querySelector(`.wizard-coat`);
const setupWizardEyes = document.querySelector(`.setup-wizard`).querySelector(`.wizard-eyes`);
const setupWizardFireball = document.querySelector(`.setup-fireball`);
const randomArrayItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

const createSimilarWizard = function (name, surname, coat, eyes) {
  return {
    name: randomArrayItem(name) + ` ` + randomArrayItem(surname),
    coatColor: randomArrayItem(coat),
    eyesColor: randomArrayItem(eyes)
  };
};

for (let i = 0; i < SIMILAR_WIZARDS_NUMBER; i++) {
  wizards.push(createSimilarWizard(FIRST_NAMES, SECOND_NAMES, COAT_COLORS, EYES_COLORS));
}

const createWizardElement = function (wizard) {
  const wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const renderWizardsFragment = function (similarWizards) {
  const fragment = document.createDocumentFragment();

  similarWizards.forEach((item) => {
    fragment.appendChild(createWizardElement(item));
  });
  similarElementsList.appendChild(fragment);
  document.querySelector(`.setup-similar`).classList.remove(`hidden`);
};

renderWizardsFragment(wizards);

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
    const randomCoatColor = randomArrayItem(COAT_COLORS);
    setupWizardCoat.style.fill = randomCoatColor;
    coatColorInput.value = randomCoatColor;
  } else if (evt.target.matches(`.wizard-eyes`)) {
    const randomEyesColor = randomArrayItem(EYES_COLORS);
    setupWizardEyes.style.fill = randomEyesColor;
    eyesColorInput.value = randomEyesColor;
  } else if (evt.target.matches(`.setup-fireball`)) {
    const randomFireballColor = randomArrayItem(FIREBALL_COLORS);
    setupWizardFireball.style.backgroundColor = randomFireballColor;
    fireballColorInput.value = randomFireballColor;
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
