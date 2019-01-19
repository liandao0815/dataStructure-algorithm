import { insertionSortByRange } from './insertionSort'

/**
 * @description 归并排序
 * @param arr
 */
export default function mergeSort<T>(arr: T[]): T[] {
  _mergeSort(arr, 0, arr.length - 1)

  return arr
}

function _mergeSort<T>(arr: T[], l: number, r: number): void {
  if (r - l <= 15) {
    insertionSortByRange(arr, l, r)
    return
  }

  const mid = ((l + r) / 2) | 0

  _mergeSort(arr, l, mid)
  _mergeSort(arr, mid + 1, r)
  if (arr[mid] > arr[mid + 1]) {
    _merge(arr, l, mid, r)
  }
}

function _merge<T>(arr: T[], l: number, mid: number, r: number): void {
  const aux: T[] = new Array(r - l + 1)

  for (let i = l; i <= r; i++) {
    aux[i - l] = arr[i]
  }

  let i = l,
    j = mid + 1

  for (let k = l; k <= r; k++) {
    if (i > mid) {
      arr[k] = aux[j++]
    } else if (j > r) {
      arr[k] = aux[i++]
    } else if (aux[i] < aux[j]) {
      arr[k] = aux[i++]
    } else {
      arr[k] = aux[j++]
    }
  }
}

// 自底向上的归并排序
export const mergeSortBT = <T>(arr: T[]): T[] => {
  const len = arr.length

  for (let size = 1; size <= len; size += size) {
    for (let i = 0; i + size < len; i += 2 * size) {
      _merge(arr, i, i + size - 1, Math.min(i + 2 * size - 1, len - 1))
    }
  }

  return arr
}
