/*
There is a dictionary containing words from an alien language for which we don’t know the ordering of the alphabets. Write a method to find the correct order of the alphabets in the alien language. It is given that the input is a valid dictionary and there exists an ordering among its alphabets.

Example 1:

Input: Words: ["ba", "bc", "ac", "cab"]
Output: bac
Explanation: Given that the words are sorted lexicographically by the rules of the alien language, so
from the given words we can conclude the following ordering among its characters:

1. From "ba" and "bc", we can conclude that 'a' comes before 'c'.
2. From "bc" and "ac", we can conclude that 'b' comes before 'a'

From the above two points, we can conclude that the correct character order is: "bac"
Example 2:

Input: Words: ["cab", "aaa", "aab"]
Output: cab
Explanation: From the given words we can conclude the following ordering among its characters:

1. From "cab" and "aaa", we can conclude that 'c' comes before 'a'.
2. From "aaa" and "aab", we can conclude that 'a' comes before 'b'

From the above two points, we can conclude that the correct character order is: "cab"
Example 3:

Input: Words: ["ywx", "wz", "xww", "xz", "zyy", "zwz"]
Output: ywxz
Explanation: From the given words we can conclude the following ordering among its characters:

1. From "ywx" and "wz", we can conclude that 'y' comes before 'w'.
2. From "wz" and "xww", we can conclude that 'w' comes before 'x'.
3. From "xww" and "xz", we can conclude that 'w' comes before 'z'
4. From "xz" and "zyy", we can conclude that 'x' comes before 'z'
5. From "zyy" and "zwz", we can conclude that 'y' comes before 'w'

From the above five points, we can conclude that the correct character order is: "ywxz"
*/


/*
Initialize:
for building prerequisite pairs:
- array of pairs --> prerequisite pairs
- set of chars
- set of seen pairs --> to prevent adding duplicate prerequisite pairs
- string output --> sorted chars according to the alien alphabet order
for topological sort:
- hash map for graph
- hash map for inDegrees

Steps:
- split word strings into arrays
- take two words at a time and compare char by char to build an array of prerequisite pairs.
- for each word pair, start by comparing the first char of each word.
- if the chars are different, add the chars as a new prerequitiste pair. Add the seen chars to a set of chars. Break from loop.
- if the chars at the same position for two words are the same, look at the next index and repeat until chars at same position are different.
- after comparing the last pair of words, use the prerequisite pairs to find a topological ordering of the chars.
*/


// T: O(v + n) --> We take each unique character as the source only once and look at all other chars connected to it via the prerequisite 'edge', so the time complexitiy for topological sort will be O(v + e), where e = total # of prerequisite 'edge' pairs. Since a single comparison of each pair of words from the input words array gives us only one such prerequisite pair, we can say the time complexity if O(v + n).
// S: O(v + n) --> We need to store the chars and the prerequisite pairs.
// where v = total # of different chars, n = # of words in the input words array.
const alienDictionary = (words) => {
  const [chars, prerequisitePairs] = buildPrerequisitePairs(words);
  return topologicalSort(chars, prerequisitePairs);
}

const buildPrerequisitePairs = (words) => {
  const parsedWords = [];
  const prerequisitePairs = [];
  const chars = new Set();
  const seenPairs = new Set();

  for (let i = 0; i < words.length; i++) {
    parsedWords.push(words[i].split(''));
  }

  for (let i = 0; i < parsedWords.length - 1; i++) {
    let p = 0;
    const word1 = parsedWords[i];
    const word2 = parsedWords[i + 1];
    while (p < word1.length && p < word2.length) {
      if (word1[p] !== word2[p]) {
        if (!seenPairs.has(`${word1[p]}${word2[p]}`)) {
          prerequisitePairs.push([word1[p], word2[p]]); // since word1 comes before word2 in the given list, we can be sure the char of word1 should come before char of word2 at the given position p.
          chars.add(word1[p]);
          chars.add(word2[p]);
          seenPairs.add(`${word1[p]}${word2[p]}`);
        }
        break;
      }
      p++;
    }
  }

  return [chars, prerequisitePairs];
}


const topologicalSort = (chars, prerequisitePairs) => {
  let result = [];
  const [graph, inDegrees] = buildGraphAndInDegreeMap(prerequisitePairs);

  const Queue = require("../../ds/Queue");
  const sources = new Queue();
  for (const char in inDegrees) {
    if (inDegrees[char] === 0) {
      sources.add(char);
    }
  }

  while (sources.length > 0) {
    const currentSource = sources.dequeue().value;
    result.push(currentSource);

    for (const char of graph[currentSource]) {
      inDegrees[char]--;
      if (inDegrees[char] === 0) {
        sources.add(char);
      }
    }
  }

  if (result.length !== chars.size) {
    return 'n/a';
  }

  return result.join('');
}


const buildGraphAndInDegreeMap = (prerequisitePairs) => {
  const graph = {};
  const inDegrees = {};

  for (let i = 0; i < prerequisitePairs.length; i++) {
    if (!(prerequisitePairs[i][0] in graph)) graph[prerequisitePairs[i][0]] = [];
    if (!(prerequisitePairs[i][1] in graph)) graph[prerequisitePairs[i][1]] = [];
    graph[prerequisitePairs[i][0]].push(prerequisitePairs[i][1]);

    if (!(prerequisitePairs[i][0] in inDegrees)) inDegrees[prerequisitePairs[i][0]] = 0;
    if (!(prerequisitePairs[i][1] in inDegrees)) inDegrees[prerequisitePairs[i][1]] = 0;
    inDegrees[prerequisitePairs[i][1]]++;
  }

  return [graph, inDegrees];
}

// TEST
const words1 = ['ywx', 'wz', 'xww', 'xz', 'zyy', 'zwz'];
const words2 = ['ba', 'bc', 'ac', 'cab'];
const words3 = ['jei', 'jep', 'js', 'eops', 'ea', 'ios', 'isa', 'opa', 'ps', 'pa', 'sa']; // jeiopsa
console.log(alienDictionary(words1));
console.log(alienDictionary(words2));
console.log(alienDictionary(words3));
