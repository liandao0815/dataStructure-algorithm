import SortHelper from './SortHelper'
import bubbleSort from './bubbleSort'
import selectionSort from './selectionSort'
import insertionSort from './insertionSort'
import shellSort from './shellSort'
import mergeSort from './mergeSort'
import quickSort from './quickSort'

const N = 10000

console.log('\n排列随机生成的数组：\n')

let arr1 = SortHelper.generateRandomArray(N, 0, N)
let arr2 = SortHelper.shallowCopyArray(arr1)
let arr3 = SortHelper.shallowCopyArray(arr1)
let arr4 = SortHelper.shallowCopyArray(arr1)
let arr5 = SortHelper.shallowCopyArray(arr1)
let arr6 = SortHelper.shallowCopyArray(arr1)

SortHelper.printSortTime(bubbleSort, arr1)
SortHelper.printSortTime(selectionSort, arr2)
SortHelper.printSortTime(insertionSort, arr3)
SortHelper.printSortTime(shellSort, arr4)
SortHelper.printSortTime(mergeSort, arr5)
SortHelper.printSortTime(quickSort, arr6)

console.log('\n排列近乎有序的数组：\n')

arr1 = SortHelper.generateNearlyOrderedArray(N, 10)
arr2 = SortHelper.shallowCopyArray(arr1)
arr3 = SortHelper.shallowCopyArray(arr1)
arr4 = SortHelper.shallowCopyArray(arr1)
arr5 = SortHelper.shallowCopyArray(arr1)

SortHelper.printSortTime(bubbleSort, arr1)
SortHelper.printSortTime(selectionSort, arr2)
SortHelper.printSortTime(insertionSort, arr3)
SortHelper.printSortTime(shellSort, arr4)
SortHelper.printSortTime(mergeSort, arr5)
SortHelper.printSortTime(quickSort, arr6)

console.log('\n排列有大量重复数值的数组：\n')

arr1 = SortHelper.generateRandomArray(N, 0, 10)
arr2 = SortHelper.shallowCopyArray(arr1)
arr3 = SortHelper.shallowCopyArray(arr1)
arr4 = SortHelper.shallowCopyArray(arr1)
arr5 = SortHelper.shallowCopyArray(arr1)

SortHelper.printSortTime(bubbleSort, arr1)
SortHelper.printSortTime(selectionSort, arr2)
SortHelper.printSortTime(insertionSort, arr3)
SortHelper.printSortTime(shellSort, arr4)
SortHelper.printSortTime(mergeSort, arr5)
SortHelper.printSortTime(quickSort, arr6)
