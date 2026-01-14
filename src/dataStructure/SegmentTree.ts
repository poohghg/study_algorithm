export class SegmentTree {
  private readonly size: number;
  private readonly tree: number[];

  constructor(arr: number[]) {
    this.size = arr.length;
    this.tree = new Array(this.size * 4).fill(0);
    this.build(arr, 1, 0, this.size - 1);
  }

  query(l: number, r: number) {
    this._query(1, 0, this.size - 1, l, r);
  }

  update(index: number, value: number) {
    this._update(1, 0, this.size - 1, index, value);
  }

  private build(arr: number[], node: number, start: number, end: number) {
    if (start === end) {
      this.tree[node] = arr[start];
      return;
    }

    const mid = Math.floor((start + end) / 2);
    const left = node * 2;
    const right = node * 2 + 1;

    this.build(arr, left, start, mid);
    this.build(arr, right, mid + 1, end);
    this.tree[node] = this.tree[left] + this.tree[right];
  }

  private _query(
    node: number, // [start,end] 구간의 합
    s: number, // 현재 노드 구간
    e: number, // 현재 노드 구간
    l: number, // 쿼리 범위 l
    r: number, // 쿼리 범위 r
  ): number {
    if (r < s || e < l) {
      return 0;
    }

    if (l <= s && e <= r) {
      return this.tree[node];
    }

    const mid = Math.floor((s + e) / 2);
    const left = node * 2;
    const right = node * 2 + 1;

    return (
      this._query(left, s, mid, l, r) + this._query(right, mid + 1, e, l, r)
    );
  }

  private _update(
    node: number,
    start: number,
    end: number,
    index: number,
    value: number,
  ) {
    if (start === end) {
      this.tree[node] = value;
      return;
    }

    const mid = Math.floor((start + end) / 2);
    const left = node * 2;
    const right = node * 2 + 1;

    if (index <= mid) {
      this._update(left, start, mid, index, value);
    } else {
      this._update(right, mid + 1, end, index, value);
    }

    // 해당 구간을 업데이트한다.
    this.tree[node] = this.tree[left] + this.tree[right];
  }
}
