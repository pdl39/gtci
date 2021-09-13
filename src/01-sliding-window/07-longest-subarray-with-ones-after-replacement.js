/* Given an array containing 0s and 1s, if you are allowed to replace no more than ‘k’ 0s with 1s, find the length of the longest contiguous subarray having all 1s. */

// T: O(n)
// S: O(1)
// where n = array length

// This question is essentially same as 07-longest-substring-with-same-letters-after-max-k-replacement, except that we only have two characters to account for (1s and 0s).

const longestSubarrWithOnesAfterReplacement = (arr, k) => {
  let maxOnesCount = 0;
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    if (arr[windowEnd] === 1) maxOnesCount++;

    const currentWindowLen = windowEnd - windowStart + 1;
    if ( currentWindowLen - maxOnesCount > k) {
      if (arr[windowStart] === 1) {
        maxOnesCount--;
      }
      windowStart++;
    }
  }

  return maxOnesCount + k;
};


// TEST
console.log(longestSubarrWithOnesAfterReplacement([1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1], 3));
