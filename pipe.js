function Pipe() {
  this.spacing = HEIGHT * 0.2;
  this.width = 30;
  this.topHeight = random(0.2 * HEIGHT, 0.6 * HEIGHT);
  this.bottomHeight = HEIGHT - this.spacing - this.topHeight;
  this.x = WIDTH;
  this.speed = 5;
}

Pipe.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.fillRect(this.x, 0, this.width, this.topHeight);
  ctx.fill();
  ctx.beginPath();
  ctx.fillRect(
    this.x,
    this.topHeight + this.spacing,
    this.width,
    this.bottomHeight
  );
  ctx.fill();
};

Pipe.prototype.update = function () {
  this.x -= this.speed;
};

Pipe.prototype.didCollide = function (bird) {
  if (bird.x >= this.x && bird.x <= this.x + this.width) {
    if (bird.y <= this.topHeight || bird.y >= this.topHeight + this.spacing) {
      return true;
    }
  }
  return false;
};
