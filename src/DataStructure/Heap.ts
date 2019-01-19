import { _Array } from './Array'

/**
 * @description 最大堆
 */
export class MaxHeap<E> {
  private data: _Array<E>

  constructor(arg?: number | E[]) {
    if (typeof arg === 'object') {
      this.data = new _Array<E>(arg)
      // heapify
      for (let i = this.parent(arg.length - 1); i >= 0; i--) this.shiftDown(i)
    } else {
      this.data = new _Array<E>(arg)
    }
  }

  // 返回父节点的索引
  private parent(index: number): number {
    if (index === 0) throw new Error(`index-0 doesn't have parent.`)

    return Math.floor((index - 1) / 2)
  }

  // 返回左孩子节点的索引
  private leftChild(index: number): number {
    return index * 2 + 1
  }

  // 返回右孩子节点的索引
  private rightChild(index: number): number {
    return index * 2 + 2
  }

  private shiftUp(k: number): void {
    while (k > 0 && this.data.get(k) > this.data.get(this.parent(k))) {
      this.data.swap(k, this.parent(k))
      k = this.parent(k)
    }
  }

  private shiftDown(k: number): void {
    while (this.leftChild(k) < this.data.getSize()) {
      let j = this.leftChild(k)

      if (j + 1 < this.data.getSize() && this.data.get(j) < this.data.get(j + 1)) {
        j = this.rightChild(k)
      }
      if (this.data.get(k) > this.data.get(j)) break

      this.data.swap(k, j)
      k = j
    }
  }

  public size(): number {
    return this.data.getSize()
  }

  public isEmpty(): boolean {
    return this.data.isEmpty()
  }

  public findMax(): E {
    if (this.data.getSize() === 0) {
      throw new Error('Can not findMax when heap is empty.')
    }

    return this.data.get(0)
  }

  public add(e: E): void {
    this.data.addLast(e)
    this.shiftUp(this.data.getSize() - 1)
  }

  public extractMax(): E {
    const ret = this.findMax()

    this.data.swap(0, this.data.getSize() - 1)
    this.data.removeLast()
    this.shiftDown(0)

    return ret
  }

  public repalce(e: E): E {
    const ret = this.findMax()

    this.data.set(0, e)
    this.shiftDown(0)

    return ret
  }
}

/**
 * @description 最小堆
 */
export class MinHeap<E> {
  private data: _Array<E>

  constructor(arg?: number | E[]) {
    if (typeof arg === 'object') {
      this.data = new _Array<E>(arg)
      // heapify
      for (let i = this.parent(arg.length - 1); i >= 0; i--) this.shiftDown(i)
    } else {
      this.data = new _Array<E>(arg)
    }
  }

  private parent(index: number): number {
    if (index === 0) throw new Error(`index-0 doesn't have parent.`)

    return Math.floor((index - 1) / 2)
  }

  private leftChild(index: number): number {
    return index * 2 + 1
  }
  
  private rightChild(index: number): number {
    return index * 2 + 2
  }

  private shiftUp(k: number): void {
    while (k > 0 && this.data.get(k) < this.data.get(this.parent(k))) {
      this.data.swap(k, this.parent(k))
      k = this.parent(k)
    }
  }

  private shiftDown(k: number): void {
    while (this.leftChild(k) < this.data.getSize()) {
      let j = this.leftChild(k)

      if (j + 1 < this.data.getSize() && this.data.get(j + 1) < this.data.get(j)) {
        j = this.rightChild(k)
      }
      if (this.data.get(k) < this.data.get(j)) break

      this.data.swap(k, j)
      k = j
    }
  }

  public size(): number {
    return this.data.getSize()
  }

  public isEmpty(): boolean {
    return this.data.isEmpty()
  }

  public findMin(): E {
    if (this.data.getSize() === 0) {
      throw new Error('Can not findMin when heap is empty.')
    }

    return this.data.get(0)
  }

  public add(e: E): void {
    this.data.addLast(e)
    this.shiftUp(this.data.getSize() - 1)
  }

  public extractMin(): E {
    const ret = this.findMin()

    this.data.swap(0, this.data.getSize() - 1)
    this.data.removeLast()
    this.shiftDown(0)

    return ret
  }

  public repalce(e: E): E {
    const ret = this.findMin()

    this.data.set(0, e)
    this.shiftDown(0)

    return ret
  }
}
