export const chackBrackets = (str) => {
    const map = {
        '(': ')',
        '{': '}',
        '[': ']',
    }

    let stack = [];

    for (let char of str) {
        if (map[char]) {
            stack.push(char)
        } else {
            if (!Object.values(map).includes(char)) {
                continue
            }
            let lastStack = stack.pop()
            if (map[lastStack] !== char) {
                return false
            }
        }
    }

    return !stack.length
}