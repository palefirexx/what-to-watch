export const binarySearch = (array, item) => {
    let start = 0
    let end = array.length
    let middle
    let found = false
    let position = -1

    while (start <= end && !found) {
        middle = Math.floor((start + end) / 2)
        if (array[middle] === item) {
            found = true
            position = middle
            return position
        }
        item < array[middle]
            ? end = middle - 1
            : start = middle + 1
    }
    return position
}