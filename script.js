// Get input from the user
const input = document.getElementById("rope-lengths").value;
const lengths = input.split(",").map(Number);

// Define a min heap data structure
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    const result = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown(0);
    }
    return result;
  }

  bubbleUp(pos) {
    const parentIdx = Math.floor((pos - 1) / 2);
    if (pos > 0 && this.heap[pos] < this.heap[parentIdx]) {
      [this.heap[pos], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[pos]];
      this.bubbleUp(parentIdx);
    }
  }

  bubbleDown(pos) {
    const leftIdx = 2 * pos + 1;
    const rightIdx = 2 * pos + 2;
    let minIdx = pos;
    if (leftIdx < this.heap.length && this.heap[leftIdx] < this.heap[minIdx]) {
      minIdx = leftIdx;
    }
    if (rightIdx < this.heap.length && this.heap[rightIdx] < this.heap[minIdx]) {
      minIdx = rightIdx;
    }
    if (minIdx !== pos) {
      [this.heap[minIdx], this.heap[pos]] = [this.heap[pos], this.heap[minIdx]];
      this.bubbleDown(minIdx);
    }
  }

  get size() {
    return this.heap.length;
  }
}

// Define a function to merge ropes
function mergeRopes(lengths) {
  // Initialize the min heap with the given lengths
  const heap = new MinHeap();
  for (const length of lengths) {
    heap.push(length);
  }

  // Merge the ropes
  let cost = 0;
  while (heap.size > 1) {
    const a = heap.pop();
    const b = heap.pop();
    const merged = a + b;
    cost += merged;
    heap.push(merged);
  }

  return cost;
}

// Calculate the minimum cost and display it
const cost = mergeRopes(lengths);
document.getElementById("result").textContent = cost;
