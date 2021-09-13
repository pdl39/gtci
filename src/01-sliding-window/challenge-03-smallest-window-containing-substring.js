/* Given a string and a pattern, find the smallest substring in the given string which has all the characters of the given pattern. */

// T: O(n + m)
// S: O(m)
// where n = string length, m = # distinct chars in pattern


// This question is similar to challenge-01-permutation-in-string, but instead of finding an exact permutation of the pattern, the substring we need can include chars that are not part of the pattern as well.

const findSubstring = (str, pattern) => {
  let minLen = str.length + 1;
  let matched = 0;
  let windowStart = 0;
  let resultRange = [];
  const patternMap = {};

  // for each char in pattern, add and keep count in hashmap
  for (let i = 0; i < pattern.length; i++) {
    if (patternMap[pattern[i]]) patternMap[pattern[i]]++;
    else patternMap[pattern[i]] = 1;
  }

  // for each char in string, compare against hashmap
  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    const char = str[windowEnd];

    if (char in patternMap) {
      patternMap[char]--;
      if (patternMap[char] >= 0) matched++;
    }

    while (matched === pattern.length) {
      if (windowEnd - windowStart + 1 < minLen) {
        minLen = windowEnd - windowStart + 1;
        resultRange = [windowStart, windowEnd + 1];
      }

      const leftChar = str[windowStart];
      if (leftChar in patternMap) {
        patternMap[leftChar]++;
        if (patternMap[leftChar] > 0) matched--;
      }
      windowStart++;
    }
  }

  return minLen > str.length ? "" : str.substring(resultRange[0], resultRange[1]);
}


// TEST
console.log(findSubstring("aacdefghaecdbf", "feac"));
console.log(findSubstring("aacdefghaecdbf", "feiac"));
console.log(findSubstring("abcfejiop", "bace"));
