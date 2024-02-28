const $form = document.querySelector("#form");
const $result = document.querySelector("#result");
const $bonus = document.querySelector("#bonus");
const $myResult = document.querySelector("#myResult");
// 함수는 최대한 위에다가 정의하기!
function drawBall($target, value) {
  const $ball = document.createElement("div");
  $ball.className = "ball";
  $ball.textContent = value;
  $target.appendChild($ball);
}

const setTimeoutPromise = (ms) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });

let clicked = false; // 플래그변수 선언
$form.addEventListener("submit", async (event) => {
  event.preventDefault(); // 가장 위에 있어야함
  if (clicked) {
    return; // 추첨이 계속되는 것을 막기 위해
  }
  clicked = true;
  const string = event.target.input.value;
  // console.log(string);
  if (!string.trim()) {
    // 빈 문자열 잡아내기 위해
    return alert("숫자를 입력하세요.");
  }
  const myNumbers = string.split(",").map((v) => parseInt(v.trim()));
  if (myNumbers.length !== 6) {
    return alert("숫자를 6개 입력하세요.");
  }
  if (new Set(myNumbers).size !== 6) {
    return alert("중복된 숫자를 입력했습니다.");
  }
  if (myNumbers.find((v) => v > 45 || v < 1)) {
    return alert("1부터 45까지만 입력할 수 있습니다.");
  }
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length) {
    const random = Math.floor(Math.random() * candidate.length);
    const spliceArray = candidate.splice(random, 1);
    const value = spliceArray[0];
    shuffle.push(value);
  }
  console.log(shuffle);
  const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
  const bonus = shuffle[6];
  console.log(winBalls, bonus);

  for (let i = 0; i < winBalls.length; i++) {
    await setTimeoutPromise(1000);
    drawBall($result, winBalls[i]);
  }
  await setTimeoutPromise(1000);
  drawBall($bonus, bonus);
  await setTimeoutPromise(0); // 실제로는 0초가 아닌 4밀리초

  let count = 0;
  myNumbers.forEach((my) => {
    if (winBalls.includes(my)) {
      count++;
    }
  });
  if (count === 6) {
    $myResult.append(`${count}개 맞히셔서 1등!`);
  } else if (count === 5) {
    if (myNumbers.includes(bonus)) {
      $myResult.append(`${count}개 맞히셔서 2등!`);
    } else {
      $myResult.append(`${count}개 맞히셔서 3등!`);
    }
  } else if (count === 4) {
    $myResult.append(`${count}개 맞히셔서 4등!`);
  } else if (count === 3) {
    $myResult.append(`${count}개 맞히셔서 5등!`);
  } else {
    $myResult.append(`${count}개 맞히셔서 꽝!`);
  }
});
