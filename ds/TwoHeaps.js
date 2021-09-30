const Heap = require('./PriorityQueue');

class TwoHeaps {
  constructor() {
    this.maxHeap = new Heap((a, b) => a > b); // first half
    this.minHeap = new Heap((a, b) => a < b); // second half
  }

  size() {
    return this.maxHeap.size + this.minHeap.size;
  }

  rebalanceHeaps() {
    while (this.maxHeap.size - this.minHeap.size > 1) {
      const item = this.maxHeap.poll();
      this.minHeap.add(item);
    }
    while (this.minHeap.size > this.maxHeap.size) {
      const item = this.minHeap.poll();
      this.maxHeap.add(item);
    }
  }

  insertNum(num) {
    if (this.size() === 0 || num < this.maxHeap.peek()) {
      this.maxHeap.add(num);
    }
    else {
      this.minHeap.add(num);
    }

    this.rebalanceHeaps();
  }

  findMedian() {
    const streamSize = this.size();
    let median = this.maxHeap.peek();

    if (streamSize % 2 === 0) {
      median = (this.maxHeap.peek() + this.minHeap.peek()) / 2.0;
    }

    return median;
  }

  remove(num) {
    if (num === this.maxHeap.peek()) {
      this.maxHeap.poll();
    }
    else if (num === this.minHeap.peek()) {
      this.minHeap.poll();
    }
    else if (num < this.maxHeap.peek()) {
      this.maxHeap.remove(num);
    }
    else if (num > this.minHeap.peek()) {
      this.minHeap.remove(num);
    }

    this.rebalanceHeaps();
  }
}

module.exports = TwoHeaps;
