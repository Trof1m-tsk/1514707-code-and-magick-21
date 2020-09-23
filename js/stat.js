`use strict`;

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const SPACE_X = 50;
const BAR_WIDTH = 40;
const BAR_MAX_HEIGHT = 150;
const TEXT_HEIGHT = 16;
const LINE_HEIGHT = TEXT_HEIGHT + GAP;
const FIRST_BAR_X = CLOUD_X + SPACE_X;
const FIRST_BAR_Y = CLOUD_Y + LINE_HEIGHT * 3 + GAP + BAR_MAX_HEIGHT;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxResult = function (times) {
  let maxResult = times[0];

  for (let i = 1; i < times.length; i++) {
    if (times[i] > maxResult) {
      maxResult = times[i];
    }
  }

  return maxResult;
};

const getResult = function (ctx, x, height, name, time) {
  const myColor = `rgba(250, 0, 0, 1)`;
  const otherColor = `hsl(240, ` + (Math.random(0) * 100) + `% , 50%)`;

  ctx.fillStyle = (name === `Вы`) ? myColor : otherColor;
  ctx.fillText(
      Math.round(time),
      FIRST_BAR_X + x,
      CLOUD_Y + LINE_HEIGHT * 3
  );
  ctx.fillRect(
      FIRST_BAR_X + x,
      FIRST_BAR_Y,
      BAR_WIDTH,
      -height
  );
  ctx.fillText(
      name,
      FIRST_BAR_X + x,
      FIRST_BAR_Y + LINE_HEIGHT
  );
};

window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#ffffff`);

  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.fillText(`Ура вы победили`, CLOUD_X + 100, CLOUD_Y + LINE_HEIGHT);
  ctx.fillText(`Список результатов:`, CLOUD_X + 100, CLOUD_Y + LINE_HEIGHT * 2);

  for (let i = 0; i < names.length; i++) {
    const x = (SPACE_X + BAR_WIDTH) * i;
    const barHeight = times[i] * BAR_MAX_HEIGHT / getMaxResult(times);
    getResult(ctx, x, barHeight, names[i], times[i]);
  }
};
