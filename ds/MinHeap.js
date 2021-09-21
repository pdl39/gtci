class MinHeap {
  #capacity;

  constructor(capacity = 10) {
    this.#capacity = capacity;
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
    while (this.#hasParent(index) && this.items[index] < this.#parent(index)) {
      this.#swap(index, this.#getParentIndex(index));
      index = this.#getParentIndex(index);
    }
  }

  heapifyDown(index = 0) {
    // we only need to check if there is a left child, since if there is no left child, there will be no right child.
    while (this.#hasLeftChild(index)) {
      let smallerChildIndex = this.#getLeftChildIndex(index);
      if (this.#hasRightChild(index) && this.#rightChild(index) < this.#leftChild(index)) {
        smallerChildIndex = this.#getRightChildIndex(index);
      }

      if (this.items[smallerChildIndex] < this.items[index]) {
        this.#swap(smallerChildIndex, index);
        index = smallerChildIndex;
      }
      else break;
    }
  }
};

module.exports = MinHeap;
