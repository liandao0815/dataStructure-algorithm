import { ArrayStack } from './Stack'
import { ArrayQueue } from './Queue'

/**
 * @description 二分树节点
 */
export class BinaryTreeNode<E> {
  e: E
  left: null | BinaryTreeNode<E>
  right: null | BinaryTreeNode<E>

  constructor(e: E) {
    this.e = e
    this.left = null
    this.right = null
  }
}

/**
 * @description 二分搜索树（BinarySearchTree）
 */
export class BST<E> {
  private root: BinaryTreeNode<E> | null
  private size: number

  constructor() {
    this.root = null
    this.size = 0
  }

  private _insert(node: BinaryTreeNode<E> | null, e: E): BinaryTreeNode<E> {
    if (node === null) {
      this.size++
      return new BinaryTreeNode<E>(e)
    }

    if (e < node.e) {
      node.left = this._insert(node.left, e)
    } else if (e > node.e) {
      node.right = this._insert(node.right, e)
    }

    return node
  }

  private _contains(node: BinaryTreeNode<E> | null, e: E): boolean {
    if (node === null) return false

    if (node.e === e) return true
    else if (e < node.e) return this._contains(node.left, e)
    else return this._contains(node.right, e)
  }

  private _findMinNode(node: BinaryTreeNode<E>): BinaryTreeNode<E> {
    if (!node) throw new Error('BST is Empty!')

    if (node.left) node.left = this._findMinNode(node.left)
    return node
  }

  private _removeMin(node: BinaryTreeNode<E>): BinaryTreeNode<E> | null {
    if (node.left === null) {
      const rightNode = node.right
      node.right === null
      this.size--
      return rightNode
    }

    node.left = this._removeMin(node.left)
    return node
  }

  private _removeMax(node: BinaryTreeNode<E>): BinaryTreeNode<E> | null {
    if (node.right === null) {
      const leftNode = node.left
      node.left === null
      this.size--
      return leftNode
    }

    node.right = this._removeMin(node.right)
    return node
  }

  private _remove(node: BinaryTreeNode<E> | null, e: E): BinaryTreeNode<E> | null {
    if (!node) return null

    if (e < node.e) {
      node.left = this._remove(node.left, e)
      return node
    } else if (e > node.e) {
      node.right = this._remove(node.right, e)
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

      // 左右子树均不为空，找到比待删除节点大的最小节点，并用该节点替换待删除节点
      const successor = this._findMinNode(node.right)
      successor.right = this._removeMin(node.right)
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

  // 递归(Recursive)方式插入新元素
  public insert(e: E): void {
    this.root = this._insert(this.root, e)
  }

  // 非递归方式插入新元素
  public insertNR(e: E): void {
    const newNode = new BinaryTreeNode<E>(e)

    if (this.root === null) {
      this.root = newNode
      this.size++
      return
    }

    let current: BinaryTreeNode<E> | null = this.root

    while (current) {
      if (e < current.e) {
        if (current.left === null) {
          current.left = newNode
          this.size++
          break
        }
        current = current.left
      } else if (e > current.e) {
        if (current.right === null) {
          current.right = newNode
          this.size++
          break
        }
        current = current.right
      } else return
    }
  }

  public contains(e: E): boolean {
    return this._contains(this.root, e)
  }

  // 前序遍历
  public frontTravers(node: BinaryTreeNode<E> | null = this.root): void {
    if (!node) return

    console.log(node.e)
    this.frontTravers(node.left)
    this.frontTravers(node.right)
  }

  // 中序遍历
  public middleTravers(node: BinaryTreeNode<E> | null = this.root): void {
    if (!node) return

    this.middleTravers(node.left)
    console.log(node.e)
    this.middleTravers(node.right)
  }

  // 后序遍历
  public backTravers(node: BinaryTreeNode<E> | null = this.root): void {
    if (!node) return

    this.backTravers(node.left)
    this.backTravers(node.right)
    console.log(node.e)
  }

  // 非递归前序遍历
  public frontTraversNR(): void {
    const stack = new ArrayStack<BinaryTreeNode<E> | null>()
    stack.push(this.root)

    while (!stack.isEmpty()) {
      const current = stack.pop() as BinaryTreeNode<E>
      console.log(current.e)

      if (current.right) stack.push(current.right)
      if (current.left) stack.push(current.left)
    }
  }

  // 层序遍历
  public levelTravers(): void {
    const queue = new ArrayQueue<BinaryTreeNode<E> | null>()
    queue.enqueue(this.root)

    while (!queue.isEmpty()) {
      const current = queue.dequeue() as BinaryTreeNode<E>
      console.log(current.e)

      if (current.left) queue.enqueue(current.left)
      if (current.right) queue.enqueue(current.right)
    }
  }

  // 非递归方式找出最小值
  public findMin(): E {
    if (!this.root) throw new Error('BST is empty!')

    let current = this.root

    while (current) {
      if (!current.left) break
      current = current.left
    }
    return current.e
  }

  // 递归方式找出最小值
  public findMinWR(node: BinaryTreeNode<E> | null = this.root): E | null {
    if (!node) return null

    if (!node.left) return node.e
    else return this.findMinWR(node.left)
  }

  public findMax(): E {
    if (!this.root) throw new Error('BST is empty!')

    let current = this.root

    while (current) {
      if (!current.right) break
      current = current.right
    }
    return current.e
  }

  public removeMin(): E {
    const ret = this.findMin()
    this.root = this._removeMin(this.root as BinaryTreeNode<E>)
    return ret
  }

  public removeMax(): E {
    const ret = this.findMax()
    this.root = this._removeMax(this.root as BinaryTreeNode<E>)
    return ret
  }

  public remove(e: E): void {
    this.root = this._remove(this.root, e)
  }
}
