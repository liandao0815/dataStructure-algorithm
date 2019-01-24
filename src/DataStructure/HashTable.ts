import { LinkedList } from './LinkedList'

const capacity = [
  53,
  97,
  193,
  389,
  769,
  1543,
  3079,
  6151,
  12289,
  24593,
  49157,
  98317,
  196613,
  393241,
  786433,
  157289,
  3145739,
  6291469,
  12582917,
  25165843,
  50331653,
  100663319,
  201326611,
  402563189,
  805306457,
  1610612741
]

/**
 * @description 哈希表
 */
export class HashTable {
  private static upperTol = 10
  private static lowerTol = 2

  private capacityIndex: number = 0
  private size: number = 0
  private hashTable: LinkedList<string>[]

  constructor() {
    this.hashTable = new Array(capacity[this.capacityIndex]).fill(new LinkedList<string>())
  }

  private hashCode(key: string): number {
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0),
      0
    )

    return hash % this.hashTable.length
  }

  private resize(newCapacity: number): void {
    const oldHashTable = this.hashTable
    const newHashTable: LinkedList<string>[] = new Array(newCapacity).fill(new LinkedList<string>())

    this.hashTable = newHashTable

    for (let i = 0; i < oldHashTable.length; i++) {
      const linkedList = oldHashTable[i]

      while (!linkedList.isEmpty()) {
        const value = linkedList.removeFirst()
        newHashTable[this.hashCode(value)].addLast(value)
      }
    }
  }

  public getSize(): number {
    return this.size
  }

  public isEmpty(): boolean {
    return this.size === 0
  }

  public add(value: string): void {
    const hashCode = this.hashCode(value)
    const LinkedList = this.hashTable[hashCode]

    if (!LinkedList.contains(value)) {
      LinkedList.addLast(value)
      this.size++

      if (
        this.size >= HashTable.upperTol * capacity[this.capacityIndex] &&
        this.capacityIndex + 1 < capacity.length
      ) {
        this.capacityIndex++
        this.resize(capacity[this.capacityIndex])
      }
    }
  }

  public remove(value: string): void {
    const hashCode = this.hashCode(value)
    const LinkedList = this.hashTable[hashCode]

    if (LinkedList.contains(value)) {
      LinkedList.removeElement(value)
      this.size--
      if (this.size < HashTable.lowerTol * capacity[this.capacityIndex] && this.capacityIndex - 1 >= 0) {
        this.capacityIndex--
        this.resize(capacity[this.capacityIndex])
      }
    }
  }

  public contains(value: string): boolean {
    const hashCode = this.hashCode(value)
    const LinkedList = this.hashTable[hashCode]

    return LinkedList.contains(value)
  }
}

