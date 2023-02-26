import { createSlice } from '@reduxjs/toolkit'
import { authorizationStatus } from '../../app/const'


const initialState = {
    isLoading: false,
    error: '',
    activeFilmId: '',
    films: [],
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setFilms: (state, action) => {
            state.films = action.payload
        },
        setActiveFilmId: (state, action) => {
            state.activeFilmId = action.payload
        },
    }
})

// export const redirectToRoute = (url) => ({
//     type: 'app/redirectToRoute',
//     payload: url
// })

export const {
    setIsLoading,
    setFilms,
    setError,
    setActiveFilmId,
} = appSlice.actions

export default appSlice.reducer