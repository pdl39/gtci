/* Given a string and a pattern, find out if the string contains any permutation of the pattern.

Permutation is defined as the re-arranging of the characters of the string. For example, “abc” has the following six permutations:

abc
acb
bac
bca
cab
cba

If a string has ‘n’ distinct characters, it will have n! permutations. */

// T: O(n + m)
// S: O(m)
// where n = string length, m = # distinct chars in pattern

const findPermutation = (str, pattern) => {
  const patternMap = {};
  let windowStart = 0;
  let matched = 0;

  // for each char in pattern, add to hashmap.
  for (let i = 0; i < pattern.length; i++) {
    if (patternMap[pattern[i]]) patternMap[pattern[i]]++;
    else patternMap[pattern[i]] = 1;
  }

  // for each char in string, compare against hashmap.
  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    const char = str[windowEnd];
    const leftChar = str[windowStart];

    if (char in patternMap) {
      patternMap[char]--;
      if (patternMap[char] === 0) matched++;
    }

    if (matched === Object.keys(patternMap).length) return true;

    if (windowEnd >= pattern.length - 1) {
      if (leftChar in patternMap) {
        if (patternMap[leftChar] === 0) matched--;
        patternMap[leftChar]++;
      }
      windowStart++;
    }
  }

  return false;
};


// TEST
console.log(findPermutation("bceagfgghgfa", "gafgh"));
