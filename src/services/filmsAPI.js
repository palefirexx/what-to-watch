import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

// const BACKEND_URL = 'https://firestore.googleapis.com/v1/projects/what-to-watch-e80a0/databases/(default)/documents/films/'
const BACKEND_URL = 'http://localhost:8080/'
const REQUEST_TIMEOUR = 5000


export const filmsAPI = createApi({
    reducerPath: 'filmsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: BACKEND_URL,
        timeout: REQUEST_TIMEOUR,
    }),
    tagTypes: ['Films'],
    endpoints: (build) => ({

        fetchAllFilms: build.query({
            query: (params) => ({
                url: 'films',
                // url: 'films/films',
                params,
            }),
            transformResponse(response, meta) {
                return { response, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: () => ['Films'],
        }),
        fetchFilsFromId: build.query({
            query: (id) => ({
                url: `films?_limit=1&id=${id}`,
            }),
            providesTags: () => ['Films'],
        }),
        fetchReviews: build.query({
            query: (id) => ({
                url: `reviews?filmId=${id}`,
                // url: `reviews/reviews?filmId=${id}`,
            }),
            providesTags: () => ['Films'],
        }),
        fetchFilmsFromIdList: build.query({
            query: (idList) => ({
                url: `films?id=${idList}`,
                // url: `films/films?id=${idList}`,
            }),
            transformResponse(response, meta) {
                return { response, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: () => ['Films'],
        }),
        fetchPromoFilm: build.query({
            query: () => ({
                url: 'promo',
                // url: 'films/promo',
            }),
            providesTags: () => ['Films'],
        }),
        fetchUser: build.query({
            query: (id) => ({
                url: `users/${id}`
                // url: `films/users/${id}`
            }),
            providesTags: () => ['Films'],
        }),
        deleteMyListItem: build.mutation({
            query: ({id, body}) => ({
                url: `users/${id}`,
                // url: `films/users/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Films'],
        }),
        addMyListItem: build.mutation({
            query: ({id, body}) => ({
                url: `users/${id}`,
                // url: `films/users/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Films'],
        }),
        addReview: build.mutation({
            query: (body) => ({
                url: `reviews`,
                // url: `reviews/reviews`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Films'],
        }),
        addUser: build.mutation({
            query: (body) => ({
                url: `users`,
                // url: `films/users`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Films'],
        })
    })
})

export const {
    useFetchFilsFromIdQuery,
    useFetchUserQuery,
    useLazyFetchUserQuery,
    useAddUserMutation,
    useFetchReviewsQuery,
    useFetchAllFilmsQuery,
    useFetchPromoFilmQuery,
    useAddMyListItemMutation,
    useDeleteMyListItemMutation,
    useFetchFilmsFromIdListQuery,
    useAddReviewMutation,
} = filmsAPI
