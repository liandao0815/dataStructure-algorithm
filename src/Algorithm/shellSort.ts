/**
 * @description 希尔排序
 * @param arr
 */
export default function shellSort<T>(arr: T[]): T[] {
  const n = arr.length
  let h: number = 1

  while (h < n / 3) {
    h = 3 * h + 1
  }

  while (h >= 1) {
    for (let i = h; i < n; i++) {
      const e: T = arr[i]
      let j: number

      // 使用插入排序
      for (j = i; j >= h && e < arr[j - h]; j -= h) {
        arr[j] = arr[j - h]
      }

      arr[j] = e
    }

    h = (h / 3) | 0
  }

  return arr
}
