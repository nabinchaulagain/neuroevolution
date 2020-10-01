function Population(size) {
  this.members = [];
  this.membersPrev = [];
  this.size = size;
  this.bestBirdEver;
  this.bestScoreEver = 0;
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

Population.prototype.repopulateFromParent = function (mutationRate, parentNN) {
  this.generation = 1;
  const parentBird = new Bird();
  parentBird.neuralNetwork = parentNN;
  this.members = [parentBird];
  this.membersPrev = [];
  this.bestBirdEver = undefined;
  this.bestScoreEver = 0;
  for (let i = 1; i < this.size; i++) {
    const bird = new Bird();
    bird.neuralNetwork = parentNN.mutate(mutationRate);
    this.members.push(new Bird());
  }
};

Population.prototype.calcFitness = function () {
  let sumScores = 0;
  for (const bird of this.membersPrev) {
    if (bird.score > this.bestScoreEver) {
      this.bestScoreEver = bird.score;
      this.bestBirdEver = bird;
    }
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

Population.prototype.getBestEver = function () {
  for (const bird of this.members) {
    if (bird.score > this.bestScoreEver) {
      this.bestScoreEver = bird.score;
      this.bestBirdEver = bird;
    }
  }
  return this.bestBirdEver;
};
