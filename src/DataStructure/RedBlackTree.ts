const RED = true
const BLACK = false

/**
 * @description 红黑树
 */
export class RBTreeNode<E> {
  value: E
  left: RBTreeNode<E> | null = null
  right: RBTreeNode<E> | null = null
  color: boolean = RED

  constructor(value: E) {
    this.value = value
  }
}

/**
 * @description 红黑树
 */
export class RedBlackTree<E> {
  private root: RBTreeNode<E> | null
  private size: number

  constructor() {
    this.root = null
    this.size = 0
  }

  private isRed(node: RBTreeNode<E> | null): boolean {
    if (!node) return BLACK
    return node.color
  }

  // 左旋转
  private leftRotate(node: RBTreeNode<E>): RBTreeNode<E> {
    const x = node.right as RBTreeNode<E>

    node.right = x.left
    x.left = node
    x.color = node.color
    node.color = RED

    return x
  }

  // 右旋转
  private rightRotate(node: RBTreeNode<E>): RBTreeNode<E> {
    const x = node.left as RBTreeNode<E>

    node.left = x.right
    x.right = node
    x.color = node.color
    node.color = RED

    return x
  }

  // 颜色翻转
  private flipColors(node: RBTreeNode<E>): void {
    node.color = RED
    if (node.left) node.left.color = BLACK
    if (node.right) node.right.color = BLACK
  }

  private _insert(node: RBTreeNode<E> | null, value: E): RBTreeNode<E> {
    if (node === null) {
      this.size++
      return new RBTreeNode<E>(value)
    }

    if (value < node.value) node.left = this._insert(node.left, value)
    else if (value > node.value) node.right = this._insert(node.right, value)
    else node.value = value

    if (this.isRed(node.right) && !this.isRed(node.left)) node = this.leftRotate(node)
    if (this.isRed(node.left) && this.isRed((<RBTreeNode<E>>node.left).left))
      node = this.rightRotate(node)
    if (this.isRed(node.left) && this.isRed(node.right)) this.flipColors(node)

    return node
  }

  public getSize(): number {
    return this.size
  }

  public isEmpty(): boolean {
    return this.size === 0
  }

  public insert(value: E): void {
    this.root = this._insert(this.root, value)
    this.root.color = BLACK
  }
}
