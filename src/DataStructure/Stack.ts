import { _Array } from './Array'
import { LinkedList } from './LinkedList'

/**
 * @description 栈的方法接口
 */
interface Stack<E> {
  getSize(): number
  isEmpty(): boolean
  push(e: E): void
  pop(): E
  peek(): E
}

/**
 * @description 使用数组来实现栈
 */
export class ArrayStack<E> implements Stack<E> {
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

  public push(e: E): void {
    this.array.addLast(e)
  }

  public pop(): E {
    return this.array.removeLast()
  }

  public peek(): E {
    return this.array.getLast()
  }

  public toString(): string {
    let contentMsg: string = ''

    for (let i = 0; i < this.array.getSize(); i++) {
      contentMsg += this.array.get(i)

      if (i !== this.getSize() - 1) {
        contentMsg += ', '
      }
    }

    return `Stack: [${contentMsg}] top`
  }
}

/**
 * @description 使用链表来实现栈
 */
export class LinkedListStack<E> implements Stack<E> {
  private list: LinkedList<E>

  constructor() {
    this.list = new LinkedList<E>()
  }

  public getSize(): number {
    return this.list.getSize()
  }

  public isEmpty(): boolean {
    return this.list.isEmpty()
  }

  public push(e: E): void {
    this.list.addFirst(e)
  }

  public pop(): E {
    return this.list.removeFirst()
  }

  public peek(): E {
    return this.list.getFirst()
  }

  public toString(): string {
    return `Stack: top ${this.list.toString()}`
  }
}

// 测试两种队列性能
function test() {
  function generateStack<T extends Stack<number>>(stack: T, len: number): T {
    for (let i = 0; i < len; i++) {
      stack.push(Math.floor(100000 * Math.random()))
    }

    return stack
  }

  function printPopTime<T extends Stack<number>>(stack: T, name?: string): void {
    console.time(`${name} pop 耗时`)
    for (let i = 0; i < len; i++) {
      stack.pop()
    }
    console.timeEnd(`${name} pop 耗时`)
  }

  const len = 100000

  const stack1 = generateStack(new ArrayStack<number>(), len)
  const stack2 = generateStack(new LinkedListStack<number>(), len)

  printPopTime(stack1, 'ArrayStack')
  printPopTime(stack2, 'LinkedListStack')
}
