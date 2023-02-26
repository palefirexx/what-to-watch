import { useCallback } from "react"
import { useSelector } from "react-redux"
import { useAddMyListItemMutation, useDeleteMyListItemMutation, useFetchUserQuery } from "../services/filmsAPI"


export const useMyList = () => {
    const {myList, id} = useSelector((state) => state.user)
    const {data: user} = useFetchUserQuery(id, {
        skip: !id,
    })
    
    const [addMyListItem] = useAddMyListItemMutation()
    const [deleteMyListItem] = useDeleteMyListItemMutation()
    
    const handleClick = useCallback((film) => {
        if (!id) return

        const isInList = myList?.includes(film.id)

        const newList = isInList
            ? myList.filter((item) => item !== film.id)
            : [...myList, film.id]

        const updatedUser = { ...user, myList: newList }
        
        isInList
            ? deleteMyListItem({id, body: updatedUser})
            : addMyListItem({id, body: updatedUser})
    }, [id, myList])

    return id ? [myList, handleClick] : [null, null]
}

// import { useSelector } from "react-redux"
// import { useAddMyListItemMutation, useDeleteMyListItemMutation, useFetchUserQuery } from "../services/filmsAPI"


// export const useMyList = (isAuthUser) => {
//     console.log('useMyList')
//     const {myList, id} = useSelector((state) => state.user)
//     const {data: user} = useFetchUserQuery(id)
    
//     const [addMyListItem] = useAddMyListItemMutation()
//     const [deleteMyListItem] = useDeleteMyListItemMutation()
    
//     const handleClick = (film) => {
//         myList?.includes(film.id)
//             ? deleteMyListItem({id, body: {
//                 ...user,
//                 myList: myList.filter((item) => item !== film.id)
//             }})
//             : addMyListItem({id, body: {
//                 ...user,
//                 myList: [...myList, film.id]
//             }})
//     }

//     return isAuthUser ? [myList, handleClick] : [[], undefined]
// }
