/* Design a class that simulates a Stack data structure, implementing the following two operations:

push(int num): Pushes the number ‘num’ on the stack.
pop(): Returns the most frequent number in the stack. If there is a tie, return the number which was pushed later.
Example:

After following push operations: push(1), push(2), push(3), push(2), push(1), push(2), push(5)

1. pop() should return 2, as it is the most frequent number
2. Next pop() should return 1
3. Next pop() should return 2 */

const Heap = require('../../ds/PriorityQueue');

// T: O(logn) --> push and pop methods each take logn time.
// S: O(n) --> n for the frequency map, n for the max heap.
// where n = # of elenments currently in the frequency stack.

class Num {
  constructor(number, frequency, order) {
    this.number = number;
    this.frequency = frequency;
    this.order = order;
  }

  compare(Num2) {
    if (this.frequency === Num2.frequency) {
      return this.order > Num2.order // if frequency is equal, prioritize higher order (the number that was pushed later)
    }

    return this.frequency > Num2.frequency; // prioritize higher frequency by default.
  }
}

class FrequencyStack {
  constructor() {
    this.order = 0;
    this.frequencyMap = {};
    this.maxHeap = new Heap((a, b) => a.compare(b));
  }

  push(num) {
    if (this.frequencyMap[num]) this.frequencyMap[num]++;
    else this.frequencyMap[num] = 1;

    this.maxHeap.add(new Num(num, this.frequencyMap[num], this.order++)); // O(logn)
  }

  pop() {
    if (!this.maxHeap.size) throw new Error('FrequencyStack is empty.');

    const poppedNum = this.maxHeap.poll().number; // O(logn)
    this.frequencyMap[poppedNum]--;

    return poppedNum
  }
}


// TEST
const ex1 = new FrequencyStack();
ex1.push(1);
ex1.push(5);
ex1.push(1);
ex1.push(8);
ex1.push(8);
ex1.push(1);
ex1.push(5);
console.log(ex1.maxHeap.items);
console.log(ex1.pop());
console.log(ex1.maxHeap.items);
console.log(ex1.pop());
console.log(ex1.maxHeap.items);
console.log(ex1.pop());
console.log(ex1.maxHeap.items);
console.log(ex1.pop());
console.log(ex1.maxHeap.items);
console.log(ex1.pop());
console.log(ex1.maxHeap.items);
ex1.push(8);
console.log(ex1.maxHeap.items);
console.log(ex1.pop());
console.log(ex1.maxHeap.items);
console.log(ex1.pop());
console.log(ex1.maxHeap.items);
console.log(ex1.pop());
console.log(ex1.maxHeap.items);
