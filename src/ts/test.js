const t = (str1, str2) => {
  const makeCountMap = (str) => {
    const countMap = {};
    for (const s of str) countMap[s] = (countMap[s] || 0) + 1;
    return countMap;
  };

  const str1CountMap = makeCountMap(str1);
  const str2CountMap = makeCountMap(str2);
  const commonString = [];

  for (let i = 9; 0 <= i; i--) {
    const count = Math.min(str1CountMap[i], str2CountMap[i]);

    for (let j = 1; j <= count; j++) {
      commonString.push(i);
    }
  }

  return commonString.length === 0
    ? -1
    : commonString[0] === 0
      ? '0'
      : commonString.join('');
};

// console.log(t('99999999999999999999', '99999999999999999999'));
console.log(t('12233', '133'));
