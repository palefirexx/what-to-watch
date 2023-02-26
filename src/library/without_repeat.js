export const withoutRepeat = (list) => {
    let map = {}

    list.forEach((cur) => {
        map[cur] 
            ? map[cur] += 1
            : map[cur] = 1
    })

    return Object.keys(map).filter((item) => (
        map[item] === 1
    ))
}