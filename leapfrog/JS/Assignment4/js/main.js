var canvas;
var context;
var road;
var yOffset = -744;
var speed = 7;
var gameButton;
var gameStart = false;
var gameButtonContainer;
var gameInstruction;
var playerCar;
var startTime;
var timeElapsed = 0;
var numOfEnemies = 5;
var enemies = [];
var lanes = [132, 204, 276];
var FPS = 60;
var GAP = 250;
var timeElapsedBoard;
var scoreBoard;
var gameLoopId;
var score = 0;
var speedUpdateDelay = 5; //in seconds
var speedUpdateTime = 0;
var timestamp = 0;
var bullets = [];
var BULLETS_PER_REPLENISHMENT = 4;
var bulletImage = new Image();
var ammos = [];
var ammoImage = new Image();
var MAX_BULLET_LENGTH = 20;
var previousLaneIndex = 0;

bulletImage.src = "images/bullet.png";
ammoImage.src = "images/weapon.png";

function init() {
  canvas = document.getElementById("carGame");
  context = canvas.getContext("2d");
  gameButtonContainer = document.querySelector(".game-info");
  gameButton = document.getElementById("gameButton");
  gameInstruction = document.querySelector(".info");
  timeElapsedBoard = document.getElementById("elapsedTime");
  scoreBoard = document.getElementById("score");

  canvas.height = 744;
  canvas.width = 474;

  road = new Image();
  road.src = "images/road.png";

  var playerHeight = 50;
  var playerWidth = 64;
  playerCar = new PlayerCar("tank.png", playerWidth, playerHeight, speed);

  road.onload = function () {
    context.drawImage(road, 0, yOffset + canvas.height);
    gameButton.addEventListener("click", handleGameStart);
  };

  generateEnemies();
  setImageLoadTrue();

  var numOfAmmos = 3;
  for (var i = 0; i < numOfAmmos; i++) {
    var ammo = new Ammo(ammoImage);
    ammos.push(ammo);
  }
}

function handleKeyEvent(e) {
  var key = e.key || e.code;
  switch (key) {
    case "ArrowLeft":
    case 37:
      playerCar.moveLeft(lanes);
      break;
    case "ArrowRight":
    case 39:
      playerCar.moveRight(lanes);
      break;
    case "ArrowUp":
    case 38:
      fireBullet();
      break;
  }
}

function gameLoop() {
  computeElapsedTime();

  if (yOffset >= 0) {
    yOffset = -744;
  }

  context.drawImage(road, 0, yOffset);
  context.drawImage(road, 0, yOffset + canvas.height);
  yOffset += playerCar.speed;

  playerCar.x = lanes[playerCar.laneIndex];
  playerCar.y = canvas.height - 2 * playerCar.height;

  if (detectCollision()) {
    handleCollision();
  }

  playerCar.render();
  renderEnemies();

  randomizeEnemyPosition();

  if (!gameStart) {
    cancelAnimationFrame(gameLoopId);
  }

  if (gameStart) {
    increaseSpeed();
    placeAmmo();
    updateBullte();
    gameLoopId = window.requestAnimationFrame(gameLoop);
  }
}

function handleGameStart() {
  if (!gameStart) {
    window.addEventListener("keydown", handleKeyEvent);
    score = 0;
    timeElapsed = 0;
    startTime = new Date().getTime();
    timestamp = new Date().getTime();
    gameStart = true;
    gameButton.textContent = "Play Again";
    gameButtonContainer.style.display = "none";
    gameInstruction.style.display = "none";

    resetGame();
    gameLoop();
  }
}

function computeElapsedTime() {
  var ONE_THOUSANDTH_SECOND = 1 / 1000;
  var time = new Date().getTime();
  timeElapsed += (time - startTime) * ONE_THOUSANDTH_SECOND;
  startTime = time;

  timeElapsedBoard.textContent = formatTime(timeElapsed);
}

function formatTime(numberOfSeconds) {
  var h = 0;
  var m = 0;
  var s = 0;
  var SECONDS_IN_HOUR = 3600;
  var SECONDS_IN_MINUTES = 60;

  h = parseInt(numberOfSeconds / SECONDS_IN_HOUR);
  m = parseInt((numberOfSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTES);
  s = parseInt(numberOfSeconds % (SECONDS_IN_MINUTES * SECONDS_IN_HOUR));

  if (h < 10) {
    h = "0" + h;
  }

  if (m < 10) {
    m = "0" + m;
  }

  if (s < 10) {
    s = "0" + s;
  }

  return h + " : " + m + " : " + s;
}

function generateEnemies() {
  for (var i = 0; i < numOfEnemies; i++) {
    var index = parseInt(Math.random() * 5) + 1;
    var image = "car-truck" + index + ".png";
    var enemy = new EnemyCar(image);
    enemies.push(enemy);
  }
}

function renderEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].updatePosition(lanes, playerCar.speed);
    enemies[i].render();
  }
}

