/* Design a class to efficiently find the Kth largest element in a stream of numbers.

The class should have the following two things:

The constructor of the class should accept an integer array containing initial numbers from the stream and an integer ‘K’.
The class should expose a function add(int num) which will store the given number and return the Kth largest number.
Example 1:

Input: [3, 1, 5, 12, 2, 11], K = 4
1. Calling add(6) should return '5'.
2. Calling add(13) should return '6'.
2. Calling add(4) should still return '6'. */

const Heap = require('../../ds/PriorityQueue');

// T: O(logk) --> the add method takes logk time for the heap add method and poll method.
// S: O(k) --> we store k elements at any time in the min heap.
// where n = input arr length, k = kth number to find.

class KthLargestNumFromStream {
  constructor(stream, k) {
    this.minHeap = new Heap();
    this.k = k;

    stream.forEach(num => this.add(num));
  }

  findKthLargestNum() {
    while (this.minHeap.size > this.k) { // O(1) for all subsequent add calls after initialization.
      this.minHeap.poll(); // O(logk)
    }

    return this.minHeap.peek();
  }

  add(num) {
    this.minHeap.add(num); // O(logk)
    return this.findKthLargestNum(); // O(logk)
  }
}


// TEST
const Ex1 = new KthLargestNumFromStream([6, 4, 9, 11, 15, 1, 2], 3);
console.log(Ex1.add(1));
console.log(Ex1.add(18));
console.log(Ex1.add(12));
console.log(Ex1.add(6));
console.log(Ex1.add(22));
