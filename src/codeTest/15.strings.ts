export default {};

//https://leetcode.com/problems/longest-common-prefix/
function longestCommonPrefix(strs: string[]): string {
  strs.sort((a, b) => {
    return a.localeCompare(b);
  });

  const first = strs[0];
  const last = strs[strs.length - 1];
  let result = '';

  for (let i = 0; i < Math.min(first.length, last.length); i++) {
    if (first[i] !== last[i]) break;
    result += first[i];
  }

  return result;
}

console.log(longestCommonPrefix(['flower', 'flow', 'flight']));
console.log(longestCommonPrefix(['dog', 'racecar', 'car']));

//https://leetcode.com/problems/zigzag-conversion/
function convert(s: string, numRows: number): string {
  if (numRows === 1) return s;

  const strArray = Array.from({ length: numRows }, (): string[] => []);
  let r = 0;
  let c = 0;
  let currentPattern: 'down' | 'upR' = 'down';

  for (let i = 0; i < s.length; i++) {
    strArray[r][c] = s[i];

    if (currentPattern === 'down') {
      r++;
    } else {
      r--;
      c++;
    }

    if (r === 0) {
      currentPattern = 'down';
    }

    if (r === numRows - 1) {
      currentPattern = 'upR';
    }
  }

  return strArray.flatMap((s) => s).join('');
}

// console.log(convert('PAYPALISHIRING', 4));
// console.log(convert('AB', 1));

//https://leetcode.com/problems/longest-palindromic-substring/
function longestPalindrome(s: string): string {
  const expand = (l: number, r: number) => {
    while (0 <= l && r <= s.length - 1 && s[l] === s[r]) {
      l--;
      r++;
    }
    return s.substring(l + 1, r);
  };

  let maxStr = '';
  for (let i = 0; i < s.length; i++) {
    const oddStr = expand(i, i);
    const evenStr = expand(i, i + 1);

    if (maxStr.length < oddStr.length) {
      maxStr = oddStr;
    }

    if (maxStr.length < evenStr.length) {
      maxStr = evenStr;
    }
  }

  return maxStr;
}

// console.log(longestPalindrome('baabad'));
// console.log(longestPalindrome('baabd'));

//https://www.hackerrank.com/contests/software-engineer-prep-kit/challenges/max-unique-substring-length-in-session/problem?isFullScreen=true
const maxDistinctSubstringLengthInSessions = (
  sessionString: string,
): number => {
  let currentSting: string = '';
  let result = 0;

  for (let i = 0; i < sessionString.length; i++) {
    const char = sessionString[i];

    if (char === '*') {
      currentSting = '';
      continue;
    }

    // 현재 문자열에 들어오는 문자가 있으면?
    // 앞에서부터 제거한다.
    while (currentSting.includes(char)) {
      currentSting = currentSting.substring(1);
    }

    currentSting += char;
    result = Math.max(result, currentSting.length);
  }

  return result;
};

// console.log(
//   maxDistinctSubstringLengthInSessions('aaabbb'), // 3
// );

//https://www.hackerrank.com/challenges/two-characters/problem?isFullScreen=true
const alternate = (s: string): number => {
  const validStringSize = (remainStrings: string[]) => {
    const filteredStrings = [...s].filter((char) =>
      remainStrings.includes(char),
    );

    for (let i = 1; i < filteredStrings.length; i++) {
      if (filteredStrings[i - 1] === filteredStrings[i]) return 0;
    }

    return filteredStrings.length;
  };

  const combinations = (arr: string[]): string[][] =>
    arr.flatMap((c, i) => arr.slice(i + 1).map((d) => [c, d]));

  return combinations([...new Set(s.split(''))])
    .map(validStringSize)
    .reduce((result, curr) => Math.max(result, curr), 0);
};

// console.log(alternate('beabeefeab'));

//https://www.hackerrank.com/challenges/repeated-string/problem?isFullScreen=true
const repeatedString = (s: string, n: number): number => {
  const size = s.length;
  const m = Math.floor(n / size);
  const r = n % size;

  return [...s.slice(0, r)].reduce(
    (acc, curr) => (curr === 'a' ? acc + 1 : acc),
    [...s].filter((c) => c === 'a').length * m,
  );
};

// console.log(repeatedString('aba', 11));
// console.log(repeatedString('abcd', 100));
//https://www.hackerrank.com/contests/software-engineer-prep-kit/challenges/check-non-identical-string-rotation/problem?isFullScreen=true
const isNonTrivialRotation = (s1: string, s2: string): boolean => {
  if (s1 === s2) return false;
  return (s1 + s1).includes(s2);
};

// console.log(isNonTrivialRotation('abcde', 'cdeab'));
