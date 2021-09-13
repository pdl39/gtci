// Given an array of positive numbers and a positive number ‘k,’ find the maximum sum of any contiguous subarray of size ‘k’.

const maxSubArrOfSizeK = (k, arr) => {
  let maxSum = 0, subArrSum = 0;
  let subArrStart = 0;
  for (let subArrEnd = 0; subArrEnd < arr.length; subArrEnd++) {
    subArrSum += arr[subArrEnd];

    if (subArrEnd >= k - 1) {
      maxSum = Math.max(maxSum, subArrSum);
      subArrSum -= arr[subArrStart];
      subArrStart++;
    }
  }

  return maxSum;
};

// TEST
console.log(maxSubArrOfSizeK(3, [1, 5, 4, 3, 2, 7, 5, 2, 9, 1]));
