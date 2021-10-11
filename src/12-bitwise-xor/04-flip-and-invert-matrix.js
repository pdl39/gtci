/* Given a binary matrix representing an image, we want to flip the image horizontally, then invert it.

To flip an image horizontally means that each row of the image is reversed. For example, flipping [0, 1, 1] horizontally results in [1, 1, 0].

To invert an image means that each 0 is replaced by 1, and each 1 is replaced by 0. For example, inverting [1, 1, 0] results in [0, 0, 1].

Example 1:

Input: [
  [1,0,1],
  [1,1,1],
  [0,1,1]
]
Output: [
  [0,1,0],
  [0,0,0],
  [0,0,1]
]
Explanation: First reverse each row: [[1,0,1],[1,1,1],[1,1,0]]. Then, invert the image: [[0,1,0],[0,0,0],[0,0,1]]

Example 2:

Input: [
  [1,1,0,0],
  [1,0,0,1],
  [0,1,1,1],
  [1,0,1,0]
]
Output: [
  [1,1,0,0],
  [0,1,1,0],
  [0,0,0,1],
  [1,0,1,0]
]
Explanation: First reverse each row: [[0,0,1,1],[1,0,0,1],[1,1,1,0],[0,1,0,1]]. Then invert the image: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
*/

// T: O(n * m) --> we do 2 iterations through the matrix, first time to flip horizontally (n * m/2), and then to invert all elements (n * m).
// S: O(1)
// where n = # of matrix rows, m = # of columns for each row.

const flipAndInvertMatrix = (matrix) => {
  // flip horizontally
  for (let i = 0; i < matrix.length; i++) {
    let left = 0;
    let right = matrix[i].length - 1;

    while (left < right) {
      [matrix[i][left], matrix[i][right]] = [matrix[i][right], matrix[i][left]]; // swap

      left++, right--;
    }
  }

  // invert
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] ^= 1;
    }
  }

  return matrix;
}


// TEST
const matrix1 = [
  [0, 1, 0, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 1, 0, 1, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 0],
];
const matrix2 = [
  [1, 1, 0, 0],
  [1, 0, 0, 1],
  [0, 1, 1, 1],
  [1, 0, 1, 0]
];
console.log(flipAndInvertMatrix(matrix1));
console.log(flipAndInvertMatrix(matrix2));
