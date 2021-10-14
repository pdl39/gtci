class PriorityQueue {
  #capacity;

  /* comparator determines the priority type (min vs max)
  and what values are to be compared (if items in the heap are nodes, for example, we would need to compare the values of the nodes, e.g. a.value < b.value, whereas if items in the heap are numbers, we can simply compare items themselves, e.g. a > b).
  If no comparator function is entered, the priority queue will default to a min heap, with the compared values being the items themselves.
  It takes two arguments (a, b) that each represent the actual item that gets stored in the priority queue.
  It returns the boolean result of comparing a verion of a and b.
  e.g. a > b, a.end < b.start, etc.
  Given a, b, in that order, if a < b, it is a min heap, if a > b, it is a max heap.
  e.g.
  (a, b) => a < b     min heap
  (a, b) => a > b     max heap
  */
  constructor(comparator = (a, b) => a < b, capacity = 10) {
    this.#capacity = capacity;
    this.comparator = comparator;
    this.size = 0;
    this.items = new Array(capacity).fill(null);
  };

  #getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  };

  #getLeftChildIndex(index) {
    return (index * 2) + 1;
  };

  #getRightChildIndex(index) {
    return (index * 2) + 2;
  };

  #hasParent(index) {
    return this.#getParentIndex(index) >= 0;
  };

  #hasLeftChild(index) {
    return this.#getLeftChildIndex(index) < this.size;
  };

  #hasRightChild(index) {
    return this.#getRightChildIndex(index) < this.size;
  }

  #parent(index) {
    return this.items[this.#getParentIndex(index)];
  };

  #leftChild(index) {
    return this.items[this.#getLeftChildIndex(index)];
  };

  #rightChild(index) {
    return this.items[this.#getRightChildIndex(index)];
  };

  #swap(index1, index2) {
    let temp = this.items[index1];
    this.items[index1] = this.items[index2];
    this.items[index2] = temp;
  }

  #ensureEnoughCapacity() {
    if (this.size < this.#capacity) return;

    const existingItems = [...this.items];
    this.#capacity *= 2;
    this.items = new Array(this.#capacity);
    existingItems.forEach((item, idx) => this.items[idx] = item);
  }

  peek() {
    if (this.size === 0) throw new Error('Heap is empty.');
    return this.items[0];
  }

  poll() { // remove the min.
    if (this.size === 0) throw new Error('Heap is empty.');

    let item = this.items[0];
    this.#swap(0, this.size - 1);
    this.items[this.size - 1] = null;
    this.size--;
    this.heapifyDown();

    return item;
  }

  add(item) { // add new item.
    this.#ensureEnoughCapacity();

    this.items[this.size] = item;
    this.size++;
    this.heapifyUp();
  }

  heapifyUp(index = this.size - 1) {
    while (this.#hasParent(index) && this.comparator(this.items[index], this.#parent(index))) {
      this.#swap(index, this.#getParentIndex(index));
      index = this.#getParentIndex(index);
    }
  }

  heapifyDown(index = 0) {
    // we only need to check if there is a left child, since if there is no left child, there will be no right child.
    while (this.#hasLeftChild(index)) {
      let smallerChildIndex = this.#getLeftChildIndex(index);
      if (this.#hasRightChild(index) && this.comparator(this.#rightChild(index), this.#leftChild(index))) {
        smallerChildIndex = this.#getRightChildIndex(index);
      }

      if (this.comparator(this.items[smallerChildIndex], this.items[index])) {
        this.#swap(smallerChildIndex, index);
        index = smallerChildIndex;
      }
      else break;
    }
  }

  remove(num) {
    let index = 0;
    while (num !== this.items[index] && index < this.size) {
      index++;
    }

    if (index === this.size) throw new Error(`ERROR: ${num} is not in the heap.`);

    for (let i = index; i < this.size - 1; i++) {
      this.#swap(i, i + 1);
    }
    this.items[this.size - 1] = null;
    this.size--;
  }

  build(arr) {
    if (this.size) throw new Error('ERROR: Heap already exists.');

    this.size = arr.length;
    this.#ensureEnoughCapacity();

    // leaf nodes: ceil(n/2) ~ n - 1
    for (let i = this.size - 1; i > Math.ceil(this.size/2) - 1; i--) {
      this.items[i] = arr[i];
    }
    // non-leaf nodes: index 0 ~ ceil(n/2) - 1
    for (let i = Math.ceil(this.size/2) - 1; i >= 0; i--) {
      this.items[i] = arr[i];
      this.heapifyDown(i);
    }
  }
};

module.exports = PriorityQueue;
