import SortHelper from './SortHelper'

/**
 * @description 选择排序
 * @param arr
 */
export default function selectionSort<T>(arr: T[]): T[] {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex: number = i

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    SortHelper.swapArrayIndex(arr, minIndex, i)
  }

  return arr
}
