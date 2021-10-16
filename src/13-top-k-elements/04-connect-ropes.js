/* Given ‘N’ ropes with different lengths, we need to connect these ropes into one big rope with minimum cost. The cost of connecting two ropes is equal to the sum of their lengths.

Example 1:

Input: [1, 3, 11, 5]
Output: 33
Explanation: First connect 1+3(=4), then 4+5(=9), and then 9+11(=20). So the total cost is 33 (4+9+20)
Example 2:

Input: [3, 4, 5, 6]
Output: 36
Explanation: First connect 3+4(=7), then 5+6(=11), 7+11(=18). Total cost is 36 (7+11+18)
Example 3:

Input: [1, 3, 11, 5, 2]
Output: 42
Explanation: First connect 1+2(=3), then 3+3(=6), 6+5(=11), 11+11(=22). Total cost is 42 (3+6+11+22) */

const Heap = require('../../ds/PriorityQueue');

// T: O(nlogn) --> n for initializing min heap with n elements. n for going through the min heap, polling twice and adding back the sum in each iteration, for n * logn.
// S: O(n) --> we store all n elements in the min heap.
// where n = input array length.

const connectRopes = (arr) => {
  let totalCost = 0;

  const minHeap = new Heap();
  minHeap.build(arr); // O(n)

  while(minHeap.size > 1) { // O(n)
    const sum = minHeap.poll() + minHeap.poll(); // O(logn)
    totalCost += sum;
    minHeap.add(sum); // O(logn)
  }

  return totalCost;
}


// TEST
console.log(connectRopes([5, 6, 3, 2, 5, 2, 1]));
console.log(connectRopes([1, 3, 11, 5]));
console.log(connectRopes([3, 4, 5, 6]));
console.log(connectRopes([1, 3, 11, 5, 2]));
