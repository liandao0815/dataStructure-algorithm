import { MinHeap } from './Heap'

/**
 * @description 优先队列的接口方法
 */
interface ProirityQueue<E> {
  getSize(): number
  isEmpty(): boolean
  enqueue(e: E): void
  dequeue(): E
  getFront(): E
}

/**
 * @description 基于堆的优先队列
 */
export class PriorityQueue<E> extends MinHeap<E> implements ProirityQueue<E> {
  constructor(comparator: (e1: E, e2: E) => number) {
    super(comparator)
  }

  public getSize(): number {
    return super.size()
  }

  public isEmpty(): boolean {
    return super.isEmpty()
  }

  public getFront(): E {
    return super.findMin()
  }

  public enqueue(e: E): void {
    super.add(e)
  }

  public dequeue(): E {
    return super.extractMin()
  }
}
