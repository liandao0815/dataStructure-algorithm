import SortHelper from './SortHelper'
import { insertionSortByRange } from './insertionSort'

/**
 * @description 快速排序
 * @param arr
 */
export default function quickSort<T>(arr: T[]): T[] {
  _quickSort(arr, 0, arr.length - 1)

  return arr
}

function _quickSort<T>(arr: T[], l: number, r: number): void {
  if (r - l <= 15) {
    insertionSortByRange(arr, l, r)
    return
  }

  const p: number = _partition2(arr, l, r)
  _quickSort(arr, l, p - 1)
  _quickSort(arr, p + 1, r)

  // const p: number[] = _partition3(arr, l, r)
  // _quickSort(arr, l, p[0] - 1)
  // _quickSort(arr, p[1], r)
}

// 第一版本 partition 原始版本
function _partition1<T>(arr: T[], l: number, r: number): number {
  SortHelper.swapArrayIndex(arr, l, SortHelper.getRandomIntInclusive(l, r))

  const v: T = arr[l]
  let j: number = l + 1

  for (let i = l; i <= r; i++) {
    if (arr[i] < v) {
      SortHelper.swapArrayIndex(arr, j++, i)
    }
  }

  SortHelper.swapArrayIndex(arr, l, j - 1)

  return j - 1
}

// 第二版本 partition 双路快排
function _partition2<T>(arr: T[], l: number, r: number): number {
  SortHelper.swapArrayIndex(arr, l, SortHelper.getRandomIntInclusive(l, r))

  const v: T = arr[l]
  let i: number = l + 1,
    j: number = r

  while (true) {
    while (i <= r && arr[i] < v) i++
    while (j >= l + 1 && arr[j] > v) j--

    if (i > j) break

    SortHelper.swapArrayIndex(arr, i++, j--)
  }

  SortHelper.swapArrayIndex(arr, l, j)

  return j
}

// 第三版本 partition 三路快排
function _partition3<T>(arr: T[], l: number, r: number): number[] {
  SortHelper.swapArrayIndex(arr, l, SortHelper.getRandomIntInclusive(l, r))

  const v: T = arr[l]
  let lt: number = l,
    gt: number = r + 1,
    i = l + 1

  while (i < gt) {
    if (arr[i] < v) {
      SortHelper.swapArrayIndex(arr, i++, ++lt)
    } else if (arr[i] > v) {
      SortHelper.swapArrayIndex(arr, i, --gt)
    } else {
      i++
    }
  }

  SortHelper.swapArrayIndex(arr, l, lt)

  return [lt, gt]
}
