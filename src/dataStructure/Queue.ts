import { Node } from './Node';

export class Queue<T> {
  public first: Node<T> | null = null;
  public last: Node<T> | null = null;
  public size: number = 0;

  constructor(data?: T | T[]) {
    if (!data) return;

    if (Array.isArray(data)) {
      data.forEach((value) => this.enqueue(value));
    } else {
      this.enqueue(data);
    }
  }

  enqueue(value: T) {
    const newNode = new Node<T>(value);

    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last!.right = newNode;
      this.last = newNode;
    }
  }

  dequeue() {
    if (!this.first) return null;

    if (this.first === this.last) this.last = null;

    const returnValue = this.first;
    this.first = this.first.right;
    this.size--;

    return returnValue;
  }

  has(value: T) {
    let current = this.first;

    while (current) {
      if (current.value === value) return true;
      current = current.right;
    }

    return false;
  }

  toArray() {
    const result: T[] = [];
    let current = this.first;

    while (current) {
      result.push(current.value);
      current = current.right;
    }

    return result;
  }

  toString() {
    return this.toArray().join(' ');
  }
}
