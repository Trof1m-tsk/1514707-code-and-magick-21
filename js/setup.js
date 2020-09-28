'use strict';

const FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'];
const SECOND_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла', 'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвин'];
const COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'];
const EYES_COLORS = [
 'black',
 'red',
 'blue',
 'yellow',
 'green'];
const OTHER_WIZARDS_NUMBER = 4;
const userDialog = document.querySelector('.setup');
const similarElementsList = document.querySelector('.setup-similar-list');
const similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
const fragment = document.createDocumentFragment();
const wizards = [];

userDialog.classList.remove('hidden');

const randomArrayItem = function (array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const randomWizards = function (name, surname, coat, eyes) {
  const randomWizard = {
    name: randomArrayItem(name) + ' ' + randomArrayItem(surname),
    coatColor: randomArrayItem(coat),
    eyesColor: randomArrayItem(eyes)
  };

  return randomWizard;
};

for (let i = 0; i < OTHER_WIZARDS_NUMBER; i++) {
  const wizard = randomWizards(FIRST_NAMES, SECOND_NAMES, COAT_COLORS, EYES_COLORS);
  wizards.push(wizard);
};

const createElement = function (wizard) {
  const wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  fragment.appendChild(wizardElement);
};

wizards.forEach(createElement);
similarElementsList.appendChild(fragment);
document.querySelector('.setup-similar').classList.remove('hidden');
