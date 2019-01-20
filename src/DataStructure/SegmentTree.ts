/**
 * @description 线段树
 */
export class SegmentTree<E> {
  private data: E[]
  private tree: E[]
  private merger: (a: E, b: E) => E

  constructor(arr: E[], merger: (a: E, b: E) => E) {
    this.data = [...arr]
    this.tree = []
    this.merger = merger

    this.buildSegmentTree(0, 0, this.data.length - 1)
  }

  private buildSegmentTree(treeIndex: number, l: number, r: number): void {
    if (l === r) {
      this.tree[treeIndex] = this.data[l]
      return
    }

    const leftChildIndex = this.leftChild(treeIndex)
    const rightChildIndex = this.rightChild(treeIndex)

    const mid = Math.floor(l + (r - l) / 2)
    this.buildSegmentTree(leftChildIndex, l, mid)
    this.buildSegmentTree(rightChildIndex, mid + 1, r)

    this.tree[treeIndex] = this.merger(this.tree[leftChildIndex], this.tree[rightChildIndex])
  }

  private leftChild(index: number): number {
    return 2 * index + 1
  }

  private rightChild(index: number): number {
    return 2 * index + 2
  }

  private _query(treeIndex: number, l: number, r: number, queryL: number, queryR: number): E {
    if (l === queryL && r === queryR) return this.tree[treeIndex]

    const leftChildIndex = this.leftChild(treeIndex)
    const rightChildIndex = this.rightChild(treeIndex)

    const mid = Math.floor(l + (r - l) / 2)

    if (queryL >= mid + 1) return this._query(rightChildIndex, mid + 1, r, queryL, queryR)
    else if (queryR <= mid) return this._query(leftChildIndex, l, mid, queryL, queryR)

    const leftResult = this._query(leftChildIndex, l, mid, queryL, mid)
    const rightResult = this._query(rightChildIndex, mid + 1, r, mid + 1, queryR)

    return this.merger(leftResult, rightResult)
  }

  private _set(treeIndex: number, l: number, r: number, index: number, e: E) {
    if (l === r) {
      this.tree[treeIndex] = e
      return
    }

    const leftChildIndex = this.leftChild(treeIndex)
    const rightChildIndex = this.rightChild(treeIndex)

    const mid = Math.floor(l + (r - l) / 2)

    if (index >= mid + 1) this._set(rightChildIndex, mid + 1, r, index, e)
    else this._set(leftChildIndex, l, mid, index, e)

    this.tree[treeIndex] = this.merger(this.tree[leftChildIndex], this.tree[rightChildIndex])
  }

  public getSize(): number {
    return this.data.length
  }

  public get(index: number): E {
    if (index < 0 || index >= this.data.length) {
      throw new Error('Index is illegal.')
    }

    return this.data[index]
  }

  public query(queryL: number, queryR: number): E {
    if (
      queryL < 0 ||
      queryL >= this.data.length ||
      queryR < 0 ||
      queryR >= this.data.length ||
      queryL > queryR
    ) {
      throw new Error('Index is illegal.')
    }

    return this._query(0, 0, this.data.length - 1, queryL, queryR)
  }

  public set(index: number, e: E): void {
    if (index < 0 || index >= this.data.length) {
      throw new Error('Index is illegal.')
    }

    this._set(0, 0, this.data.length - 1, index, e)
  }

  public toString(): string {
    let contentMsg = ''

    for (let i = 0; i < this.tree.length; i++) {
      if (this.tree[i]) contentMsg += this.tree[i]
      else contentMsg += 'null'

      if (i !== this.tree.length - 1) contentMsg += ', '
    }

    return `[ ${contentMsg} ]`
  }
}
