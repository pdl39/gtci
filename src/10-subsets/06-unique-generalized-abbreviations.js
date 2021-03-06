/* Given a word, write a function to generate all of its unique generalized abbreviations.

A generalized abbreviation of a word can be generated by replacing each substring of the word with the count of characters in the substring. Take the example of “ab” which has four substrings: “”, “a”, “b”, and “ab”. After replacing these substrings in the actual word by the count of characters, we get all the generalized abbreviations: “ab”, “1b”, “a1”, and “2”.

Note: All contiguous characters should be considered one substring, e.g., we can’t take “a” and “b” as substrings to get “11”; since “a” and “b” are contiguous, we should consider them together as one substring to get an abbreviation “2”.

Example 1:

Input: "BAT"
Output: "BAT", "BA1", "B1T", "B2", "1AT", "1A1", "2T", "3"
Example 2:

Input: "code"
Output: "code", "cod1", "co1e", "co2", "c1de", "c1d1", "c2e", "c3", "1ode", "1od1", "1o1e", "1o2",
"2de", "2d1", "3e", "4" */

const Queue = require('../../ds/Queue');

// #1: subsets & generate genAbb for each subset.
// T: O(n * 2^n) --> in total we will be looking at 2^n substrings, and for each substring, we do multiple n operations - for copying the substring, generating the generalized abbreviations, etc.
// S: O(n * 2^n) --> 2^n for the output array (corresponding to all subsets). Each substring has length of up to n.
// where n = input string length.

const findAllUniqueGenAbbs = (str) => {
  const strArr = str.split('');
  const subsets = [[]];
  const result = [str]; // begin with the original string, which will be the generalized abbreviation when the subset is an empty set, or ''.

  for (let i = 0; i < strArr.length; i++) {
    const subsetLen = subsets.length;

    for (let j = 0; j < subsetLen; j++) {
      // generate a new subset and add to the existing subsets array.
      const subsetsCopy = [...subsets[j]];
      subsetsCopy.push(strArr[i]);
      subsets.push(subsetsCopy);

      // generate the new generalized abbreviation and add to the result array.
      const genAbb = generateGenAbb(strArr, subsetsCopy);
      result.push(genAbb);
    }
  }

  return result;
}

const generateGenAbb = (original, subset) => {
  const genAbb = [];
  let i = 0, j = 0;
  let subStart = 0; subEnd = 0;

  // use sliding window to identify matching subset character positions from the original string.
  while (j < original.length) { // n
    while (original[j] === subset[subEnd] && subEnd < subset.length) {
      j++;
      subEnd++;
    }

    if (j > i) {
      genAbb.push(j - i);
      i = j;
      subStart = subEnd;
    }
    else {
      genAbb.push(original[i]);
      i++, j++;
    }
  }

  return genAbb.join('');
}


// #2: Using queue & dual operations per subset.
// T: O(n * 2^n)
// S: O(n * 2^n)
// where n = input string length.

class GenAbb {
  constructor(str, start, count) {
    this.str = str;
    this.start = start;
    this.count = count;
  }
};

const findAllUniqueGenAbbs2 = (str) => {
  const result = [];
  const combinations = new Queue(new GenAbb('', 0, 0));

  while (combinations.length) {
    const genAbb = combinations.dequeue().value;

    if (genAbb.start === str.length) {
      if (genAbb.count > 0) {
        genAbb.str += genAbb.count;
      }
      result.push(genAbb.str);
    }
    else {
      combinations.add(new GenAbb(`${genAbb.str}`, genAbb.start + 1, genAbb.count + 1));

      if (genAbb.count > 0) {
        genAbb.str += genAbb.count;
      }

      combinations.add(new GenAbb(`${genAbb.str}${str[genAbb.start]}`, genAbb.start + 1, 0));
    }
  }

  return result;
}


// #3: Recursive Solution
// same time & space complexity.

const findAllUniqueGenAbbs3 = (str) => {
  const result = [];
  findAllUniqueGenAbbsRecursive('', 0, 0, str, result);
  return result;
}

const findAllUniqueGenAbbsRecursive = (genAbbStr, index, count, str, result) => {
  let newGenAbbStr = genAbbStr;
  if (count > 0) {
    newGenAbbStr += count;
  }

  // base case
  if (index === str.length) {
    result.push(newGenAbbStr);
  }
  // recursive case
  else {
    findAllUniqueGenAbbsRecursive(genAbbStr, index + 1, count + 1, str, result);

    newGenAbbStr += str[index];

    findAllUniqueGenAbbsRecursive(newGenAbbStr, index + 1, 0, str, result);
  }
}


// TEST
console.log(findAllUniqueGenAbbs('BAT'));
console.log(findAllUniqueGenAbbs('code'));
console.log(findAllUniqueGenAbbs2('BAT'));
console.log(findAllUniqueGenAbbs2('code'));
console.log(findAllUniqueGenAbbs3('BAT'));
console.log(findAllUniqueGenAbbs3('code'));
