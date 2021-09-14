/* Given an array arr of unsorted numbers and a target sum, find all triplets in it such that arr[i] + arr[j] + arr[k] < target where i, j, and k are three different indices. Write a function to return all such triplets. */

// T: O(n^3) --> O(nlogn + n^3), nlogn for sorting, n^3 for searchPairs, which takes O(n^2) and is called for each element in the array. searchPairs in this solution takes O(n^2) because the inner while loop using tempRp can, in worst case, take O(n), if the target is greater than the sum of every single set of triplets.
// S: O(n) --> assuming we need to create a new array for sorted array. If we can sort in place, space complexity would be O(1).
// where n = array length

// This question is very similar to 07-triplets-with-smaller-sum, except that here, instead of returning the count of such triplets, we need to return an actual list of all such triplets.

const tripletsWithSmallerSum2 = (arr, target) => {
  const sortedArr = arr.sort((a, b) => a - b);
  const triplets = [];

  for (let i = 0; i < sortedArr.length; i++) {
    searchPairs(sortedArr, target, arr[i], i + 1, triplets);
  }

  return triplets;
};

const searchPairs = (arr, target, x, lp, triplets) => {
  let rp = arr.length - 1;

  while (lp < rp) {
    // sum = x + y + z
    const sum = x + arr[lp] + arr[rp];

    if (sum < target) {
      // since arr[rp] is always greater than or equal to arr[lp], the sum of the element at the current lp and any element between the current lp and rp will still be less than the target. Hence, to add all instaces of triplets that include the pairs between current lp and rp that includes the element at current lp, we need another loop using a temporary rp to account for them.
      triplets.push([x, arr[lp], arr[rp]]);
      let tempRp = rp - 1;
      while (lp < tempRp) {
        triplets.push([x, arr[lp], arr[tempRp]]);
        tempRp--;
      }
      lp++;
    }
    else {
      rp--;
    }
  }
}


// TEST
console.log(tripletsWithSmallerSum2([-12, 8, -2, 5, -9, 2, 0, 9, 12, 5, -2, 8], 28));
console.log(tripletsWithSmallerSum2([-12, 8, -2, 5, -9, 2, 0, 9, 12, 5, -2, 8], 88));
console.log(tripletsWithSmallerSum2([-12, 8, -2, 5, -9, 2, 9, 12, 5, -2, 8], 3));
