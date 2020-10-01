function Population(size) {
  this.members = [];
  this.membersPrev = [];
  this.size = size;
  for (let i = 0; i < this.size; i++) {
    this.members.push(new Bird());
  }
  this.generation = 1;
}

Population.prototype.remove = function (index) {
  this.membersPrev.push(...this.members.splice(index, 1));
};

Population.prototype.repopulate = function (mutationRate) {
  this.generation++;
  this.calcFitness();
  for (let i = 0; i < this.size; i++) {
    const parent = this.getParent();
    this.members.push(parent.mutate(mutationRate));
  }
  this.membersPrev = [];
};

Population.prototype.calcFitness = function () {
  let sumScores = 0;
  for (const bird of this.membersPrev) {
    sumScores += bird.score;
  }
  for (const bird of this.membersPrev) {
    bird.fitness = bird.score / sumScores;
  }
};

Population.prototype.getParent = function () {
  while (true) {
    const randomBird = this.membersPrev[randomInt(0, this.size)];
    const randomNum = random(0, 1);
    if (randomBird.fitness > randomNum) {
      return randomBird;
    }
  }
};

Population.prototype.getBest = function () {
  let maxFitness = 0;
  let bestBird;
  for (const bird of this.membersPrev) {
    if (bird.fitness > maxFitness) {
      bestBird = bird;
    }
  }
  return bestBird;
};
