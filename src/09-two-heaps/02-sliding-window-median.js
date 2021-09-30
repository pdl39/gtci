/* Given an array of numbers and a number ‘k’, find the median of all the ‘k’ sized sub-arrays (or windows) of the array.

Example 1:
Input: nums=[1, 2, -1, 3, 5], k = 2
Output: [1.5, 0.5, 1.0, 4.0]
Explanation: Lets consider all windows of size ‘2’:

[1, 2, -1, 3, 5] -> median is 1.5
[1, 2, -1, 3, 5] -> median is 0.5
[1, 2, -1, 3, 5] -> median is 1.0
[1, 2, -1, 3, 5] -> median is 4.0

Example 2:
Input: nums=[1, 2, -1, 3, 5], k = 3
Output: [1.0, 2.0, 3.0]
Explanation: Lets consider all windows of size ‘3’:

[1, 2, -1, 3, 5] -> median is 1.0
[1, 2, -1, 3, 5] -> median is 2.0
[1, 2, -1, 3, 5] -> median is 3.0
*/

const SlidingWindowNumberStream = require('../../ds/TwoHeaps');

// #2: optimal solution.
// T: O(n * k) --> we traverse each num once using sliding window technique, and for each window, we do two operations - 1) insert the new number and 2) remove the outgoing number. Inserting takes logk operations, while removing a particular number from the heap takes k operations, since in the worst case we have to look at all numbers in the heap to find and remove it.
// S: O(n) --> we need k space for each subarray window (two heaps) and n - k for the output median array.
// where n = nums array length, k = subarray length.

const slidingWindowMedian2 = (nums, k) => {
  const medians = [];
  const twoHeaps = new SlidingWindowNumberStream();
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < nums.length; windowEnd++) {
    // add the newly included num to the current window subarray.
    twoHeaps.insertNum(nums[windowEnd]); // O(logk)

    // until we have a k element window, continue.
    if (windowEnd - windowStart + 1 < k) {
      continue;
    }

    medians.push(twoHeaps.findMedian()); // O(1)
    // remove outgoing num & slide the window.
    twoHeaps.remove(nums[windowStart]); // O(k)
    windowStart++;
  }
  return medians;
}

// #1: less optimal.
// T: O(n * klogk) --> we traverse each num once using sliding window technique, and for each window, for each num, we insert to the two heaps, which takes logk operations since the length of the subarray window is k. Since we do this for each num in the k-length window, finding the median of each window takes O(klogk).
// S: O(n) --> we need k space for each subarray window (two heaps) and n - k for the output median array.
// where n = nums array length, k = subarray length.

const slidingWindowMedian = (nums, k) => {
  const medians = [];
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < nums.length; windowEnd++) {
    // until we have a k element window, continue.
    if (windowEnd - windowStart + 1 < k) {
      continue;
    }

    const subarr = new SlidingWindowNumberStream();
    // insert each window item to two heaps and add the resulting median to the output array.
    for (let i = windowStart; i < windowEnd + 1; i++) {
      subarr.insertNum(nums[i]);
    }
    medians.push(subarr.findMedian());
    windowStart++;
  }

  return medians;
}


// TEST
console.log(slidingWindowMedian2([-3, 5, 1, 2, 7, 4, 5, 2, 6], 3));
console.log(slidingWindowMedian2([-3, 5, 1, 2, 7, 4, 5, 2, 6], 2));

console.log('---------');

console.log(slidingWindowMedian([-3, 5, 1, 2, 7, 4, 5, 2, 6], 3));
console.log(slidingWindowMedian([-3, 5, 1, 2, 7, 4, 5, 2, 6], 2));


// PriorityQueue test
// const newheap = new Heap();
// newheap.add(10);
// newheap.add(7);
// newheap.add(8);
// newheap.add(5);
// newheap.add(3);
// newheap.add(1);
// console.log(newheap.items);
// newheap.poll();
// console.log(newheap.items);
// newheap.add(2);
// console.log(newheap.items);
// newheap.remove(3);
// console.log(newheap.items);
// newheap.remove(10);
// console.log(newheap.items);
// newheap.remove(8);
// console.log(newheap.items);
