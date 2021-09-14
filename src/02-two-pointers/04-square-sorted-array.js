/* Given a sorted array, create a new array containing squares of all the numbers of the input array in the sorted order. */

// T: O(n)
// S: O(n)
// where n = array length

const makeSquares = (arr) => {
  const squares = new Array(arr.length).fill(null);
  let lp = 0, rp = arr.length - 1;
  let insertAt = squares.length - 1;

  while (lp <= rp) {
    const leftSquare = arr[lp]**2;
    const rightSquare = arr[rp]**2;

    if (leftSquare > rightSquare) {
      squares[insertAt] = leftSquare;
      lp++;
    }
    else {
      squares[insertAt] = rightSquare;
      rp--;
    }

    insertAt--;
  }

  return squares;
};


// TEST
console.log(makeSquares([-3, -2, -1, 0, 1, 3, 5]));
console.log(makeSquares([-15, 0, 1, 3, 5, 9, 18]));
console.log(makeSquares([0, 1, 1, 1, 1, 5, 8]));
console.log(makeSquares([0, 9]));
