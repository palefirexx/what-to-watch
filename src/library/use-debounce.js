// import { useCallback, useRef } from 'react'


// export const useDebounce = (callback, delay) => {
//     const timer = useRef(null)

//     const debouncedCallback = useCallback((...args) => {
//         if (timer.current) {
//             clearTimeout(timer.current)
//         }

//         timer.current = setTimeout(() => {
//             callback(...args)
//         }, delay)
//     }, [callback, delay])

//     return debouncedCallback
// }



import { useEffect, useState } from "react"


export const useDebounce = (value, delay) => {
    const [debValue, setDebValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])
}