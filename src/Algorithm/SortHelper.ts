class SortHelper {
  // 生成一个随机整数，数据范围为[min, max]
  static getRandomIntInclusive(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // 交换数组索引的值
  static swapArrayIndex<T>(arr: T[], index1: number, index2: number): T[] {
    ;[arr[index1], arr[index2]] = [arr[index2], arr[index1]]
    return arr
  }

  // 生成一个含有 n 个元素的随机数组，每个元素的数据范围为[rangeL, rangeR]
  static generateRandomArray(n: number, rangeL: number = 0, rangeR: number = 100): number[] {
    if (rangeL > rangeR) {
      throw new Error('rangeL can not gt rangeR')
    }

    const array: number[] = []

    for (let i = 0; i < n; i++) {
      array[i] = SortHelper.getRandomIntInclusive(rangeL, rangeR)
    }
    return array
  }

  // 生成一个近乎有序的整型数组
  static generateNearlyOrderedArray(n: number, swapTimes: number = 10): number[] {
    const arr: number[] = []

    for (let i = 0; i < n; i++) {
      arr[i] = i
    }

    for (let i = 0; i < swapTimes; i++) {
      const posL = (Math.random() * n) | 0
      const posR = (Math.random() * n) | 0

      SortHelper.swapArrayIndex(arr, posL, posR)
    }

    return arr
  }

  // 根据不同的排序方法打印排序所需要的时间
  static printSortTime<T>(sortFn: Function, arr: T[]): void {
    const fnName = sortFn.name

    console.time(`\t\t${fnName} 排序所需要的时间`)
    sortFn(arr)
    console.timeEnd(`\t\t${fnName} 排序所需要的时间`)

    if (!SortHelper.hasCorrectSorted(arr)) {
      console.warn(`\t\t${fnName} 排列不正确`)
    }
  }

  // 判断数组是否已经排序成功
  static hasCorrectSorted<T>(arr: T[]): boolean {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        return false
      }
    }
    return true
  }

  // 浅拷贝一个相同的数组
  static shallowCopyArray<T>(arr: T[]): T[] {
    return [...arr]
  }
}

export default SortHelper
