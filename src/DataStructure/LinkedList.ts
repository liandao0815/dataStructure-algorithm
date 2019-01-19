/**
 * @description 单向链表节点
 */
export class _Node<E> {
  e: E | null
  next: _Node<E> | null

  constructor(e: E | null, next: _Node<E> | null = null) {
    this.e = e
    this.next = next
  }
}

/**
 * @description 双向链表节点
 */
export class _DoublyNode<E> {
  e: E | null
  next: _DoublyNode<E> | null
  prev: _DoublyNode<E> | null

  constructor(e: E | null, next: _DoublyNode<E> | null = null, prev: _DoublyNode<E> | null = null) {
    this.e = e
    this.next = next
    this.prev = prev
  }
}

/**
 * @description 单向链表
 */
export class LinkedList<E> {
  private dummyHead: _Node<E>
  private size: number

  constructor() {
    this.dummyHead = new _Node<E>(null, null)
    this.size = 0
  }

  public getSize(): number {
    return this.size
  }

  public isEmpty(): boolean {
    return this.size === 0
  }

  public add(index: number, e: E): void {
    if (index < 0 || index > this.size) {
      throw new Error('Add failed. Illegal index.')
    }

    let prev: _Node<E> = this.dummyHead

    for (let i = 0; i < index; i++) {
      prev = prev.next as _Node<E>
    }

    prev.next = new _Node<E>(e, prev.next)
    this.size++
  }

  public addFirst(e: E): void {
    this.add(0, e)
  }

  public addLast(e: E): void {
    this.add(this.size, e)
  }

  public get(index: number): E {
    if (index < 0 || index >= this.size) {
      throw new Error('Get failed. Illegal index.')
    }

    let cur: _Node<E> = this.dummyHead.next as _Node<E>

    for (let i = 0; i < index; i++) {
      cur = cur.next as _Node<E>
    }

    return cur.e as E
  }

  public getFirst(): E {
    return this.get(0)
  }

  public getLast(): E {
    return this.get(this.size - 1)
  }

  public set(index: number, e: E) {
    if (index < 0 || index >= this.size) {
      throw new Error('Get failed. Illegal index.')
    }

    let cur: _Node<E> = this.dummyHead.next as _Node<E>

    for (let i = 0; i < index; i++) {
      cur = cur.next as _Node<E>
    }

    cur.e = e
  }

  public contains(e: E): boolean {
    let cur: _Node<E> | null = this.dummyHead.next

    while (cur !== null) {
      if (cur.e === e) {
        return true
      }

      cur = cur.next
    }

    return false
  }

  public remove(index: number): E {
    if (index < 0 || index >= this.size) {
      throw new Error('Get failed. Illegal index.')
    }

    let prev: _Node<E> = this.dummyHead

    for (let i = 0; i < index; i++) {
      prev = prev.next as _Node<E>
    }

    const retNode: _Node<E> = prev.next as _Node<E>
    prev.next = retNode.next
    retNode.next = null
    this.size--

    return retNode.e as E
  }

  public removeFirst(): E {
    return this.remove(0)
  }

  public removeLast(): E {
    return this.remove(this.size - 1)
  }

  public removeElement(e: E): void {
    let prev = this.dummyHead

    while (prev.next) {
      if (prev.next.e === e) break

      prev = prev.next
    }

    if (prev.next !== null) {
      const delNode = prev.next
      prev.next = delNode.next
      delNode.next = null
      this.size--
    }
  }

  public toString(): string {
    let contentMsg: string = ''

    for (let cur = this.dummyHead.next; cur != null; cur = cur.next) {
      contentMsg += `${cur.e} -> `
    }

    return (contentMsg += 'NULL')
  }
}

/**
 * @description 双向链表
 */
export class DoublyLinkedList<E> {
  private head: _DoublyNode<E> | null
  private tail: _DoublyNode<E> | null

  constructor() {
    this.head = null
    this.tail = null
  }

  public prepend(e: E): void {
    const newNode = new _DoublyNode<E>(e, this.head)

    if (this.head) {
      this.head.prev = newNode
      newNode.next = this.head
    } else {
      this.tail = newNode
    }

    this.head = newNode
  }

  public append(e: E): void {
    const newNode = new _DoublyNode<E>(e)

    if (this.tail) {
      this.tail.next = newNode
      newNode.prev = this.tail
    } else {
      this.head = newNode
    }

    this.tail = newNode
  }

  public deleteHead(): E | null {
    if (!this.head) return null

    const deleteHead = this.head

    if (this.head.next) {
      this.head = this.head.next
      this.head.prev = null
    } else {
      this.head = null
      this.tail = null
    }

    return deleteHead.e
  }

  public deleteTail(): E | null {
    if (!this.tail) return null

    const deleteTail = this.tail

    if (this.head === this.tail) {
      this.head = null
      this.tail = null
    } else {
      this.tail = this.tail.prev
      ;(this.tail as _DoublyNode<E>).next = null
    }

    return deleteTail.e
  }

  public delete(e: E): void {
    if (!this.head) return

    let deleteNode: _DoublyNode<E> | null = null
    let currentNode: _DoublyNode<E> | null = this.head

    while (currentNode) {
      if (currentNode.e === e) {
        if (deleteNode === this.head) {
          this.deleteHead()
        } else if (deleteNode === this.tail) {
          this.deleteTail()
        } else {
          deleteNode = currentNode

          const prevNode: _DoublyNode<E> = (deleteNode as _DoublyNode<E>).prev as _DoublyNode<E>
          const nextNode: _DoublyNode<E> = (deleteNode as _DoublyNode<E>).next as _DoublyNode<E>

          prevNode.next = nextNode
          nextNode.prev = prevNode
        }
      }

      currentNode = currentNode.next
    }
  }

  public toString(): string {
    let contentMsg: string = ''
    let current: _Node<E> | null = this.head

    while (current) {
      contentMsg += `${current.e} <-> `
      current = current.next
    }

    return `NULL <-> ${contentMsg} NULL`
  }
}

/**
 * @description 单向循环链表
 */
export class CircularLinkedList<E> {
  private head: _Node<E> | null
  private size: number

  constructor() {
    this.head = null
    this.size = 0
  }

  public getSize(): number {
    return this.size
  }

  public isEmpty(): boolean {
    return this.size === 0
  }

  public append(e: E): void {
    const newNode = new _Node<E>(e)

    if (!this.head) {
      this.head = newNode
      this.head.next = this.head
      this.size++
    } else {
      let current: _Node<E> = this.head
      while (current.next !== this.head) {
        current = current.next as _Node<E>
      }

      current.next = newNode
      newNode.next = this.head
      this.head = newNode
      this.size++
    }
  }

  public remove(): E | null {
    if (!this.head) return null

    let current: _Node<E> = this.head
    while (current.next !== this.head) {
      current = current.next as _Node<E>
    }

    const retNode: _Node<E> = this.head

    this.head = this.head.next
    current.next = this.head
    this.size--

    return retNode.e
  }

  public toString(): string {
    if (!this.head) return '-> ->'

    let contentMsg: string = ''
    let current: _Node<E> | null = this.head.next

    while (current && current !== this.head) {
      contentMsg += `${current.e} -> `
      current = current.next
    }

    return `-> ${this.head.e} -> ${contentMsg}`
  }
}
