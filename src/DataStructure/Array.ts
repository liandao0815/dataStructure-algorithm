/**
 * @description 重写数组数据结构
 */
export class _Array<E> {
  private data: E[]
  private size: number

  constructor(arg?: number | E[]) {
    if (!arg) {
      this.data = new Array<E>(10)
      this.size = 0
    } else if (typeof arg === 'number') {
      this.data = new Array<E>(arg)
      this.size = 0
    } else {
      this.data = new Array<E>(arg.length)
      arg.forEach((e: E, i: number) => (this.data[i] = e))
      this.size = arg.length
    }
  }

  // 改变数组容器大小
  private resize(newCapacity: number): void {
    const newData = new Array(newCapacity)

    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[i]
    }

    this.data = newData
  }

  public getSize(): number {
    return this.size
  }

  public getCapacity(): number {
    return this.data.length
  }

  public isEmpty(): boolean {
    return this.size === 0
  }

  public add(index: number, e: E): void {
    if (index < 0 || index > this.size) {
      throw new Error('Add failed. Required index >= 0 and index <= size')
    }

    if (this.size === this.data.length) {
      this.resize(2 * this.data.length)
    }

    for (let i = this.size - 1; i >= index; i--) {
      this.data[i + 1] = this.data[i]
    }

    this.data[index] = e
    this.size++
  }

  public addLast(e: E): void {
    this.add(this.size, e)
  }

  public addFirst(e: E): void {
    this.add(0, e)
  }

  public get(index: number): E {
    if (index < 0 || index >= this.size) {
      throw new Error('Get failed. Index is illegal.')
    }

    return this.data[index]
  }

  public getLast(): E {
    return this.get(this.size - 1)
  }

  public getFirst(): E {
    return this.get(0)
  }

  public set(index: number, e: E): void {
    if (index < 0 || index >= this.size) {
      throw new Error('Get failed. Index is illegal.')
    }

    this.data[index] = e
  }

  public contains(e: E): boolean {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === e) {
        return true
      }
    }

    return false
  }

  public remove(index: number): E {
    if (index < 0 || index >= this.size) {
      throw new Error('Remove failed. Index is illegal.')
    }

    const ret = this.data[index]

    for (let i = index + 1; i < this.size; i++) {
      this.data[i - 1] = this.data[i]
    }

    delete this.data[this.size--]

    if (this.size === Math.floor(this.data.length / 4) && Math.floor(this.data.length / 2) !== 0) {
      this.resize(Math.floor(this.data.length / 2))
    }

    return ret
  }

  public removeFirst(): E {
    return this.remove(0)
  }

  public removeLast(): E {
    return this.remove(this.size - 1)
  }

  public find(e: E): number {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === e) {
        return i
      }
    }

    return -1
  }

  public removeElement(e: E): void {
    const index = this.find(e)

    if (index !== -1) {
      this.remove(index)
    }
  }

  public swap(i: number, j: number): void {
    if (i < 0 || i >= this.size || j < 0 || j >= this.size) {
      throw new Error('Index is illegal.')
    }

    ;[this.data[i], this.data[j]] = [this.data[j], this.data[i]]
  }

  public toString(): string {
    let baseMsg: string = `Array: size: ${this.size}, capacity = ${this.data.length}\n`
    let contentMsg: string = ''

    for (let i = 0; i < this.size; i++) {
      contentMsg += this.data[i]

      if (i !== this.size - 1) {
        contentMsg += ', '
      }
    }

    return `${baseMsg}[${contentMsg}]`
  }
}
