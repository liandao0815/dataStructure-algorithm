/**
 * 计数排序
 * @param arr
 */
export default function countingSort(arr: number[]): number[] {
  let maxIndex: number = 0

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[maxIndex]) {
      maxIndex = i
    }
  }

  const maxValue: number = arr[maxIndex]
  const bucket: number[] = new Array(maxValue + 1).fill(0)

  let sortedIndex = 0

  for (let i = 0; i < arr.length; i++) bucket[arr[i]]++

  for (let i = 0; i < bucket.length; i++) {
    while (bucket[i] > 0) {
      arr[sortedIndex++] = i
      bucket[i]--
    }
  }

  return arr
}
