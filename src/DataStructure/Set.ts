import { BST } from './BinarySearchTree'
import { LinkedList } from './LinkedList'

/**
 * @description 集合的方法接口
 */
interface _Set<E> {
  add(e: E): void
  remove(e: E): void
  contains(e: E): boolean
  getSize(): number
  isEmpty(): boolean
}

/**
 * @description 基于二分搜索树的集合
 */
export class BSTSet<E> implements _Set<E> {
  private bst: BST<E> = new BST<E>()

  public getSize(): number {
    return this.bst.getSize()
  }

  public isEmpty(): boolean {
    return this.bst.isEmpty()
  }

  public add(e: E): void {
    this.bst.insert(e)
  }

  public contains(e: E): boolean {
    return this.bst.contains(e)
  }

  public remove(e: E): void {
    this.bst.remove(e)
  }
}

/**
 * @description 基于链表的集合
 */
export class LinkedListSet<E> implements _Set<E> {
  private list: LinkedList<E> = new LinkedList<E>()

  public getSize(): number {
    return this.list.getSize()
  }

  public isEmpty(): boolean {
    return this.list.isEmpty()
  }

  public contains(e: E): boolean {
    return this.list.contains(e)
  }

  public add(e: E): void {
    if (!this.list.contains(e)) this.list.addFirst(e)
  }

  public remove(e: E): void {
    this.list.removeElement(e)
  }
}
