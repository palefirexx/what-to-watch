import { createSlice } from '@reduxjs/toolkit'
import { authorizationStatus } from '../../app/const'


const initialState = {
    authStatus: authorizationStatus.UNKNOWN,
    email: '',
    token: '',
    id: '',
    name: '',
    myList: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.authStatus = action.payload.authStatus
            state.email = action.payload.email
            state.token = action.payload.token
            state.id = action.payload.id
            state.name = action.payload.name
        },
        removeUser: (state) => {
            state.authStatus = authorizationStatus.NO_AUTH
            state.email = ''
            state.token = ''
            state.id = ''
            state.name = ''
            state.myList = []
        },
        setAuthStatus: (state, action) => {
            state.authStatus = action.payload
        },
        setMyList: (state, action) => {
            state.myList = action.payload
        },
    }
})

export const {
    setUser,
    removeUser,
    setAuthStatus,
    setMyList,
} = userSlice.actions

export default userSlice.reducer