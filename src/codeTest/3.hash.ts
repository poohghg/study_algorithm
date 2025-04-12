export default {};

/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/131127
 *
 */

class HashData<T extends PropertyKey> {
  private hash: Map<T, number> = new Map<T, number>();

  constructor(initData: T[]) {
    this.makeHash(initData);
  }

  get data() {
    return this.hash;
  }

  public deleteHashItem(item: T) {
    if (!this.hash.has(item)) return;

    const count = this.hash.get(item)!;

    count === 1 ? this.hash.delete(item) : this.hash.set(item, count - 1);
  }

  public addHashItem(item: T) {
    const count = this.hash.get(item);

    count === undefined
      ? this.hash.set(item, 1)
      : this.hash.set(item, count + 1);
  }

  private makeHash(arr: T[]) {
    for (const item of arr) {
      const value = this.hash.has(item) ? this.hash.get(item)! + 1 : 1;
      this.hash.set(item, value);
    }
  }
}

const solution1 = (want: string[], number: number[], discount: string[]) => {
  /**
   * todo 1 정현이가 원하는 상품의 hash 테이블을 생성한다.
   * todo 2 회원가입후 10일 동안 discount 품목의 hash 테이블을 생성한다.
   * 정현이가 원하는 품목이 다음 10일 내 discount 품목에 모두 포함되는지 확인한다.
   */

  const isJoin = (hash: Map<string, number>) => {
    for (const [key, value] of wantHash.entries()) {
      if (!hash.has(key)) return false;
      if (value > (hash.get(key) ?? 0)) return false;
    }

    return true;
  };

  const wantHash = want.reduce(
    (hash, item, index) => {
      hash.set(item, number[index]);
      return hash;
    },
    new Map() as Map<string, number>,
  );

  const discountHash = new HashData(discount.slice(0, 10));
  let result = 0;

  for (const [index, discountItem] of discount.entries()) {
    if (index !== 0) {
      discountHash.deleteHashItem(discount[index - 1]);
      const plusItem = discount[index + 9];
      if (plusItem) discountHash.addHashItem(plusItem);
    }

    if (isJoin(discountHash.data)) result++;
  }

  return result;
};

// console.log(
//   solution1(
//     ['banana', 'apple', 'rice', 'pork', 'pot'],
//     [3, 2, 2, 2, 1],
//     [
//       'chicken',
//       'apple',
//       'apple',
//       'banana',
//       'rice',
//       'apple',
//       'pork',
//       'banana',
//       'pork',
//       'rice',
//       'pot',
//       'banana',
//       'apple',
//       'banana',
//     ],
//   ),
// );

/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/42888
 * 오픈채팅방
 */
const solution2 = (record: string[]) => {
  const userIdMap: Record<string, string> = {};
  const msgRecord: [string, string][] = [];

  for (const info of record) {
    const [status, id, nickname] = info.split(' ');
    if (status !== 'Leave') userIdMap[id] = nickname;
    if (status !== 'Change') {
      msgRecord.push([id, status]);
    }
  }

  return msgRecord.map(([id, status]) => {
    const msg = status === 'Enter' ? '들어왔습니다.' : '나갔습니다';
    return `${userIdMap[id]}님이 ${msg}`;
  });
};

// console.log(
//   solution2([
//     'Enter uid1234 Muzi',
//     'Enter uid4567 Prodo',
//     'Leave uid1234',
//     'Enter uid1234 Prodo',
//     'Change uid4567 Ryan',
//   ]),
// );

const solution3 = (id_list: string[], report: string[], k: number) => {
  const reportCountMap = new Map(id_list.map((id) => [id, 0]));
  // 신고한 유저 키 + 신고 목록
  const reportInfo = new Map(
    id_list.map((id): [string, Set<string>] => [id, new Set()]),
  );

  for (const line of report) {
    const [reporter, recipient] = line.split(' ');
    if (!reportInfo.get(reporter)!.has(recipient)) {
      reportCountMap.set(recipient, (reportCountMap.get(recipient) || 0) + 1);
    }

    reportInfo.set(reporter, reportInfo.get(reporter)!.add(recipient));
  }

  return id_list.map((id) => {
    let count = 0;
    const reportList = reportInfo.get(id)!;
    reportList.forEach((value) => {
      if (reportCountMap.get(value)! >= k) count++;
    });
    return count;
  });
};

console.log(
  solution3(
    ['muzi', 'frodo', 'apeach', 'neo'],
    ['muzi frodo', 'apeach frodo', 'frodo neo', 'muzi neo', 'apeach muzi'],
    2,
  ),
);
