// Given an array of positive numbers and a positive number ‘S,’ find the length of the smallest contiguous subarray whose sum is greater than or equal to ‘S’. Return 0 if no such subarray exists.

// T: O(n) --> Outer for loop runs for all elements, inner while loop processes each element only once > O(n + n) > O(n)
// S: O(1)
// where n = array length

const smallestSubArrWithGivenSum = (s, arr) => {
  let subArrSum = 0;
  let minSubArrLen = Infinity;
  let subArrStart = 0;

  for (let subArrEnd = 0; subArrEnd < arr.length; subArrEnd++) {
    subArrSum += arr[subArrEnd];

    while (subArrSum >= s) {
      minSubArrLen = Math.min(minSubArrLen, subArrEnd - subArrStart + 1);
      subArrSum -= arr[subArrStart];
      subArrStart++;
    }
  }

  if (minSubArrLen > arr.length) return 0;

  return minSubArrLen;
};


// TEST
console.log(smallestSubArrWithGivenSum(9, [5, 4, 3, 2, 6, 4, 8, 1, 2, 2, 7]));
console.log(smallestSubArrWithGivenSum(15, [5, 4, 3, 2, 6, 4, 8, 1, 2, 2, 7]));
