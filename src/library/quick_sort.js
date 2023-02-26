export const quickSort = (array) => {
    if (array.length <= 1) {
        return array 
    }
    const pivotIndex = Math.floor(array.length / 2)
    const pivot = array[pivotIndex]
    let left = []
    let right = []

    for (let i = 0; i < array.length; i++) {
        if (i === pivotIndex) {
            continue
        }
        array[i] < pivot
            ? left.push(array[i])
            : right.push(array[i])
    }

    return [...quickSort(left), pivot, ...quickSort(right)]
}