const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = WIDTH;
canvas.height = HEIGHT;

// document.addEventListener("keydown", (ev) => {
//   if (ev.keyCode === 32) {
//     bird.goUp();
//   }
// });

let frames = 0;
let gens = 0;
let pipes = [];
const population = new Population(POP_SIZE);
const removeUneccessaryPipes = (pipes) => {
  return pipes.filter((pipe) => pipe.x > -20);
};
const getClosestPipe = (bird) => {
  for (const pipe of pipes) {
    if (pipe.x < bird.x + bird.radius) {
      continue;
    }
    return pipe;
  }
};

const frame = function () {
  if (frames % 50 === 0) {
    pipes = removeUneccessaryPipes(pipes);
    pipes.push(new Pipe());
  }
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  population.members.forEach((bird) => {
    bird.decide(getClosestPipe(bird));
    bird.update();
    bird.draw(ctx);
  });
  pipes.forEach((pipe) => {
    pipe.update();
    pipe.draw(ctx);

    population.members.forEach((bird, index) => {
      if (pipe.didCollide(bird) || bird.y > HEIGHT || bird.y < 0) {
        population.remove(index);
      }
    });
  });
  frames++;
  if (population.members.length === 0) {
    clearInterval(gameInterval);
    frames = 0;
    gameInterval = setInterval(frame, FRAME_INTERVAL);
    pipes = [];
    population.repopulate(MUT_RATE);
  }
};
// const showGameOver = function () {
//   ctx.font = "24px Arial";
//   ctx.fillText("Game over", 170, HEIGHT / 2 - 24);
// };
// frame();
let gameInterval = setInterval(frame, FRAME_INTERVAL);
// const nn = new NeuralNetwork([2, 2, 1]);
// nn.w2
