/* Given a string, find the length of the longest substring, which has no repeating characters. */

// T: O(n)
// S: O(1) --> in the worst case, we would need to store k = 26 chars, which represent the # of distinct alphabet chars, assuming we only deal with alphabet characters. Since k = 26 is a constant, we can say space is O(1).
// where n = array length, k = # of distinct chars.

const longestNonRepeatingSubstring = (str) => {
  let maxLen = 0;
  let windowStart = 0;
  const seenChars = {};

  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    if (str[windowEnd] in seenChars) {
      // update windowStart to the last seen char index, if it is greater than the windowStart. Otherwise leave windowStart.
      windowStart = Math.max(windowStart, seenChars[str[windowEnd]] + 1);
    }

    // save the index of the seen char
    seenChars[str[windowEnd]] = windowEnd;
    maxLen = Math.max(maxLen, windowEnd - windowStart + 1);
  }

  return maxLen;
};


// TEST
console.log(longestNonRepeatingSubstring("abcceadfac"));
