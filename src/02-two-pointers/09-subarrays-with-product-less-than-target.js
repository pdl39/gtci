/* Given an array with positive numbers and a positive target number, find all of its contiguous subarrays whose product is less than the target number. */

// T: O(n^3) --> O(n) for managing the sliding window (outer for loop), O(n^2) in the worst case for finding all subarrays at each window (inner for loop)
// S: O(n^3) --> O(n) for each subArr, O(n^2) for the result array. In the worst case, where all possible subarrays have product < target, we need to find all possible contiguous subarrays. How many contiguous subarrays are there in an array of size n?
// for i = 0, there are n choices.
// for i = 1, there are n - 1 choices.
// for i = 2, there are n - 2 choices.
// ...etc.
// This results in n + (n - 1) + (n - 2) + ... + 2 + 1.
// This is n * (n + 1) / 2 which asymptotically converges to n^2.
// where n = array length.

const findSubarrays = (arr, target) => {
  const result = [];
  let product = 1;
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    product *= arr[windowEnd];
    // if product >= target, slide window to right by one and divide back the product by the removed element.
    while (product >= target && windowStart <= windowEnd) {
      product /= arr[windowStart];
      windowStart++;
    }

    // if product < target, at current windowEnd, all subarrays of elements between windowStart and windowEnd multiply to a product less than the target. We need to add all subarrays between windowStart and windowEnd. To avoid adding duplicates, we start with the subarray consisting of only arr[windowEnd] and append prev element one by one to get subsequent subarrays.
    const subArr = [];
    for (let i = windowEnd; i >= windowStart; i--) {
      subArr.unshift(arr[i]);
      // must push a copy of the subArr, since directly pushing subArr will refer to the memory address of subArr, always altering the already pushed subArr to the current state.
      result.push([...subArr]);
    }
  }

  return result;
};


// TEST
console.log(findSubarrays([2, 5, 3, 10], 30));
console.log(findSubarrays([33, 5, 3, 10], 30));
console.log(findSubarrays([1, 2, 3, 4, 5, 6], 1000));
