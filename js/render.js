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

  const onWizardChangeColors = function (evt) {
    let coatColor = ``;
    let eyesColor = ``;
    let fireballColor = ``;
    const coatColorInput = document.querySelector(`.coat-color-input`);
    const eyesColorInput = document.querySelector(`.eyes-color-input`);
    const fireballColorInput = document.querySelector(`.fireball-color-input`);

    if (evt.target.matches(`.wizard-coat`)) {
      coatColor = window.utils.randomArrayItem(COAT_COLORS);
      window.utils.applyRandomColor(setupWizardCoat, coatColor, coatColorInput);
    } else if (evt.target.matches(`.wizard-eyes`)) {
      eyesColor = window.utils.randomArrayItem(EYES_COLORS);
      window.utils.applyRandomColor(setupWizardEyes, eyesColor, eyesColorInput);
    } else if (evt.target.matches(`.setup-fireball`)) {
      fireballColor = window.utils.randomArrayItem(FIREBALL_COLORS);
      window.utils.applyRandomColor(setupWizardFireball, fireballColor, fireballColorInput);
    }

    window.debounce(renderSimilarWizards(getSimilarWizards(coatColor, eyesColor)));
  };

  const createWizardElement = function (wizard) {
    const wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardElement;
  };

  const getSimilarWizards = function (coat, eyes) {
    const  wizardsData = window.backend.data;
    wizardsData.forEach(function (wizardData) {
      wizardData.score = 0;
      if (wizardData.colorCoat === coat && wizardData.colorEyes === eyes) {
        wizardData.score = 100;
        console.log(wizardData.name);
      } else if (wizardData.colorCoat === coat && wizardData.colorEyes !== eyes) {
        wizardData.score = 20;
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

  window.render = {
    renderSimilarWizards: renderSimilarWizards,
    onWizardChangeColors: onWizardChangeColors
  };

})();
