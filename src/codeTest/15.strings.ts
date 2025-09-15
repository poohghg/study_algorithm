export default {};

//https://www.hackerrank.com/challenges/two-characters/problem?isFullScreen=true
const alternate = (s: string): number => {
  const validStringSize = (remainStrings: string[]) => {
    const filteredStrings = [...s].filter((str) => remainStrings.includes(str));

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

console.log(alternate('beabeefeab'));
