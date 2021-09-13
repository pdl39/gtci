/* Given a string and a list of words, find all the starting indices of substrings in the given string that are a concatenation of all the given words exactly once without any overlapping of words. It is given that all words are of the same length. */


// #1. Solution assuming string is divisible into n-chunks, where n = word length, and each split chunk corresponds to a word from the words array:

// T: O(n)
// S: O(m)
// where n = string length, m = # distinct words in words array.

const findWordConcatenation1 = (str, words) => {
  if (words.length === 0 || words[0].length === 0) return [];

  let wordLen = words[0].length;
  let matched = 0;
  let windowStart = 0;
  const result = [];
  const wordsMap = {};

  // for each word in words, add and keep count in hashmap.
  for (let i = 0; i < words.length; i++) {
    if (wordsMap[words[i]]) wordsMap[words[i]]++;
    else wordsMap[words[i]] = 1;
  }

  // split string by n-chunks, where n = wordLen.
  const wordLenRegex = new RegExp(`.{1,${wordLen}}`, "g");
  let strWordsArr = str.match(wordLenRegex);

  for (let windowEnd = 0; windowEnd < strWordsArr.length; windowEnd++) {
    const word = strWordsArr[windowEnd];
    if (word in wordsMap) {
      if (wordsMap[word] <= 0) {
        windowStart++;
        continue;
      }

      wordsMap[word]--;
      if (wordsMap[word] >= 0) matched++;
    }

    while (matched === words.length) {
      result.push(windowStart * wordLen);

      const leftWord = strWordsArr[windowStart];
      if (leftWord in wordsMap) {
        wordsMap[leftWord]++;
        if (wordsMap[leftWord] > 0) matched--;
      }
      windowStart++;
    }
  }

  return result;
};


// #2. Solution with no additional assumption:

// T: O(n * m * wordLen)
// S: O(n + m) --> in the worst case, we need to store a result array of n, if m = 1 and is a single character, and the string consists of only this single-word character.
// where n = string length, m = # distinct words in word arry, wordLen = length of a word in words array.

const findWordConcatenation2 = (str, words) => {
  if (words.length === 0 || words[0].length === 0) return [];

  let wordLen = words[0].length;
  const result = [];
  const wordsMap = {};

  // for each word in words, add and keep count in hashmap.
  for (let i = 0; i < words.length; i++) {
    if (wordsMap[words[i]]) wordsMap[words[i]]++;
    else wordsMap[words[i]] = 1;
  }

  for (let i = 0; i < (str.length - words.length * wordLen) + 1; i++) {
    const seenWords = {};
    for (let j = 0; j < words.length; j++) {
      let nextWordStart = i + j * wordLen;
      const nextWord = str.substring(nextWordStart, nextWordStart + wordLen);

      if (!(nextWord in wordsMap)) break;

      if (nextWord in seenWords) seenWords[nextWord]++;
      else seenWords[nextWord] = 1;

      if (seenWords[nextWord] > wordsMap[nextWord]) break;

      if (j === words.length - 1) {
        result.push(i);
      }
    }
  }

  return result;
}


// TEST
console.log(findWordConcatenation1("boyboxboxboxboy", ["boy", "box"]));
console.log(findWordConcatenation2("boyboxboxboxboy", ["boy", "box"]));
