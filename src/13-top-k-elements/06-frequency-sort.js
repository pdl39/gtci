/* Given a string, sort it based on the decreasing frequency of its characters.

Example 1:

Input: "Programming"
Output: "rrggmmPiano"
Explanation: 'r', 'g', and 'm' appeared twice, so they need to appear before any other character.

Example 2:

Input: "abcbab"
Output: "bbbaac"
Explanation: 'b' appeared three times, 'a' appeared twice, and 'c' appeared only once. */

const Heap = require('../../ds/PriorityQueue');

// T: O(nlogn) --> n for building frequency map, n for building max heap of frequency map, which in the worst case would contain n elements each with frequency of 1, nlogn for polling elements from the max heap until empty.
// S: O(n) --> n for frequency map, n for max heap, n for output array.
// where n = input string length.

const findTopKFrequentNumbers = (str) => {
  const strArr = str.split(''); // O(n)
  const frequencyMap = {};

  for (let i = 0; i < strArr.length; i++) { // O(n)
    if (frequencyMap[strArr[i]]) frequencyMap[strArr[i]]++;
    else frequencyMap[strArr[i]] = 1;
  }

  const frequencySortedArr = [];

  const maxHeap = new Heap((a, b) => a[1] > b[1]);
  maxHeap.build(Object.entries(frequencyMap)); // O(n)

  while (maxHeap.size) { // O(n)
    let [current, freq] = maxHeap.poll(); // O(logn)
    while(freq > 0) {
      frequencySortedArr.push(current);
      freq--;
    }
  }

  return frequencySortedArr.join(''); // O(n)
}


// TEST
console.log(findTopKFrequentNumbers('Grreattt'));
console.log(findTopKFrequentNumbers('Grreatttgggg'));
console.log(findTopKFrequentNumbers('abcabcabcabdetrfe'));


