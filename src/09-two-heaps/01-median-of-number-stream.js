/* Design a class to calculate the median of a number stream. The class should have the following two methods:

insertNum(int num): stores the number in the class
findMedian(): returns the median of all numbers inserted in the class
If the count of numbers inserted in the class is even, the median will be the average of the middle two numbers. */

const Heap = require('../../ds/PriorityQueue');

// T: O(logn) --> O(logn) for insertNum(): adding and polling from the heap takes logn operations in the worst case, corresponding to the height of the heap. readjusting the balance between the two heaps take additional logn operations, but these asymptotically converge to O(logn). findMedian takes constant time - O(1) - as we just need to look at the top value(s) of the heap(s).
// S: O(n) --> we need two heaps, which each take n/2 of the numbers in the stream, for a combined n space.
// where n = # of numbers in the stream

class MedianOfNumberStream {
  constructor() {
    this.firstHalf = new Heap((a, b) => a > b); // max heap
    this.secondHalf = new Heap((a, b) => a < b); // min heap
  }

  size() {
    return this.firstHalf.size + this.secondHalf.size;
  }

  insertNum(num) {
    if (this.size() === 0 || num < this.firstHalf.peek()) {
      this.firstHalf.add(num);
    }
    else {
      this.secondHalf.add(num);
    }

    while (this.firstHalf.size - this.secondHalf.size > 1) {
      const item = this.firstHalf.poll();
      this.secondHalf.add(item);
    }
    while (this.secondHalf.size > this.firstHalf.size) {
      const item = this.secondHalf.poll();
      this.firstHalf.add(item);
    }
  }

  findMedian() {
    const streamSize = this.size();
    let median = this.firstHalf.peek();

    if (streamSize % 2 === 0) {
      median = (this.firstHalf.peek() + this.secondHalf.peek()) / 2.0;
    }

    return median;
  }
}


// TEST
const ex1 = new MedianOfNumberStream();
ex1.insertNum(5);
console.log(ex1.findMedian());
ex1.insertNum(1);
console.log(ex1.findMedian());
ex1.insertNum(9);
console.log(ex1.findMedian());
ex1.insertNum(3);
console.log(ex1.findMedian());
ex1.insertNum(6);
console.log(ex1.findMedian());
ex1.insertNum(18);
console.log(ex1.findMedian());
ex1.insertNum(10);
console.log(ex1.findMedian());
ex1.insertNum(11);
console.log(ex1.findMedian());
ex1.insertNum(1);
console.log(ex1.findMedian());
ex1.insertNum(4);
console.log(ex1.findMedian());
