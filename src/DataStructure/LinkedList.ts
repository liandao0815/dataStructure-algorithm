/**
 * @description 单向链表节点
 */
export class LinkedListNode<E> {
  e: E | null
  next: LinkedListNode<E> | null

  constructor(e: E | null, next: LinkedListNode<E> | null = null) {
    this.e = e
    this.next = next
  }
}

/**
 * @description 双向链表节点
 */
export class DoublyLinkedListNode<E> {
  e: E | null
  next: DoublyLinkedListNode<E> | null
  prev: DoublyLinkedListNode<E> | null

  constructor(
    e: E | null,
    next: DoublyLinkedListNode<E> | null = null,
    prev: DoublyLinkedListNode<E> | null = null
  ) {
    this.e = e
    this.next = next
    this.prev = prev
  }
}

/**
 * @description 单向链表
 */
export class LinkedList<E> {
  private dummyHead: LinkedListNode<E>
  private size: number

  constructor() {
    this.dummyHead = new LinkedListNode<E>(null, null)
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

    let prev: LinkedListNode<E> = this.dummyHead

    for (let i = 0; i < index; i++) {
      prev = prev.next as LinkedListNode<E>
    }

    prev.next = new LinkedListNode<E>(e, prev.next)
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

    let cur: LinkedListNode<E> = this.dummyHead.next as LinkedListNode<E>

    for (let i = 0; i < index; i++) {
      cur = cur.next as LinkedListNode<E>
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

    let cur: LinkedListNode<E> = this.dummyHead.next as LinkedListNode<E>

    for (let i = 0; i < index; i++) {
      cur = cur.next as LinkedListNode<E>
    }

    cur.e = e
  }

  public contains(e: E): boolean {
    let cur: LinkedListNode<E> | null = this.dummyHead.next

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

    let prev: LinkedListNode<E> = this.dummyHead

    for (let i = 0; i < index; i++) {
      prev = prev.next as LinkedListNode<E>
    }

    const retNode: LinkedListNode<E> = prev.next as LinkedListNode<E>
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
  private head: DoublyLinkedListNode<E> | null
  private tail: DoublyLinkedListNode<E> | null

  constructor() {
    this.head = null
    this.tail = null
  }

  public prepend(e: E): void {
    const newNode = new DoublyLinkedListNode<E>(e, this.head)

    if (this.head) {
      this.head.prev = newNode
      newNode.next = this.head
    } else {
      this.tail = newNode
    }

    this.head = newNode
  }

  public append(e: E): void {
    const newNode = new DoublyLinkedListNode<E>(e)

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
      ;(this.tail as DoublyLinkedListNode<E>).next = null
    }

    return deleteTail.e
  }

  public delete(e: E): void {
    if (!this.head) return

    let deleteNode: DoublyLinkedListNode<E> | null = null
    let currentNode: DoublyLinkedListNode<E> | null = this.head

    while (currentNode) {
      if (currentNode.e === e) {
        if (deleteNode === this.head) {
          this.deleteHead()
        } else if (deleteNode === this.tail) {
          this.deleteTail()
        } else {
          deleteNode = currentNode

          const prevNode: DoublyLinkedListNode<E> = (deleteNode as DoublyLinkedListNode<E>)
            .prev as DoublyLinkedListNode<E>
          const nextNode: DoublyLinkedListNode<E> = (deleteNode as DoublyLinkedListNode<E>)
            .next as DoublyLinkedListNode<E>

          prevNode.next = nextNode
          nextNode.prev = prevNode
        }
      }

      currentNode = currentNode.next
    }
  }

  public toString(): string {
    let contentMsg: string = ''
    let current: LinkedListNode<E> | null = this.head

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
  private head: LinkedListNode<E> | null
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
    const newNode = new LinkedListNode<E>(e)

    if (!this.head) {
      this.head = newNode
      this.head.next = this.head
      this.size++
    } else {
      let current: LinkedListNode<E> = this.head
      while (current.next !== this.head) {
        current = current.next as LinkedListNode<E>
      }

      current.next = newNode
      newNode.next = this.head
      this.head = newNode
      this.size++
    }
  }

  public remove(): E | null {
    if (!this.head) return null

    let current: LinkedListNode<E> = this.head
    while (current.next !== this.head) {
      current = current.next as LinkedListNode<E>
    }

    const retNode: LinkedListNode<E> = this.head

    this.head = this.head.next
    current.next = this.head
    this.size--

    return retNode.e
  }

  public toString(): string {
    if (!this.head) return '-> ->'

    let contentMsg: string = ''
    let current: LinkedListNode<E> | null = this.head.next

    while (current && current !== this.head) {
      contentMsg += `${current.e} -> `
      current = current.next
    }

    return `-> ${this.head.e} -> ${contentMsg}`
  }
}
