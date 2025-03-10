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
      this.last!._right = newNode;
      this.last = newNode;
    }
    return this.size++;
  }

  dequeue() {
    if (!this.first) return null;

    const value = this.first;

    if (this.first === this.last) {
      this.last = null;
    }

    this.first = this.first._right;
    this.size--;

    return value.data;
  }

  has(value: T) {
    let current = this.first;

    while (current) {
      if (current.data === value) return true;
      current = current._right;
    }

    return false;
  }

  toArray() {
    const result: T[] = [];
    let current = this.first;

    while (current) {
      result.push(current.data);
      current = current._right;
    }

    return result;
  }

  toString() {
    return this.toArray().join(' ');
  }
}
