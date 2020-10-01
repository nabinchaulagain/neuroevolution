function Bird() {
  this.radius = 15;
  this.x = WIDTH / 2 - this.radius;
  this.y = HEIGHT / 2 - this.radius;
  this.gravity = 0.5;
  this.lift = 9;
  this.velocity = 0;
}

Bird.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.fill();
};

Bird.prototype.update = function () {
  this.velocity += this.gravity;
  this.y += this.velocity;
};

Bird.prototype.goUp = function () {
  this.velocity -= this.lift;
};
