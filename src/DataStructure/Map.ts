/**
 * @description 映射的方法接口
 */
interface _Map<K, V> {
  put(key: K, value: V): void
  remove(key: K): V | null
  contains(key: K): boolean
  get(key: K): V | null
  set(key: K, newValue: V): void
  getSize(): number
  isEmpty(): boolean
}

/**
 * @description 链表映射的节点
 */
export class ListMapNode<K, V> {
  key: K | null
  value: V | null
  next: ListMapNode<K, V> | null

  constructor(key: K | null = null, value: V | null = null, next: ListMapNode<K, V> | null = null) {
    this.key = key
    this.value = value
    this.next = next
  }

  public toString(): string {
    if (this.key && this.value) {
      return `${this.key.toString()} : ${this.value.toString()}`
    }
    return ''
  }
}

/**
 * @description 二分搜索树映射节点
 */
export class BSTMapNode<K, V> {
  key: K
  value: V
  left: BSTMapNode<K, V> | null
  right: BSTMapNode<K, V> | null

  constructor(key: K, value: V) {
    this.key = key
    this.value = value
    this.left = null
    this.right = null
  }
}

/**
 * @description 基于链表的映射
 */
export class LinkedListMap<K, V> implements _Map<K, V> {
  private dummyHead: ListMapNode<K, V>
  private size: number

  constructor() {
    this.dummyHead = new ListMapNode<K, V>()
    this.size = 0
  }

  private getMapNode(key: K): ListMapNode<K, V> | null {
    let cur = this.dummyHead.next

    while (cur) {
      if (cur.key === key) return cur
      cur = cur.next
    }

    return null
  }

  public getSize(): number {
    return this.size
  }

  public isEmpty(): boolean {
    return this.size === 0
  }

  public contains(key: K): boolean {
    return this.getMapNode(key) !== null
  }

  public get(key: K): V | null {
    const mapNode = this.getMapNode(key)
    return mapNode === null ? null : mapNode.value
  }

  public put(key: K, value: V): void {
    const mapNode = this.getMapNode(key)

    if (!mapNode) {
      this.dummyHead.next = new ListMapNode<K, V>(key, value, this.dummyHead.next)
      this.size++
    } else {
      mapNode.value = value
    }
  }

  public set(key: K, newValue: V): void {
    const mapNode = this.getMapNode(key)

    if (!mapNode) throw new Error(`${key} doesn't exist!`)
    mapNode.value = newValue
  }

  public remove(key: K): V | null {
    let prev = this.dummyHead

    while (prev.next) {
      if (prev.next.key === key) break
      prev = prev.next
    }

    if (prev.next) {
      const delMapNode = prev.next
      prev.next = delMapNode.next
      delMapNode.next = null
      this.size--
      return delMapNode.value
    }

    return null
  }
}

/**
 * @description 基于二分搜索树的映射
 */
export class BSTMap<K, V> implements _Map<K, V> {
  private root: BSTMapNode<K, V> | null
  private size: number

  constructor() {
    this.root = null
    this.size = 0
  }

  private _put(node: BSTMapNode<K, V> | null, key: K, value: V): BSTMapNode<K, V> {
    if (node === null) {
      this.size++
      return new BSTMapNode<K, V>(key, value)
    }

    if (key < node.key) node.left = this._put(node.left, key, value)
    else if (key > node.key) node.right = this._put(node.right, key, value)
    else node.value = value

    return node
  }

  private getMapNode(node: BSTMapNode<K, V> | null, key: K): BSTMapNode<K, V> | null {
    if (node === null) return null

    if (key === node.key) return node
    else if (key < node.key) return this.getMapNode(node.left, key)
    else return this.getMapNode(node.right, key)
  }

  private findMin(node: BSTMapNode<K, V>): BSTMapNode<K, V> {
    if (!node.left) return node
    return this.findMin(node.left)
  }

  private removeMin(node: BSTMapNode<K, V>): BSTMapNode<K, V> | null {
    if (!node.left) {
      const rightNode = node.right
      node.right = null
      this.size--
      return rightNode
    }

    node.left = this.removeMin(node.left)
    return node
  }

  private _remove(node: BSTMapNode<K, V> | null, key: K): BSTMapNode<K, V> | null {
    if (!node) return null

    if (key < node.key) {
      node.left = this._remove(node.left, key)
      return node
    } else if (key > node.key) {
      node.right = this._remove(node.right, key)
      return node
    } else {
      if (node.left === null) {
        const rightNode = node.right
        node.right = null
        this.size--
        return rightNode
      }

      if (node.right === null) {
        const leftNode = node.left
        node.left = null
        this.size--
        return leftNode
      }

      const successor = this.findMin(node.right)
      successor.right = this.removeMin(node.right)
      successor.left = node.left

      node.left = node.right = null

      return successor
    }
  }

  public getSize(): number {
    return this.size
  }

  public isEmpty(): boolean {
    return this.size === 0
  }

  public put(key: K, value: V): void {
    this.root = this._put(this.root, key, value)
  }

  public contains(key: K): boolean {
    return this.getMapNode(this.root, key) !== null
  }

  public get(key: K): V | null {
    const mapNode = this.getMapNode(this.root, key)
    return mapNode === null ? null : mapNode.value
  }

  public set(key: K, newValue: V): void {
    const mapNode = this.getMapNode(this.root, key)

    if (!mapNode) throw new Error(`${key} doesn't exist!`)
    mapNode.value = newValue
  }

  public remove(key: K): V | null {
    const node = this.getMapNode(this.root, key)

    if (node) {
      this.root = this._remove(this.root, key)
      return node.value
    }

    return null
  }
}
