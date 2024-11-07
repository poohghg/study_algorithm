/** 
문제1 
앞에서 읽을 때나 뒤에서 읽을 때나 같은 문자열을 회문 문자열이라고 합니다.
문자열이 입력되면 해당 문자열이 회문 문자열이면 "YES", 회문 문자열이 아니면 “NO"를 출력 하는 프로그램을 작성하세요.
단 회문을 검사할 때 대소문자를 구분하지 않습니다.
*/
function solution_1_my(_str) {
  let answer = "YES";
  let strLastLen = _str.length - 1;
  const str = String(_str).toLowerCase();

  for (let i = 0; i < Math.ceil(strLastLen / 2); i++) {
    if (str[i] !== str[strLastLen - i]) {
      answer = "NO";
      break;
    }
  }
  return answer;
}
// console.log("solution_1_my", solution_1("gooG"));

function solution_1(_str) {
  const str = String(_str).toLowerCase();
  const reversStr = str.split("").reverse().join("");

  if (str === reversStr) return "YES";
  return "NO";
}

// console.log("solution_1_my", solution_1("gooG"));

/*
문제2
앞에서 읽을 때나 뒤에서 읽을 때나 같은 문자열을 팰린드롬이라고 합니다.
문자열이 입력되면 해당 문자열이 팰린드롬이면 "YES", 아니면 “NO"를 출력하는 프로그램을 작성하세요.
단 회문을 검사할 때 알파벳만 가지고 회문을 검사하며, 대소문자를 구분하지 않습니다. 알파벳 이외의 문자들의 무시합니다.
*/

function solution_2_my(_str) {
  // * 대괄호[] 안에서 앞에 ^를 쓰면, 부정(Not)의 기능을 합니다.
  ///[^a-zA-Z]/g
  const str = _str.toLowerCase().replace(/[^a-z]/g, "");
  if (str !== str.split("").reverse().join("")) return "NO";
  return "YES";
}

// console.log(
//   "solution_2_my",
//   solution_2_my("found7,time: study; Yduts; emit, 7Dnuof")
// );

/**
문제3.숫자만 추출
문자와 숫자가 섞여있는 문자열이 주어지면 그 중 숫자만 추출하여 그 순서대로 자연수를 만 듭니다.
만약 “tge0a1h205er”에서 숫자만 추출하면 0, 1, 2, 0, 5이고 이것을 자연수를 만들면 1205 이 됩니다.
추출하여 만들어지는 자연수는 100,000,000을 넘지 않습니다.
 */

function solution_3_my(str) {
  return Number.parseInt(str.replace(/[^0-9]/g, ""), 10);
}

function solution_3(str) {
  let answer = 0;
  for (const x of str) {
    // 자릿수를 올려준다
    if (!isNaN(x)) answer = answer * 10 + Number(x);
  }
  return Number.parseInt(answer, 10);
}

// console.log("solution_3", solution_3("tge0a1h205er"));

/**
 문자거리
 문제4
 한 개의 문자열 s와 문자 t가 주어지면 문자열 s의 각 문자가 
 문자 t와 떨어진 최소거리를 출 력하는 프로그램을 작성하세요.
 */

function solution_4_my(str, searchStr) {
  // let dustance = 0;
  const answer = [];
  const strLen = str.length;

  for (let i = 0; i < strLen; i++) {
    if (str[i] === searchStr) {
      answer.push(0);
      continue;
    }
    let distance = 1;
    while (distance < strLen) {
      if (str[i + distance] === searchStr || str[i - distance] === searchStr) {
        answer.push(distance);
        break;
      } else {
        distance++;
      }
    }
  }

  return answer;
}

function solution_4(str, searchStr) {
  // 시간복잡도로인해 for문을 두번돈다.
  let answer = [];
  // searchStr와 의거리
  let p = str.length;
  for (const x of str) {
    if (x === searchStr) {
      p = 0;
      answer.push(p);
    } else {
      p++;
      answer.push(p);
    }
  }

  p = str.length;
  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] === searchStr) {
      p = 0;
    } else {
      p++;
      answer[i] = Math.min(p, answer[i]);
    }
  }
  return answer;
}

// console.log("solution_4", solution_4("teachermode", "e"));

/*
문제5
알파벳 대문자로 이루어진 문자열을 입력받아 같은 문자가 연속으로 반복되는 경우 반복되는 문자
바로 오른쪽에 반복 횟수를 표기하는 방법으로 문자열을 압축하는 프로그램을 작성하시 
오. 단 반복횟수가 1인 경우 생략합니다.
*/

function solution_5_my(str) {
  let answer = "";
  let cnt = 1;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      cnt++;
    } else {
      answer += str[i];
      if (cnt > 1) {
        answer += cnt;
      }
      cnt = 1;
    }
  }
  return answer;
}

console.log("solution_5_my", solution_5_my("KKHSSSSSSSE"));
