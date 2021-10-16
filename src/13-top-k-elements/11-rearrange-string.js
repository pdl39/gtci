/* Given a string, find if its letters can be rearranged in such a way that no two same characters come next to each other.

Example 1:

Input: "aappp"
Output: "papap"
Explanation: In "papap", none of the repeating characters come next to each other.
Example 2:

Input: "Programming"
Output: "rgmrgmPiano" or "gmringmrPoa" or "gmrPagimnor", etc.
Explanation: None of the repeating characters come next to each other.
Example 3:

Input: "aapa"
Output: ""
Explanation: In all arrangements of "aapa", atleast two 'a' will come together e.g., "apaa", "paaa". */

const Heap = require('../../ds/PriorityQueue');

// T: O(nlogn) --> n to build frequency map, n to build frequency array from the map, n to build the max heap from the frequency array, nlogn for poll/add operations on the max heap n times, n to join array into output string.
// S: O(n) --> n for frequency map, n for frequency array, n for max heap, n for output array & string.
// where n = input string length.

const rearrangeStr = (str) => {
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

  while (maxHeap.size > 1) { // O(n)
    const top = maxHeap.poll(); // O(logn)
    if (top[0] !== result[result.length - 1]) {
      result.push(top[0]);
      top[1]--;
    }
    else {
      const top2 = maxHeap.poll(); // O(logn)
      result.push(top2[0]);
      top2[1]--;
      if (top2[1] > 0) maxHeap.add(top2); // O(logn)
    }
    if (top[1] > 0) maxHeap.add(top); // O(logn)
  }

  const last = maxHeap.peek();
  if (last[0] === result[result.length - 1] || last[1] > 1) {
    return '';
  }
  else {
    result.push(last[0]);
    return result.join(''); // O(n)
  }
}


// TEST
console.log(rearrangeStr('aappp'));
console.log(rearrangeStr('Programming'));
console.log(rearrangeStr('ggggh'));
console.log(rearrangeStr('gggghhh'));
console.log(rearrangeStr('gggghh'));
console.log(rearrangeStr('gghhttddfffewqhyrr'));
