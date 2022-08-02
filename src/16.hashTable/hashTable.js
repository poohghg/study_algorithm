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
    let index = this._hash(key);
    if (!this.keyMap[index]) this.keyMap[index] = [];
    this.keyMap[index].push([key, value]);
  }
}

const hashTable = new HashTable(13);
hashTable.set('a', 1);
hashTable.set('a', 12);
console.log(hashTable);
