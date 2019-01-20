import { _Array } from './Array'
import { LinkedListNode } from './LinkedList'

/**
 * @description 队列的接口方法
 */
interface Queue<E> {
  getSize(): number
  isEmpty(): boolean
  enqueue(e: E): void
  dequeue(): E
  getFront(): E
}

/**
 * @description 使用数组来实现队列
 */
export class ArrayQueue<E> implements Queue<E> {
  private array: _Array<E>

  constructor(capacity?: number) {
    this.array = new _Array<E>(capacity)
  }

  public getSize(): number {
    return this.array.getSize()
  }

  public isEmpty(): boolean {
    return this.array.isEmpty()
  }

  public getCapacity(): number {
    return this.array.getCapacity()
  }

  public enqueue(e: E): void {
    this.array.addLast(e)
  }

  public dequeue(): E {
    return this.array.removeFirst()
  }

  public getFront(): E {
    return this.array.getFirst()
  }

  public toString(): string {
    let contentMsg: string = ''

    for (let i = 0; i < this.array.getSize(); i++) {
      contentMsg += this.array.get(i)

      if (i !== this.getSize() - 1) {
        contentMsg += ', '
      }
    }

    return `Queue: front [${contentMsg}] tail`
  }
}

/**
 * @description 循环队列
 */
export class LoopQueue<E> implements Queue<E> {
  private data: E[]
  private front: number
  private tail: number
  private size: number

  constructor(capacity: number = 10) {
    this.data = new Array<E>(capacity + 1)
    this.front = 0
    this.tail = 0
    this.size = 0
  }

  private resize(capacity: number): void {
    const newData = new Array<E>(capacity + 1)

    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[(i + this.front) % this.data.length]
    }

    this.data = newData
    this.front = 0
    this.tail = this.size
  }

  public getCapacity(): number {
    return this.data.length - 1
  }

  public isEmpty(): boolean {
    return this.front === this.tail
  }

  public getSize(): number {
    return this.size
  }

  public enqueue(e: E) {
    if ((this.tail + 1) % this.data.length === this.front) {
      this.resize(this.getCapacity() * 2)
    }

    this.data[this.tail] = e
    this.tail = (this.tail + 1) % this.data.length
    this.size++
  }

  public dequeue(): E {
    if (this.isEmpty()) {
      throw new Error('Cannot dequeue from an empty queue.')
    }

    const ret: E = this.data[this.front]

    delete this.data[this.front]
    this.front = (this.front + 1) % this.data.length
    this.size--

    if (this.size === Math.floor(this.getCapacity() / 4) && Math.floor(this.getCapacity() / 2) !== 0) {
      this.resize(Math.floor(this.getCapacity() / 2))
    }

    return ret
  }

  public getFront(): E {
    if (this.isEmpty()) {
      throw new Error('Queue is empty.')
    }

    return this.data[this.front]
  }

  public toString(): string {
    let baseMsg: string = `Queue: size: ${this.size}, capacity = ${this.getCapacity()}\n`
    let contentMsg: string = ''

    for (let i = this.front; i !== this.tail; i = (i + 1) % this.data.length) {
      contentMsg += this.data[i]

      if ((i + 1) % this.data.length !== this.tail) {
        contentMsg += ', '
      }
    }

    return `${baseMsg}front [${contentMsg}] tail`
  }
}

/**
 * @description 使用链表来实现队列
 */
class LinkedListQueue<E> implements Queue<E> {
  private head: LinkedListNode<E> | null
  private tail: LinkedListNode<E> | null
  private size: number

  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  public getSize(): number {
    return this.size
  }

  public isEmpty(): boolean {
    return this.size === 0
  }

  public enqueue(e: E): void {
    if (this.tail === null) {
      this.tail = new LinkedListNode<E>(e, null)
      this.head = this.tail
    } else {
      this.tail.next = new LinkedListNode<E>(e, null)
      this.tail = this.tail.next
    }

    this.size++
  }

  public dequeue(): E {
    if (this.isEmpty()) {
      throw new Error('Cannot dequeue from an empty queue.')
    }

    const retNode: LinkedListNode<E> = <LinkedListNode<E>>this.head

    this.head = (<LinkedListNode<E>>this.head).next
    retNode.next = null

    if (this.head === null) this.tail = null
    this.size--

    return retNode.e as E
  }

  public getFront(): E {
    if (this.isEmpty()) {
      throw new Error('Queue is empty.')
    }

    return (<LinkedListNode<E>>this.head).e as E
  }

  public toString(): string {
    let contentMsg = ''
    let cur = this.head

    while (cur !== null) {
      contentMsg += `${cur.e} -> `
      cur = cur.next
    }

    return `Queue: front ${contentMsg} NULL tail`
  }
}

// 测试三种普通队列性能
function test() {
  function generateQueue<T extends Queue<number>>(queue: T, len: number): T {
    for (let i = 0; i < len; i++) {
      queue.enqueue(Math.floor(100000 * Math.random()))
    }

    return queue
  }

  function printDequeueTime<T extends Queue<number>>(queue: T, name?: string): void {
    console.time(`${name} dequeue 耗时`)
    for (let i = 0; i < len; i++) {
      queue.dequeue()
    }
    console.timeEnd(`${name} dequeue 耗时`)
  }

  const len = 100000

  const queue1 = generateQueue(new ArrayQueue<number>(), len)
  const queue2 = generateQueue(new LoopQueue<number>(), len)
  const queue3 = generateQueue(new LinkedListQueue<number>(), len)

  printDequeueTime(queue1, 'ArrayQueue')
  printDequeueTime(queue2, 'LoopQueue')
  printDequeueTime(queue3, 'LinkedListQueue')
}
