/* Given an array of numbers and a number ‘K’, we need to remove ‘K’ numbers from the array such that we are left with maximum distinct numbers.

Example 1:

Input: [7, 3, 5, 8, 5, 3, 3], and K=2
Output: 3
Explanation: We can remove two occurrences of 3 to be left with 3 distinct numbers [7, 3, 8], we have to skip 5 because it is not distinct and appeared twice.

Another solution could be to remove one instance of '5' and '3' each to be left with three distinct numbers [7, 5, 8], in this case, we have to skip 3 because it appeared twice.
Example 2:

Input: [3, 5, 12, 11, 12], and K=3
Output: 2
Explanation: We can remove one occurrence of 12, after which all numbers will become distinct. Then we can delete any two numbers which will leave us 2 distinct numbers in the result.
Example 3:

Input: [1, 2, 3, 3, 3, 3, 4, 4, 5, 5, 5], and K=2
Output: 3
Explanation: We can remove one occurrence of '4' to get three distinct numbers. */

const Heap = require('../../ds/PriorityQueue');

// T: O(n + klogn) --> n to build frequency map, n to build the duplicates array and distinctCount from the frequency map, n to build the min heap of duplicates, klogn to pop off duplicates from the min heap in the worst case k times, which is when all duplicates have a count of 2.
// S: O(n) --> n for frequency map, n for duplicates array, n for min heap - O(3n).
// where n= input array length, k = # of numbers to remove.

const findMaxDistinctElements = (arr, k) => {
  const frequencyMap = {};
  for (let i = 0; i < arr.length; i++) { // O(n)
    if (frequencyMap[arr[i]]) frequencyMap[arr[i]]++;
    else frequencyMap[arr[i]] = 1;
  }

  let distinctCount = 0;
  const duplicates = [];

  Object.entries(frequencyMap).forEach(el => { // O(n)
    if (el[1] > 1) duplicates.push(el);
    else distinctCount++;
  });

  const minHeap = new Heap((a, b) => a[1] < b[1]);
  minHeap.build(duplicates); // O(n)

  let remainingRemovals = k;
  while (remainingRemovals > 0 && minHeap.size > 0) { // O(k)
    const top = minHeap.poll();  // O(logn)
    while (top[1] > 1 && remainingRemovals > 0) {
      top[1]--;
      remainingRemovals--;
    }
    if (top[1] === 1) distinctCount++;
  };

  if (remainingRemovals > 0) {
    distinctCount -= remainingRemovals;
  }

  return distinctCount;
}


// TEST
console.log(findMaxDistinctElements([1, 2, 5, 8, 7, 8, 9, 4, 6, 5, 5, 2, 3, 11, 8, 7], 5));
console.log(findMaxDistinctElements([1, 2, 5, 8, 7, 8, 9, 4, 6, 5, 5, 2, 3, 11, 8, 7], 8));
console.log(findMaxDistinctElements([7, 3, 5, 8, 5, 3, 3], 2));
console.log(findMaxDistinctElements([3, 5, 12, 11, 12], 3));
console.log(findMaxDistinctElements([1, 2, 3, 3, 3, 3, 4, 4, 5, 5, 5], 2));
