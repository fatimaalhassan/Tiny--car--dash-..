/*-------------- Constants -------------*/
const colors = ["red", "blue", "green"];

/*---------- Variables (state) ---------*/
let playerCar = { x: 50, y: 100, speed: 0, color: "red" };
let opponentCar = { x: 50, y: 100, speed: 1, color: "blue" };
let timeLeft = 10;
let raceInterval, timerInterval;

/*----- Cached Element References  -----*/
const startScreen = document.getElementById("start-screen");
const gameContainer = document.getElementById("game-container");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const canvas = document.getElementById("gameCanvas"); 
const ctx = canvas.getContext("2d");
const colorButtons = document.querySelectorAll(".color-btn");
const timerEl = document.getElementById("timer");
const resultInnerText = document.getElementById("result-text");
const playAgainBtn = document.getElementById("play-again-btn");
const redBtn = document.getElementById("red-btn");
const blueBtn = document.getElementById("blue-btn");
const greenBtn = document.getElementById("green-btn");
const streetY = 350;
 const selectRedCar = document.querySelector(".red");
  const selectblueCar = document.querySelector(".blue");
 const selectgreenCar = document.querySelector(".green");
 const scoreEl=document.getElementById("score");

/*---------- Images ----------*/
const trackImg = new Image();
trackImg.src = "assets/background.jpg";

const redCarImg = new Image();
redCarImg.src = "assets/red-car.png";

const blueCarImg = new Image();
blueCarImg.src = "assets/blue-car.png";

const greenCarImg = new Image();
greenCarImg.src = "assets/greencar.png";

/*-------------- Functions -------------*/
selectRedCar.addEventListener("click", setRedCar)

function setRedCar(){
    playerCar.color = "red"
    console.log(playerCar.color)
}
selectblueCar.addEventListener("click", setblueCar)

function setblueCar(){
    playerCar.color = "blue"
    console.log(playerCar.color)
}
selectgreenCar.addEventListener("click", setgreenCar)


function setgreenCar(){
    playerCar.color = "green"
    console.log(playerCar.color)
}

function startRace(){
  timeLeft = 10;
  playerCar.x = 30;
  playerCar.y = streetY;
  opponentCar.x = 30;
  opponentCar.y = streetY; 
  playerCar.speed = 0;
  opponentCar.speed = 2;

  timerEl.textContent = timeLeft; 

  raceInterval = setInterval(updateRace, 1000 / 60);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) endRace();
  }, 1000);

}
function updateRace() {
  playerCar.x += playerCar.speed;
  opponentCar.x += opponentCar.speed * 0.8;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(trackImg, 0, 0, canvas.width, canvas.height);

  let playerImg = getCarImage(playerCar.color);
  ctx.drawImage(playerImg, playerCar.x, playerCar.y, 70, 50);

  let opponentImg = getCarImage(opponentCar.color);
  ctx.drawImage(opponentImg, opponentCar.x, opponentCar.y, 70, 50);
}


function getCarImage(color) {
  if (color === "red") return redCarImg;
  if (color === "blue") return blueCarImg;
  if (color === "green") return greenCarImg;
}

function endRace() {
  clearInterval(raceInterval);
  clearInterval(timerInterval);

  gameContainer.classList.add("hidden");
  resultScreen.classList.remove("hidden");

resultInnerText.textContent = playerCar.x > opponentCar.x ? "You Win!" : "You Lose!";
}

/*-------------- Event Listeners -------------*/
startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  startRace();
});
let score=0;
colorButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const clickedColor = btn.dataset.color;
    if (clickedColor === playerCar.color) {
      playerCar.speed += 1; 
      score +=1;
      scoreEl.textContent=score;
    } else {
      playerCar.speed = Math.max(1, playerCar.speed - 1); 
    }
  });
});

playAgainBtn.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});

redBtn.addEventListener("click", () => {
  if(playerCar.color === "red"){
    playerCar.speed += 1;
  }else {
    playerCar.speed = Math.max(1, playerCar.speed - 1);
  }
})


blueBtn.addEventListener("click", () => {
  if(playerCar.color === "blue"){
    playerCar.speed += 1;
  } else {
    playerCar.speed = Math.max(1, playerCar.speed - 1);
  }
});

greenBtn.addEventListener("click", () => {
  if(playerCar.color === "green"){
    playerCar.speed += 1;
  } else {
    playerCar.speed = Math.max(1, playerCar.speed - 1);
  }
});

