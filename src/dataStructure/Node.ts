export class Node<T = any> {
  public _left: Node<T> | null = null;
  public _right: Node<T> | null = null;

  constructor(public data: T) {}
}
