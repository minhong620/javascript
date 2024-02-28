const $input = document.querySelector("#input");
const $form = document.querySelector("#form");
const $logs = document.querySelector("#logs");

const numbers = [];
for (let n = 0; n < 9; n += 1) {
  numbers.push(n + 1);
}

const answer = [];
for (let n = 0; n <= 3; n += 1) {
  const index = Math.floor(Math.random() * numbers.length);
  answer.push(numbers[index]);
  numbers.splice(index, 1); // 원래꺼 빼주기
}
console.log(answer);

const tries = [];
function checkInput(input) {
  if (input.length !== 4) {
    return alert("4자리가 아님");
  }
  if (new Set(input).size !== 4) {
    // new Set은 알아서 중복을 제거해줌, length가 아닌 size를 씀
    return alert("중복 안된다~");
  }
  if (tries.includes(input)) {
    return alert("이미 입력해봄");
  }
  return true;
}

let out = 0;
$form.addEventListener("submit", (event) => {
  // form이 있으면 form에 event추가하기
  event.preventDefault(); // 기본 동작 막기
  const value = $input.value;
  $input.value = ""; // 사용자 편의를 위한 센스

  // 입력값에 문제가 있음
  if (!checkInput(value)) {
    return;
  }
  // 입력값에 문제 없음
  if (answer.join("") === value) {
    // join(",")이 기본이라 ,(콤마)가 없어짐
    $logs.textContent = "홈런!";
    return;
  }
  if (tries.length >= 9) {
    const message = document.createTextNode(`패배! 정답은 ${answer.join("")}`);
    $logs.appendChild(message);
    return;
  }

  let strike = 0;
  let ball = 0;
  for (let i = 0; i < answer.length; i++) {
    const index = value.indexOf(answer[i]); // 겹치면 -1보다 큰 수 반환, 안 겹치면 -1반환
    if (index > -1) {
      // 일치하는 숫자 발견
      if (index === i) {
        // 자릿수도 같음
        ++strike;
      } else {
        // 숫자만 같음
        ++ball;
      }
    }
  }
  if (strike === 0 && ball === 0) {
    ++out;
    console.log(out);
    $logs.append(`${value} : ${out}아웃`, document.createElement("br"));
  } else {
    $logs.append(
      `${value} : ${strike}스트라이크 ${ball}볼`,
      document.createElement("br")
    );
  }
  if (out === 3) {
    const message = document.createTextNode(`패배! 정답은 ${answer.join("")}`);
    $logs.appendChild(message);
    return;
  }
  tries.push(value);
});
