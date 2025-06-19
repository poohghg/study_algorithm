export class Node<T = any> {
  constructor(value: T) {
    this._value = value;
  }

  private _right: Node<T> | null = null;

  get right() {
    return this._right;
  }

  set right(node: Node<T> | null) {
    this._right = node;
  }

  private _left: Node<T> | null = null;

  get left() {
    return this._left;
  }

  set left(node: Node<T> | null) {
    this._left = node;
  }

  private _value: T;

  get value() {
    return this._value;
  }

  set value(newValue: T) {
    this._value = newValue;
  }
}
