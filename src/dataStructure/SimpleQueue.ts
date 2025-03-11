export default class SimpleQueue<T> {
  private items: Map<number, T> = new Map();
  private headIndex = 0;
  private tailIndex = 0;

  constructor(data?: T | T[]) {
    if (!data) return;

    if (Array.isArray(data)) {
      data.forEach((value) => this.enqueue(value));
    } else {
      this.enqueue(data);
    }
  }

  get size() {
    return this.tailIndex - this.headIndex;
  }

  get isEmpty() {
    return this.size === 0;
  }

  public enqueue(value: T) {
    this.items.set(this.tailIndex, value);
    this.tailIndex++;
  }

  public dequeue() {
    if (this.size === 0) return null;

    const item = this.items.get(this.headIndex);
    this.items.delete(this.headIndex);
    this.headIndex++;

    return item;
  }

  public peek() {
    return this.items.get(this.headIndex);
  }

  public has(value: T) {
    for (const v of this.items.values()) {
      if (v === value) return true;
    }
    return false;
  }

  public toArray() {
    return Array.from(this.items.values());
  }
}
