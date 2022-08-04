class HashTable {
  #size;
  constructor(size = 53) {
    this.keyMap = new Array(size);
    this.#size = size;
  }

  _hash(key) {
    let total = 0;
    // 소수는 충돌횟수를 줄이고 데이터의 분포를 넓힌다.
    let WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % this.#size;
    }
    return total;
  }
  set(key, value) {
    const index = this._hash(key);
    if (!this.keyMap[index]) this.keyMap[index] = [];
    const indexArr = this.keyMap[index];
    for (let i = 0; i < indexArr.length; i++) {
      const element = indexArr[i];
      if (element[0] === key) {
        element[1] = value;
        return;
      }
    }
    this.keyMap[index].push([key, value]);
  }
  get(key) {
    const index = this._hash(key);
    const indexArr = this.keyMap[index];
    if (!indexArr) return undefined;
    return indexArr.find((v) => v[0] === key);
  }
  keys() {
    return [].concat(...this.keyMap).reduce((prev, curr) => {
      if (curr) prev.push(curr[0]);
      return prev;
    }, []);
  }
  values() {
    return [].concat(...this.keyMap).reduce((prev, curr) => {
      if (curr) prev.add(curr[1]);
      return prev;
    }, new Set());
  }
}

const hashTable = new HashTable(13);
hashTable.set('a', 1);
hashTable.set('a', 13);
hashTable.set('aaaa', 12);
hashTable.set('aaaa', 12);
console.log(hashTable.get('a'));
console.log(hashTable.values());
console.log(hashTable.keys());
