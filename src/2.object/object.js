function basicObject() {
  const obj = {
    a: 'A',
    b: 'B',
    c: 'C',
  };
  // O(n) 선형시간.
  Object.keys(obj);
  Object.values(obj);
  Object.entries(obj);
  // O(1) 상수시간.
  obj.hasOwnProperty(a);
}

function basicArray() {
  function pushAndPop(params) {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 10];
    // 배열의 마지막 요소를 조작하는 경우 O(1) 상수시간이다.
    array.push(11);
    array.push(12);
    const lastElemet = array.pop();
    console.log(array);
  }

  function shiftAndUnShift(params) {
    // 배열의 첫번째 요소를 조작하면 O(n)선형시간.
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    array.shift();
    array.unshift(11);
    // console.log(array);
    // array.splice(0, 5);
    console.log(array);
  }
  pushAndPop();
  shiftAndUnShift();
}
// basicArray();
