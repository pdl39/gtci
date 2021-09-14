/* Given an array of unsorted numbers, find all unique triplets in it that add up to zero. */

// T: O(n^2) --> O(nlogn + n^2), nlogn for sorting, n^2 for searchPairs, since searchPairs takes O(n), and we call searchPairs on each element of the arr.
// S: O(n) --> n for the output 'triplets', and another n for the sorted array, assuming we need separte array to store the sorted arr. (if we can sort in place, no additional array is needed).
// where n = array length.

const searchTriplets = (arr) => {
  const sortedArr = arr.sort((a, b) => a - b);
  const triplets = [];

  for (let i = 0; i < sortedArr.length; i++) {
    // skip duplicate elements
    if (i > 0 && arr[i] === arr[i - 1]) continue;

    const target = arr[i];
    // finding the triplet that sum to 0 is equal to finding the pair that sum to target, where target = 0 - pairSum.
    // searchPair will look for the pairs where pairSum + target === 0.
    searchPairs(sortedArr, target, i + 1, triplets);
  }

  return triplets;
}

const searchPairs = (arr, target, lp, triplets) => {
  let rp = arr.length - 1;

  while (lp < rp) {
    const pairSum = arr[lp] + arr[rp];
    if (pairSum + target === 0) {
      const triplet = [arr[lp], arr[rp], target].sort((a, b) => a - b);
      triplets.push(triplet);
      lp++, rp--;
      // skip duplicate elements
      while (lp < rp && arr[lp] === arr[lp - 1]) {
        lp++;
      }
    }

    else if (pairSum + target < 0) lp++;
    else rp--;
  }
}


// TEST
console.log(searchTriplets([0, -4, 2, 1, -3, -1, 4, 2, -2, 5]));
