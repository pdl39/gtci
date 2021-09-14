/* Given an array arr of unsorted numbers and a target sum, count all triplets in it such that arr[i] + arr[j] + arr[k] < target where i, j, and k are three different indices. Write a function to return the count of such triplets. */

// T: O(n^2) --> O(nlogn + n^2), nlogn for sorting, n^2 for traversePairs, which takes O(n) and is called for each element in the array.
// S: O(n) --> assuming we need to create a new array for sorted array. If we can sort in place, space complexity would be O(1).
// where n = array length

const tripletsWithSmallerSum = (arr, target) => {
  const sortedArr = arr.sort((a, b) => a - b);
  const result = { count: 0 };

  for (let i = 0; i < sortedArr.length; i++) {
    searchPairs(sortedArr, target, arr[i], i + 1, result);
  }

  return result.count;
};

const searchPairs = (arr, target, x, lp, result) => {
  let rp = arr.length - 1;

  while (lp < rp) {
    // sum = x + y + z
    const sum = x + arr[lp] + arr[rp];

    if (sum < target) {
      // since arr[rp] is always greater than or equal to arr[lp], the sum of the element at the current lp and any element between the current lp and rp will still be less than the target. Hence, increment count by all such possible pairs.
      result.count += rp - lp;
      lp++;
    }
    else {
      rp--;
    }
  }
}


// TEST
console.log(tripletsWithSmallerSum([-12, 8, -2, 5, -9, 2, 0, 9, 12, 5, -2, 8], 28));
console.log(tripletsWithSmallerSum([-12, 8, -2, 5, -9, 2, 0, 9, 12, 5, -2, 8], 88));
console.log(tripletsWithSmallerSum([-12, 8, -2, 5, -9, 2, 9, 12, 5, -2, 8], 3));
