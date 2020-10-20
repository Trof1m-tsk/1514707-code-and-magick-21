"use strict";

(function () {

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
const SIMILARS_NUMBER = 4;
const similarElementsList = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);
const wizards = [];

window.setup = {
  FIRST_NAMES: FIRST_NAMES,
  SECOND_NAMES: SECOND_NAMES,
  COAT_COLORS: COAT_COLORS,
  EYES_COLORS: EYES_COLORS,
  FIREBALL_COLORS: FIREBALL_COLORS,
  SIMILARS_NUMBER: SIMILARS_NUMBER
};

const createSimilarWizard = function (name, surname, coat, eyes) {
  return {
    name: `${window.utils.randomArrayItem(name)} ${window.utils.randomArrayItem(surname)}`,
    coatColor: window.utils.randomArrayItem(coat),
    eyesColor: window.utils.randomArrayItem(eyes)
  };
};

for (let i = 0; i < SIMILARS_NUMBER; i++) {
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

}) ();
