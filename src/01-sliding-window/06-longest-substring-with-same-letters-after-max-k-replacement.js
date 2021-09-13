/* Given a string with lowercase letters only, if you are allowed to replace no more than ‘k’ letters with any letter, find the length of the longest substring having the same letters after replacement. */

// T: O(n)
// S: O(k) -> O(1)
// where n = string length, k = max num replacement

const longestSubstringWithSameLettersAfterKReplacement = (str, k) => {
  let maxRepeatCharCount = 0;
  let windowStart = 0;
  const seenChars = {};

  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    if (seenChars[str[windowEnd]]) seenChars[str[windowEnd]]++;
    else seenChars[str[windowEnd]] = 1;

    maxRepeatCharCount = Math.max(maxRepeatCharCount, seenChars[str[windowEnd]]);

    const currentWindowLen = windowEnd - windowStart + 1;
    if (currentWindowLen - maxRepeatCharCount > k) {
      seenChars[str[windowStart]]--;
      windowStart++;
    }
  }

  return maxRepeatCharCount + k;
};


// TEST
console.log(longestSubstringWithSameLettersAfterKReplacement("aacdeefeeeb", 2));
console.log(longestSubstringWithSameLettersAfterKReplacement("aacdeefeeebeac", 2));
