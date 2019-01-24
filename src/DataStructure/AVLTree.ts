/**
 * @description AVLTree 节点
 */
export class AVLTreeNode<E> {
  value: E
  left: AVLTreeNode<E> | null = null
  right: AVLTreeNode<E> | null = null
  height: number = 1

  constructor(value: E) {
    this.value = value
  }
}

/**
 * @description AVLTree
 */
export class AVLTree<E> {
  private root: AVLTreeNode<E> | null = null
  private size: number = 0

  // 返回节点高度
  private getHeight(node: AVLTreeNode<E> | null): number {
    if (!node) return 0
    return node.height
  }

  // 计算平衡因子
  private getBalanceFactor(node: AVLTreeNode<E> | null): number {
    if (!node) return 0
    return this.getHeight(node.left) - this.getHeight(node.right)
  }

  // 将 nodeY 右旋转，返回旋转后的根节点
  private rightRotate(nodeY: AVLTreeNode<E>): AVLTreeNode<E> {
    const nodeX = nodeY.left as AVLTreeNode<E>
    const nodeZ = nodeX.right

    nodeX.right = nodeY
    nodeY.left = nodeZ

    nodeY.height = Math.max(this.getHeight(nodeY.left), this.getHeight(nodeY.right)) + 1
    nodeX.height = Math.max(this.getHeight(nodeX.left), this.getHeight(nodeX.right)) + 1

    return nodeX
  }

  // 将 nodeY 左旋转，返回旋转后的根节点
  private leftRotate(nodeY: AVLTreeNode<E>): AVLTreeNode<E> {
    const nodeX = nodeY.right as AVLTreeNode<E>
    const nodeZ = nodeX.left

    nodeX.left = nodeY
    nodeY.right = nodeZ

    nodeY.height = Math.max(this.getHeight(nodeY.left), this.getHeight(nodeY.right)) + 1
    nodeX.height = Math.max(this.getHeight(nodeX.left), this.getHeight(nodeX.right)) + 1

    return nodeX
  }

  // 平衡维护
  private maintain(node: AVLTreeNode<E> | null): AVLTreeNode<E> | null {
    if (!node) return null

    const balanceFactor = this.getBalanceFactor(node)

    if (balanceFactor > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rightRotate(node)
    }
    if (balanceFactor < -1 && this.getBalanceFactor(node.right) <= 0) {
      return this.leftRotate(node)
    }
    if (balanceFactor > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.leftRotate(node.left as AVLTreeNode<E>)
      return this.rightRotate(node)
    }
    if (balanceFactor < -1 && this.getBalanceFactor(node.right) > 0) {
      node.right = this.rightRotate(node.right as AVLTreeNode<E>)
    }
    return node
  }

  private _findMinNode(node: AVLTreeNode<E>): AVLTreeNode<E> {
    if (!node) throw new Error('AVLTree is Empty!')

    if (node.left) node.left = this._findMinNode(node.left)
    return node
  }

  private _insert(node: AVLTreeNode<E> | null, value: E): AVLTreeNode<E> | null {
    if (!node) {
      this.size++
      return new AVLTreeNode<E>(value)
    }

    if (value < node.value) node.left = this._insert(node.left, value)
    else if (value > node.value) node.right = this._insert(node.right, value)
    else node.value = value

    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1

    return this.maintain(node)
  }

  private _remove(node: AVLTreeNode<E> | null, value: E): AVLTreeNode<E> | null {
    if (!node) return null

    let retNode: AVLTreeNode<E> | null

    if (value < node.value) {
      node.left = this._remove(node.left, value)
      retNode = node
    } else if (value > node.value) {
      node.right = this._remove(node.right, value)
      retNode = node
    } else {
      if (node.left === null) {
        const rightNode = node.right
        node.right = null
        this.size--
        retNode = rightNode
      } else if (node.right === null) {
        const leftNode = node.left
        node.left = null
        this.size--
        retNode = leftNode
      } else {
        const successor = this._findMinNode(node.right)
        successor.right = this._remove(node.right, successor.value)
        successor.left = node.left

        node.left = node.right = null
        retNode = successor
      }
    }

    return this.maintain(retNode)
  }

  private midTravers(node: AVLTreeNode<E> | null, array: E[]): void {
    if (!node) return

    this.midTravers(node.left, array)
    array.push(node.value)
    this.midTravers(node.right, array)
  }

  public getSize(): number {
    return this.size
  }

  public isEmpty(): boolean {
    return this.size === 0
  }

  public insert(value: E): void {
    this.root = this._insert(this.root, value)
  }

  public remove(value: E): void {
    this.root = this._remove(this.root, value)
  }

  public isBST(): boolean {
    const values = new Array<E>()
    this.midTravers(this.root, values)

    for (let i = 1; i <= values.length; i++) {
      if (values[i - 1] > values[i]) return false
    }

    return true
  }

  public isBalanced(node: AVLTreeNode<E> | null = this.root): boolean {
    if (!node) return true

    const balanceFactor = this.getBalanceFactor(node)
    if (Math.abs(balanceFactor) > 1) return false

    return this.isBalanced(node.left) && this.isBalanced(node.right)
  }
}
