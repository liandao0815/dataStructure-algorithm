import SortHelper from './SortHelper'

/**
 * @description 冒泡排序
 * @param arr
 */
export default function bubbleSort<T>(arr: T[]): T[] {
  let newIndex: number
  let len = arr.length

  do {
    newIndex = 0
    for (let i = 1; i < len; i++) {
      if (arr[i - 1] > arr[i]) {
        SortHelper.swapArrayIndex(arr, i - 1, i)
        newIndex = i
      }
    }

    len = newIndex
  } while (newIndex)

  return arr
}
