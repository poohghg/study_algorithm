const test1 = (n, k) => {
  let result = 0;
  const record = [];

  const dfs = (oneCount) => {
    if (record.length === n) {
      if (record.filter((v) => v === 1).length === k) {
        if (parseInt(record.join(''), 2) % 3 === 0) result++;
      }
      return;
    }

    record.push(0);
    dfs();
    record.pop();

    record.push(1);
    dfs();
    record.pop();
  };

  dfs(0);
  return result;
};

console.log(test1(3, 2));
