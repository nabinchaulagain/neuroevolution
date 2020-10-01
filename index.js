const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = WIDTH;
canvas.height = HEIGHT;

document.addEventListener("keydown", (ev) => {
  if (ev.keyCode === 32) {
    bird.goUp();
  }
});

let frames = 0;
let pipes = [];
const bird = new Bird();

const removeUneccessaryPipes = (pipes) => {
  return pipes.filter((pipe) => pipe.x > -20);
};

const frame = function () {
  if (frames % 50 === 0) {
    pipes = removeUneccessaryPipes(pipes);
    pipes.push(new Pipe());
  }
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  bird.update();
  bird.draw(ctx);
  pipes.forEach((pipe) => {
    pipe.update();
    pipe.draw(ctx);
    if (pipe.didCollide(bird) || bird.y > HEIGHT) {
      showGameOver();
    }
  });
  frames++;
};
const showGameOver = function () {
  clearInterval(gameInterval);
  ctx.font = "24px Arial";
  ctx.fillText("Game over", 170, HEIGHT / 2 - 24);
};
frame();
let gameInterval = setInterval(frame, FRAME_INTERVAL);
