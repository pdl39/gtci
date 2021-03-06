// Given a string, find the length of the longest substring in it with no more than K distinct characters.

// T: O(n) --> Outer for loop runs for all elements, inner while loop processes each element only once > O(n + n) > O(n)
// S: O(k) --> hashmap stores max k + 1 characters at any time. This can be considered O(1), especially if we assume only alphabet chars, since in this case, max k would be 26. Even if we assume any ascii char can be used, # of ascii chars will still be constant, so space complexity would be O(1).
// where n = string length, k = # distinct characters

const longestSubstringWithKDistinct = (str, k) => {
  if (k >= str.length) return str.length;

  let maxLen = 0;
  let windowStart = 0;
  let seenChars = {};

  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    if (seenChars[str[windowEnd]]) seenChars[str[windowEnd]]++;
    else seenChars[str[windowEnd]] = 1;

    while (Object.keys(seenChars).length > k) {
      if (seenChars[str[windowStart]] > 1) seenChars[str[windowStart]]--;
      else delete seenChars[str[windowStart]];
      windowStart++;
    }

    maxLen = Math.max(maxLen, windowEnd - windowStart + 1);
  }

  return maxLen;
};


// TEST
console.log(longestSubstringWithKDistinct("abbaeccaeef", 3));
console.log(longestSubstringWithKDistinct("abbaectieef", 3));
