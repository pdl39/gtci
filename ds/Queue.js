const Node = require('./Node');

class Queue {
  constructor(value = null) {
    this.first = value ? new Node(value) : null;
    this.last = this.first;
    this.length = value ? 1 : 0;
  }

  add(value) {
    const node = new Node(value);

    if (this.length === 0) {
      this.first = node;
      this.last = node;
    }
    else {
      this.last.next = node;
      this.last = node;
    }
    this.length++;
  }

  unshift(value) {
    const node = new Node(value);

    if (this.length === 0) {
      this.first = node;
      this.last = node;
    }
    else {
      node.next = this.first;
      this.first = node;
    }
    this.length++;
  }

  dequeue() {
    if (this.length === 0) throw new Error('Queue is empty.');
    let item = this.first;

    if (this.length === 1) {
      this.first = null;
      this.last = null;
    }
    else {
      const newFirst = this.first.next;
      this.first = newFirst;
    }
    this.length--;

    return item;
  }

  peek() {
    return this.first;
  }

  printList() {
    const list = [];
    let current = this.first;

    while (current) {
      list.push(current.value);
      current = current.next;
    }

    return list;
  }
}

module.exports = Queue;
