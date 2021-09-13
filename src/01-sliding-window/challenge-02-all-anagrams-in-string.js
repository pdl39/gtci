/* Given a string and a pattern, find all anagrams of the pattern in the given string.

Every anagram is a permutation of a string. As we know, when we are not allowed to repeat characters while finding permutations of a string, we get N!N! permutations (or anagrams) of a string having NN characters. For example, here are the six anagrams of the string “abc”:

abc
acb
bac
bca
cab
cba

Write a function to return a list of starting indices of the anagrams of the pattern in the given string. */

// T: O(n + m)
// S: O(n + m) -> m for the hashmap, n, in the worst case, for the result array, which would occur when m = 1 and string only consists of that character
// where n = string length, m = # distinct chars in pattern.

// This question is very similar to challenge-01-permutation-in-string, except that instead of returning true after finding one instance of permutation in string, we need to find all instances of permutations and return the array of starting indices of all instances.

const findPermutation = (str, pattern) => {
  const patternMap = {};
  let windowStart = 0;
  let matched = 0;
  const results = [];

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

    if (matched === Object.keys(patternMap).length) results.push(windowStart);

    if (windowEnd >= pattern.length - 1) {
      if (leftChar in patternMap) {
        if (patternMap[leftChar] === 0) matched--;
        patternMap[leftChar]++;
      }
      windowStart++;
    }
  }

  return results;
};


// TEST
console.log(findPermutation("bceagfgghgfa", "gafgh"));
console.log(findPermutation("bccbbcbcc", "cb"));
