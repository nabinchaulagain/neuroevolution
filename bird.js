function Bird() {
  this.radius = 15;
  this.x = WIDTH / 2 - this.radius;
  this.y = HEIGHT / 2 - this.radius;
  this.gravity = 0.5;
  this.lift = 7;
  this.velocity = 0;
  this.neuralNetwork = new NeuralNetwork([6, 4, 1]);
  this.score = 0;
  this.fitness = 0;
}

Bird.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.fill();
};

Bird.prototype.update = function () {
  this.score++;
  this.velocity += this.gravity;
  this.y += this.velocity;
};

Bird.prototype.goUp = function () {
  this.velocity -= this.lift;
};

Bird.prototype.decide = function (closestPipe) {
  const inputs = new Matrix([
    [this.velocity / 100],
    [this.x / WIDTH], //x position of bird
    [this.y / HEIGHT], //y position of bird
    [closestPipe.x / WIDTH], //x position of pipes
    [closestPipe.topHeight / HEIGHT], //height of top pipe
    [closestPipe.bottomHeight / HEIGHT], //height of bottom pipe
  ]);
  const prediction = this.neuralNetwork.predict(inputs);
  if (prediction.confidence > 0.5) {
    this.goUp();
  }
};

Bird.prototype.mutate = function (mutationRate) {
  const mutatedNN = this.neuralNetwork.mutate(mutationRate);
  const mutatedBird = new Bird();
  mutatedBird.neuralNetwork = mutatedNN;
  return mutatedBird;
};