function setImageLoadTrue() {
  playerCar.carImage.onload = function () {
    this.imageLoaded = true;
  }.bind(playerCar);

  for (var i = 0; i < enemies.length; i++) {
    enemies[i].carImage.onload = function () {
      this.imageLoaded = true;
      this.assignDefaultDimension();
      var randomIndex = parseInt(Math.random() * 4);
      var randomLane = parseInt(Math.random() * 3);
      this.laneIndex = randomLane;
      this.y = -GAP * randomIndex;
    }.bind(enemies[i]);
  }
}

function detectCollision() {
  for (var i = 0; i < enemies.length; i++) {
    if (playerCar.laneIndex == enemies[i].laneIndex) {
      var distance = playerCar.y - (enemies[i].y + enemies[i].height);
      if (distance <= 0 && enemies[i].y < playerCar.y + playerCar.height) {
        return true;
      }
    }
  }
  return false;
}

function handleCollision() {
  gameStart = false;
  window.removeEventListener("keydown", handleKeyEvent);
  document.querySelector(".game-info h1").style.display = "block";
  document.querySelector(".game-info h2").style.display = "block";
  gameButtonContainer.style.display = "block";
  gameInstruction.style.display = "block";
  document.getElementById("finalScore").textContent = score;
}

function resetGame() {
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].y = -(GAP * i);
  }
  scoreBoard.textContent = score;
  playerCar.speed = speed;
  if (bullets.length < BULLETS_PER_REPLENISHMENT) {
    replenishBullets();
    replenishBullets();
  }
  
  if (localStorage.getItem("highScore") != null) {
    document.querySelector(".game-info h3").style.display = "block";
  }
  initializeAmmo();
}

function randomizeEnemyPosition() {
  if (enemies.length < 2) {
    generateEnemies();
  }

  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i].y > canvas.height) {
      var randomLane = parseInt(Math.random() * 3);
      updateScore();

      while(randomLane == previousLaneIndex){
        randomLane = parseInt(Math.random() * 3);
      }

      previousLaneIndex = randomLane;
      var randomIndex = parseInt(Math.random() * 3);
      enemies[i].y = -GAP * randomIndex;
      enemies[i].laneIndex = randomLane;

      for (var j = 0; j < enemies.length; j++) {
        if (enemies[i].laneIndex == enemies[j].laneIndex) {
          if (enemies[i].y - enemies[j].y+enemies[j].height < GAP) {
            enemies[i].y -= GAP;

          }
        }
      }
      var k=1;
      for(var l=0; l<enemies.length; l++){
          if(enemies[l].y - enemies[l].height < -GAP) {
              enemies[l].y = -GAP*k;
              k++;
          }
      }
    }
  }
}

function updateScore() {
  score++;
  scoreBoard.textContent = score;

  if (localStorage.getItem("highScore") == null) {
    localStorage.setItem("highScore", score);
  } else {
    var highScore = parseInt(localStorage.getItem("highScore"));
    if (highScore < score) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
    }
  }

  document.querySelector("#highScore").textContent = localStorage.getItem(
    "highScore"
  );
}

function increaseSpeed() {
  var ONE_THOUSANDTH_SECOND = 1 / 1000;
  var time = new Date().getTime();
  speedUpdateTime += (time - timestamp) * ONE_THOUSANDTH_SECOND;
  timestamp = time;

  if (speedUpdateTime > speedUpdateDelay) {
    speedUpdateTime = 0;
    playerCar.speed++;
    if (playerCar.speed > 15) {
      playerCar.speed = 15;
    }
  }
}

function replenishBullets() {
  for (var i = 0; i < BULLETS_PER_REPLENISHMENT; i++) {
    var bullet = new Bullet(bulletImage);
    bullet.y = canvas.height - 2 * playerCar.height - bullet.height;
    bullets.push(bullet);
  }

  document.getElementById("bullets").textContent = bullets.length;
}

function fireBullet() {
  if (bullets.length > 0) {
    var bullet = bullets.pop();
    bullet.move(lanes, playerCar.laneIndex, enemies);
    document.getElementById("bullets").textContent = bullets.length;
  }
}

function placeAmmo() {
  for (var i = 0; i < ammos.length; i++) {
    ammos[i].y += playerCar.speed - enemies[0].speed;
    ammos[i].render();
  }
}

function initializeAmmo() {
  var OFFSET = 15;
  ammos[0].x = lanes[0] + OFFSET;
  ammos[1].x = lanes[1] + OFFSET;
  ammos[2].x = lanes[2] + OFFSET;

  ammos[0].y = -2 * canvas.height;
  ammos[1].y = -4 * canvas.height;
  ammos[2].y = -8 * canvas.height;
}

function updateBullte() {
  for (var i = 0; i < ammos.length; i++) {
    var distance = playerCar.y - (ammos[i].y + ammos[i].height);
    if (distance <= 0 && ammos[i].y < playerCar.y + playerCar.height) {
      if (bullets.length <= MAX_BULLET_LENGTH - BULLETS_PER_REPLENISHMENT) {
        replenishBullets();
      }

      var randomPositiion = -parseInt(Math.random() * 4 + 4) * canvas.height;
      ammos[i].y = randomPositiion;
    }
  }
}

window.onload = init;
