export default {};

//https://leetcode.com/problems/design-task-manager/?envType=daily-question&envId=2026-02-14

// [userId, taskId, priority]
// [userId, taskId, priority]
type Task = [number, number, number];

class TaskManager {
  private data: Task[] = [];
  private taskMap = new Map<number, Task>();

  constructor(tasks: Task[]) {
    for (const task of tasks) {
      this.add(task[0], task[1], task[2]);
    }
  }

  get tasks() {
    return this.data.slice();
  }

  add(userId: number, taskId: number, priority: number): void {
    const task: Task = [userId, taskId, priority];
    this.taskMap.set(taskId, task);
    this.data.push(task);
    this.bubbleUp();
  }

  edit(taskId: number, newPriority: number): void {
    if (!this.taskMap.has(taskId)) return;
    const prev = this.taskMap.get(taskId)!;
    const newTask: Task = [prev[0], taskId, newPriority];
    this.taskMap.set(taskId, newTask);

    this.data.push(newTask);
    this.bubbleUp();
  }

  rmv(taskId: number): void {
    this.taskMap.delete(taskId);
  }

  execTop(): number {
    while (this.data.length) {
      const top = this.heapPop()!;
      const task = this.taskMap.get(top[1]);

      if (task !== top) continue;

      this.taskMap.delete(task[1]);
      return top[0];
    }

    return -1;
  }

  private heapPop() {
    if (this.data.length === 0) return;
    if (this.data.length === 1) return this.data.pop();

    this.swap(0, this.data.length - 1);
    const top = this.data.pop();
    this.bubbleDown();
    return top;
  }

  private bubbleUp() {
    let index = this.data.length - 1;
    while (0 < index) {
      const parent = Math.floor((index - 1) / 2);
      if (this.compare(this.data[parent], this.data[index]) < 0) {
        this.swap(index, parent);
        index = parent;
      } else {
        break;
      }
    }
  }

  private bubbleDown() {
    const size = this.data.length;
    let index = 0;

    while (index < size) {
      let left = index * 2 + 1;
      let right = index * 2 + 2;
      let current = index;

      if (
        left < size &&
        this.compare(this.data[current], this.data[left]) < 0
      ) {
        current = left;
      }

      if (
        right < size &&
        this.compare(this.data[current], this.data[right]) < 0
      ) {
        current = right;
      }

      if (index === current) {
        break;
      }

      this.swap(index, current);
      index = current;
    }
  }

  private swap(a: number, b: number) {
    [this.data[a], this.data[b]] = [this.data[b], this.data[a]];
  }

  private compare(a: Task, b: Task): number {
    if (a[2] === b[2]) {
      return a[1] - b[1];
    }
    return a[2] - b[2];
  }
}

/**
 * Your TaskManager object will be instantiated and called as such:
 * var obj = new TaskManager(tasks)
 * obj.add(userId,taskId,priority)
 * obj.edit(taskId,newPriority)
 * obj.rmv(taskId)
 * var param_4 = obj.execTop()
 */

const test = new TaskManager([
  [1, 1, 3],
  [2, 2, 5],
  [1, 3, 11],
  [3, 3, 4],
]);

// https://school.programmers.co.kr/learn/courses/30/lessons/12980
const solution1 = (n: number) => {
  //6 -> 3 -> 2 -> 1 -> -1
  let count = 0;
  while (1 <= n) {
    if (n % 2 === 0) {
      n = n / 2;
    } else {
      count++;
      n = n - 1;
    }
  }

  return count;
};
