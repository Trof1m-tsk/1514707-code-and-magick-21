"use strict";

(function () {
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

  const WIZARDS_NUMBER = 4;

  const setupWizardCoat = document.querySelector(`.setup-wizard`).querySelector(`.wizard-coat`);
  const setupWizardEyes = document.querySelector(`.setup-wizard`).querySelector(`.wizard-eyes`);
  const setupWizardFireball = document.querySelector(`.setup-fireball`);
  const similarElementsList = document.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);
  let eyesColor = window.utils.randomArrayItem(EYES_COLORS);
  let fireballColor = window.utils.randomArrayItem(FIREBALL_COLORS);
  let coatColor = window.utils.randomArrayItem(COAT_COLORS);

  const onWizardChangeColors = function (evt) {

    if (evt.target.matches(`.setup-fireball`)) {
      fireballColor = window.utils.randomArrayItem(FIREBALL_COLORS);
      setupWizardFireball.style.backgroundColor = fireballColor;
      document.querySelector(`.fireball-color-input`).value = fireballColor;
    } else if (evt.target.matches(`.wizard-coat`)) {
      coatColor = window.utils.randomArrayItem(COAT_COLORS);
      setupWizardCoat.style.fill = coatColor;
      document.querySelector(`.coat-color-input`).value = coatColor;
    } else if (evt.target.matches(`.wizard-eyes`)) {
      eyesColor = window.utils.randomArrayItem(EYES_COLORS);
      setupWizardEyes.style.fill = eyesColor;
      document.querySelector(`.eyes-color-input`).value = eyesColor;
    }

    window.debounce(renderSimilarWizards(getSimilarWizards(coatColor, eyesColor)));
  };

  const createWizardElement = function (wizard) {
    const wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardElement;
  };

  const getSimilarWizards = function (coat, eyes) {
    let wizardsData = window.backend.data;

    wizardsData.map(function (wizardData) {
      wizardData.score = 0;
      if (wizardData.colorCoat === coat && wizardData.colorEyes === eyes) {
        wizardData.score = 3;
      } else if (wizardData.colorCoat === coat && wizardData.colorEyes !== eyes) {
        wizardData.score = 2;
      } else if (wizardData.colorCoat !== coat && wizardData.colorEyes === eyes) {
        wizardData.score = 1;
      }
    });

    wizardsData.sort(function (prev, next) {
      return next.score - prev.score;
    });

    return wizardsData;
  };

  const renderSimilarWizards = function (wizards) {
    similarElementsList.innerHTML = ``;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < WIZARDS_NUMBER; i++) {
      fragment.appendChild(createWizardElement(wizards[i]));
    }

    similarElementsList.appendChild(fragment);
  };

  window.wizards = {
    onWizardChangeColors: onWizardChangeColors
  };

})();
