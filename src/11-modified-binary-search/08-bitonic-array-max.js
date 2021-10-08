/* Find the maximum value in a given Bitonic array. An array is considered bitonic if it is monotonically increasing and then monotonically decreasing. Monotonically increasing or decreasing means that for any index i in the array arr[i] != arr[i+1].

Example 1:

Input: [1, 3, 8, 12, 4, 2]
Output: 12
Explanation: The maximum number in the input bitonic array is '12'.
Example 2:

Input: [3, 8, 3, 1]
Output: 8
Example 3:

Input: [1, 3, 8, 12]
Output: 12
Example 4:

Input: [10, 9, 8]
Output: 10 */


// T: O(logn)
// S: O(1)
// where n = input array length.


// #2: simpler solution.
const bitonicArrMax2 = (arr) => {
  let low = 0;
  let high = arr.length - 1;

  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);

    if (arr[mid] < arr[mid + 1]) { // increasing -> the max will be to the right of mid.
      low = mid + 1;
    }
    else { // decreasing phase -> the max is either the mid el or to the left of mid.
      high = mid;
    }
  }
  // After we come out of the loop, low === high.
  return arr[low];
}


// #1
const bitonicArrMax = (arr) => {
  let low = 0;
  let high = arr.length - 1;

  if (arr.length === 1) return arr[0];
  if (arr[low] > arr[low + 1]) return arr[low];
  if (arr[high] > arr[high - 1]) return arr[high];

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    const current = arr[mid];
    const left = arr[mid - 1];
    const right = arr[mid + 1];

    if (current > left) {
      if (current > right) return current;
      low = mid + 1;
    }
    else {
      high = mid - 1;
    }
  }
}


// TEST
console.log(bitonicArrMax2([1, 3, 5, 7, 8, 11, 10, 3]));
console.log(bitonicArrMax2([1, 3, 5, 7, 8, 10]));
console.log(bitonicArrMax2([15, 13, 9, 8, 7, 3, 1]));
console.log(bitonicArrMax2([1, 6, 3]));
console.log(bitonicArrMax2([1, 8]));
console.log(bitonicArrMax2([8, 1]));
console.log(bitonicArrMax2([13]));

console.log('--------------');

console.log(bitonicArrMax([1, 3, 5, 7, 8, 11, 10, 3]));
console.log(bitonicArrMax([1, 3, 5, 7, 8, 10]));
console.log(bitonicArrMax([15, 13, 9, 8, 7, 3, 1]));
console.log(bitonicArrMax([1, 6, 3]));
console.log(bitonicArrMax([1, 8]));
console.log(bitonicArrMax([8, 1]));
console.log(bitonicArrMax([13]));
