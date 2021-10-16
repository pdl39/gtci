/* Given a string and a number ‘K’, find if the string can be rearranged such that the same characters are at least ‘K’ distance apart from each other.

Example 1:

Input: "mmpp", K=2
Output: "mpmp" or "pmpm"
Explanation: All same characters are 2 distance apart.
Example 2:

Input: "Programming", K=3
Output: "rgmPrgmiano" or "gmringmrPoa" or "gmrPagimnor" and a few more
Explanation: All same characters are 3 distance apart.
Example 3:

Input: "aab", K=2
Output: "aba"
Explanation: All same characters are 2 distance apart.
Example 4:

Input: "aappa", K=3
Output: ""
Explanation: We cannot find an arrangement of the string where any two 'a' are 3 distance apart. */

const Heap = require('../../ds/PriorityQueue');
const Queue = require('../../ds/Queue');

// T: O(nlogn) --> n to build frequency map, n to build frequency array from the map, n to build the max heap from the frequency array, nlogn for poll/add operations on the max heap n times, n to join array into output string.
// S: O(n) --> n for frequency map, n for frequency array, n for max heap, k for the queue, n for output array & string.
// where n = input string length.

const rearrangeStrKDistanceApart = (str, k) => {
  const frequencyMap = {};

  for (let i = 0; i < str.length; i++) { // O(n)
    if (frequencyMap[str[i]]) frequencyMap[str[i]]++;
    else frequencyMap[str[i]] = 1;
  }

  const frequencyArr = [];
  Object.entries(frequencyMap).forEach(el => frequencyArr.push(el)); // O(n)
  // const duplicates = Object.entries(frequencyMap).filter(el => el[1] > 1);
  const maxHeap = new Heap((a, b) => a[1] > b[1]);
  maxHeap.build(frequencyArr); // O(n)

  const result = [];
  const prevChars = new Queue();

  while (maxHeap.size > 0) { // O(n)
    const char = maxHeap.poll();
    result.push(char[0]);
    char[1]--;

    prevChars.add(char);

    if (prevChars.length === k) {
      const prevChar = prevChars.dequeue().value;
      if (prevChar[1] > 0) {
        maxHeap.add(prevChar);
      }
    }
  }

  if (result.length === str.length) {
    return result.join(''); // O(n)
  }

  return '';
}


// TEST
console.log(rearrangeStrKDistanceApart('mmpp', 2));
console.log(rearrangeStrKDistanceApart('aappp', 3));
console.log(rearrangeStrKDistanceApart('Programming', 2));
console.log(rearrangeStrKDistanceApart('Programming', 3));
console.log(rearrangeStrKDistanceApart('Programming', 4));
console.log(rearrangeStrKDistanceApart('Programming', 5));
console.log(rearrangeStrKDistanceApart('Programming', 6));
console.log(rearrangeStrKDistanceApart('Programming', 7));
console.log(rearrangeStrKDistanceApart('Programming', 8));
console.log(rearrangeStrKDistanceApart('Programming', 9));
console.log(rearrangeStrKDistanceApart('gggghhh', 2));
console.log(rearrangeStrKDistanceApart('gggghhh', 3));
console.log(rearrangeStrKDistanceApart('abbaaccdngsfereggh', 3));
console.log(rearrangeStrKDistanceApart('gghhttddfffewqhyrr', 5));
