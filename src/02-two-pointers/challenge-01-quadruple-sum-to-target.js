/* Given an array of unsorted numbers and a target number, find all unique quadruplets in it, whose sum is equal to the target number. */

// T: O(n^3) --> O(nlogn + n^3), nlogn for sorting, n^2 for the nested for loop iterations, and n for searchPairs, which get called for each nested iteration.
// S: O(n) --> n for a new sorted array
// where

const searchQuadruplets = (arr, target) => {
  const sortedArr = arr.sort((a, b) => a - b);
  const quadruplets = [];
  for (let i = 0; i < sortedArr.length; i++) {
    // skip duplicates
    if (i > 0 && sortedArr[i] === sortedArr[i - 1]) continue;

    for (let j = i + 1; j < sortedArr.length - 1; j++) {
      // skip duplicates
      if (j > 1 && sortedArr[j] === sortedArr[j - 1]) continue;

      searchPairs(sortedArr, target, i, j, quadruplets);
    }
  }

  return quadruplets;
};

const searchPairs = (arr, target, i, j, quadruplets) => {
  let lp = j + 1;
  let rp = arr.length - 1;

  while (lp < rp) {
    const sum = arr[i] + arr[j] + arr[lp] + arr[rp];

    if (sum === target) {
      const quadruplet = [arr[i], arr[j], arr[lp], arr[rp]];
      quadruplets.push(quadruplet);
      lp++, rp--;

      // skip duplicates
      while (lp < rp && arr[lp] === arr[lp - 1]) lp++;
      while (lp < rp && arr[rp] === arr[rp + 1]) rp--;
    }

    else if (sum < target) lp++;
    else rp--;
  }
}


// TEST
console.log(searchQuadruplets([4, 8, 11, 2, 3, 1, 5, 3, 5, -3, -3, 5, -5, 7], 5));
