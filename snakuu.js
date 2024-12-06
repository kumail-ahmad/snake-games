const gameBoard = document.querySelector("#gameBoard");
const context = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const unitSize = 25;
let running = false;
let xVelocity = unitSize,
  yVelocity = 0,
  foodX,
  foodY,
  score = 0;
let speed = 100;
let snake = [
  { x: 125, y: 0 },
  { x: 100, y: 0 },
  { x: 75, y: 0 },
  { x: 50, y: 0 },
  { x: 25, y: 0 },
  { x: 0, y: 0 },
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

function gameStart() {
  running = true;
  scoreText.textContent = score;
  createFood();
  nextTick();
}

function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, speed);
  } else displayGameOver();
}

function clearBoard() {
  context.fillStyle = "white";
  context.fillRect(0, 0, gameWidth, gameHeight);
}

function createFood() {
  foodX = Math.floor(Math.random() * (gameWidth / unitSize)) * unitSize;
  foodY = Math.floor(Math.random() * (gameHeight / unitSize)) * unitSize;
}

function drawFood() {
  context.fillStyle = "red";
  context.beginPath();
  context.arc(
    foodX + unitSize / 2,
    foodY + unitSize / 2,
    unitSize / 2,
    0,
    Math.PI * 2
  );
  context.fill();
  context.closePath();
  context.fill();
  context.closePath();
}

function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);
  if (head.x === foodX && head.y === foodY) {
    score++;
    scoreText.textContent = score;
    createFood();
  } else snake.pop();
}

function drawSnake() {
  context.fillStyle = "white";
  context.strokeStyle = "green";
  snake.forEach((part) => {
    context.fillRect(part.x, part.y, unitSize, unitSize);
    context.strokeRect(part.x, part.y, unitSize, unitSize);
  });
}

function changeDirection(event) {
  const key = event.keyCode;
  const LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40;
  const goingUp = yVelocity === -unitSize,
    goingDown = yVelocity === unitSize;
  const goingRight = xVelocity === unitSize,
    goingLeft = xVelocity === -unitSize;
  if (key === LEFT && !goingRight) [xVelocity, yVelocity] = [-unitSize, 0];
  if (key === UP && !goingDown) [xVelocity, yVelocity] = [0, -unitSize];
  if (key === RIGHT && !goingLeft) [xVelocity, yVelocity] = [unitSize, 0];
  if (key === DOWN && !goingUp) [xVelocity, yVelocity] = [0, unitSize];
}

function checkGameOver() {
  if (
    snake[0].x < 0 ||
    snake[0].x >= gameWidth ||
    snake[0].y < 0 ||
    snake[0].y >= gameHeight
  )
    running = false;
  // for (let i = 4; i < snake.length; i++) {
  //   if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) running = false;
  // }
}

function displayGameOver() {
  context.fillStyle = "black";
  context.font = "50px arial";
  context.fillText("GAME OVER", gameWidth / 4.9, gameHeight / 1.9);
}

function resetGame() {
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;
  snake = [
    { x: 100, y: 0 },
    { x: 75, y: 0 },
    { x: 50, y: 0 },
    { x: 25, y: 0 },
  ];
  gameStart();
}

gameStart();

//@KUMAIL-AHMAD
