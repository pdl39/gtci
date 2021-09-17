/* We are given an array containing positive and negative numbers. Suppose the array contains a number ‘M’ at a particular index. Now, if ‘M’ is positive we will move forward ‘M’ indices and if ‘M’ is negative move backwards ‘M’ indices. You should assume that the array is circular which means two things:

If, while moving forward, we reach the end of the array, we will jump to the first element to continue the movement.
If, while moving backward, we reach the beginning of the array, we will jump to the last element to continue the movement.
Write a method to determine if the array has a cycle. The cycle should have more than one element and should follow one direction which means the cycle should not contain both forward and backward movements. */


// #1: Nested loop with constant space
// T: O(n^2)
// S: O(1)
// where n = array length.

const circularArrayLoopExists = (arr) => {
  const len = arr.length;

  // for each element in the array, check if a cycle exists.
  for (let start = 0; start < len; start++) {
    let isPositive = arr[start] > 0;
    let nextIdx = start;

    while (arr[nextIdx]) {
      // use mod to wrap around.
      nextIdx = (nextIdx + arr[nextIdx]) % len;
      if (nextIdx < 0) nextIdx += len; // if < 0, add the array length to wrap around.

      // uncomment below to see number of operations
      // console.log({start});

      // If any subsequent element has a different direction (different signed value), we know this violates our cycle rule. So break.
      if (arr[nextIdx] > 0 !== isPositive) break;

      // If we ever get back to the starting index, we have a cycle.
      if (nextIdx === start) return true;
    }
  }

  return false;
};


// #2: Nested loop with memoization
// T: O(n)
// S: O(n)
// where n = array length.

// Since an already visited index from a previous iteration that wasn't a cycle means that index can't be in a cycle, we can skip any index that was already visited from pervious iteration.
// By using memoization to keep track of visited indices, we can improve time to be linear, but we also need to increase space by n.

const circularArrayLoopExistsMemo = (arr) => {
  const len = arr.length;
  const memo = new Array(len).fill(false);

  for (let start = 0; start < len; start++) {
    let isPositive = arr[start] > 0;
    let nextIdx = start;

    while (arr[nextIdx]) {
      memo[nextIdx] = true; // memoize seen idx.

      // use mod to wrap around.
      nextIdx = (nextIdx + arr[nextIdx]) % len;
      if (nextIdx < 0) nextIdx += len; // if < 0, add the array length to wrap around.

      // uncomment below to see number of operations
      // console.log({start});

      // If any subsequent element has a different direction (different signed value), we know this violates our cycle rule. So break.
      if (arr[nextIdx] > 0 !== isPositive) break;

      // If we ever get back to the starting index, we have a cycle.
      if (nextIdx === start) return true;

      // if already visited, break.
      if (memo[nextIdx]) break;
    }
  }

  return false;
};


// TEST
// #1
console.log(circularArrayLoopExists([1, 3, -2, -1, 1]));
console.log(circularArrayLoopExists([1, 3, -2, -1, -7]));
console.log(circularArrayLoopExists([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]));
console.log(circularArrayLoopExists([2, -2, 1, 1, 2, 2, 1, 2, 2, 2]));

console.log('-------');

// #2
console.log(circularArrayLoopExistsMemo([1, 3, -2, -1, 1]));
console.log(circularArrayLoopExistsMemo([1, 3, -2, -1, -7]));
console.log(circularArrayLoopExistsMemo([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]));
console.log(circularArrayLoopExistsMemo([2, -2, 1, 1, 2, 2, 1, 2, 2, 2]));
