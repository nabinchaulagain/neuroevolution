const random = function (low, high) {
  return Math.random() * (high - low) + low;
};

const randomInt = function (low, high) {
  return Math.floor(random(low, high));
};
