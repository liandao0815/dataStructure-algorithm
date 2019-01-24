/**
 * @description 插入排序
 * @param arr
 */
export default function insertionSort<T>(arr: T[]): T[] {
  for (let i = 1; i < arr.length; i++) {
    const e: T = arr[i]
    let j: number

    for (j = i; j > 0 && arr[j - 1] > e; j--) {
      arr[j] = arr[j - 1]
    }
    arr[j] = e
  }
  return arr
}

export const insertionSortByRange = <T>(arr: T[], l: number, r: number): T[] => {
  for (let i = l + 1; i <= r; i++) {
    const e: T = arr[i]
    let j: number

    for (j = i; j > l && arr[j - 1] > e; j--) {
      arr[j] = arr[j - 1]
    }

    arr[j] = e
  }
  return arr
}
