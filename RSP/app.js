const $computer = document.querySelector("#computer");
const $score = document.querySelector("#score");
const $rock = document.querySelector("#rock");
const $scissors = document.querySelector("#scissors");
const $paper = document.querySelector("#paper");
const IMG_URL = "./rsp.png";
$computer.style.background = `url(${IMG_URL}) 0 0`;
$computer.style.backgroundSize = "auto 200px";

const rspX = {
  scissors: "0",
  rock: "-220px",
  paper: "-440px",
};

let computerChoice = "scissors";
const changeHand = () => {
  if (computerChoice === "scissors") {
    // 가위면
    computerChoice = "rock";
    $computer.style.background = `url(${IMG_URL}) ${rspX.rock} 0`;
    $computer.style.backgroundSize = "auto 200px"; // background를 바꿀 때는 size도 같이 바꿔줘야함
  } else if (computerChoice === "rock") {
    // 바위면
    computerChoice = "paper";
    $computer.style.background = `url(${IMG_URL}) ${rspX.paper} 0`;
    $computer.style.backgroundSize = "auto 200px";
  } else if (computerChoice === "paper") {
    // 보면
    computerChoice = "scissors";
    $computer.style.background = `url(${IMG_URL}) ${rspX.scissors} 0`;
    $computer.style.backgroundSize = "auto 200px";
  }
};
let intervalId = setInterval(changeHand, 50);

const scoreTable = {
  rock: 0,
  scissors: 1,
  paper: -1,
};

let clickable = true;
let score = 0;
const clickButton = (event) => {
  if (clickable) {
    clearInterval(intervalId); // setInterval과 짝
    clickable = false;
    const myChoice = event.target.id;
    const myScore = scoreTable[myChoice];
    const computerScore = scoreTable[computerChoice];
    const diff = myScore - computerScore;
    let message = "";
    if (diff === 2 || diff === -1) {
      score += 1;
      message = "승리";
    } else if (diff === -2 || diff === 1) {
      score -= 1;
      message = "패배";
    } else {
      message = "무승부";
    }
    $score.textContent = `${message} 총: ${score}점`;
    setTimeout(() => {
      clickable = true;
      intervalId = setInterval(changeHand, 50);
    }, 1000);
  }
};

$rock.addEventListener("click", clickButton);
$scissors.addEventListener("click", clickButton);
$paper.addEventListener("click", clickButton);
