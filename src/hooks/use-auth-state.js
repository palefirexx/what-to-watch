import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { authorizationStatus } from '../app/const'
// import { useLocalStorage } from './use-local-storage'
import { setMyList, setUser } from '../store/slices/user-slice'
import { auth } from '../firebase'
import { useLazyFetchUserQuery } from '../services/filmsAPI'


export const useAuthState = () => {
    const dispatch = useDispatch()

    const { id, authStatus } = useSelector((state) => state.user)
    // const authInfo = useSelector((state) => state.user)
    // const [userStorage, setUserStorage] = useLocalStorage('user', authInfo)

    const [fetchUserTrigger, { data: userInfo }] = useLazyFetchUserQuery()

    const getUserInfo = useCallback(async (user) => {
        user && await fetchUserTrigger(user.uid)

        const newAuthUserInfo = {
            authStatus: user !== null ? authorizationStatus.AUTH : authorizationStatus.NO_AUTH,
            email: user?.email || '',
            token: user?.accessToken || '',
            id: user?.uid || '',
            name: user?.displayName || user?.email || '',
        }

        dispatch(setUser(newAuthUserInfo))
        // setUserStorage(newAuthUserInfo)
    }, [])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            getUserInfo(user)
        })

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        const { myList } = userInfo || {}
        myList && dispatch(setMyList(myList))
    }, [userInfo])

    return { userId: id, isLoading: authStatus === authorizationStatus.UNKNOWN }
}
