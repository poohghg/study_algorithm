function same(arr1, arr2) {
  let answer = true;
  for (const x of arr1) {
    // const findIndex = arr2.findIndex((v) => x ** 2 === v);
    const findIndex = arr2.indexOf(x ** 2);
    if (findIndex === -1) {
      answer = false;
      break;
    }
    arr2.splice(findIndex, 1);
  }
  return answer;
}

function refactoringSame(arr1, arr2) {
  let frequencyCounter1 = {};
  let frequencyCounter2 = {};
  for (let val of arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }
  for (let val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }
  console.log(frequencyCounter1);
  console.log(frequencyCounter2);
  for (let key in frequencyCounter1) {
    if (!(key ** 2 in frequencyCounter2)) {
      return false;
    }
    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
      return false;
    }
  }
  return true;
}

console.log(refactoringSame([1, 2, 3, 2, 5], [9, 1, 4, 4, 25]));
