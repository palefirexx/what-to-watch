import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getHrefFromTitle } from '../app/utils'
import { useFetchFilsFromIdQuery, useFetchPromoFilmQuery } from '../services/filmsAPI'


export const usePromoFilm = () => {
    const { id: paramsFilmId } = useParams()

    const selectPromoId = ({ data, isSuccess }) => ({
        promoId: data?.[0],
        isSuccessPromoId: isSuccess,
    })

    const selectPromoFilm = ({ data }) => ({
        promoFilm: data?.[0]
    })

    const { promoId, isSuccessPromoId } = useFetchPromoFilmQuery(undefined, {
        selectFromResult: selectPromoId,
        skip: paramsFilmId,
    })

    const { promoFilm } = useFetchFilsFromIdQuery(promoId || paramsFilmId, {
        selectFromResult: selectPromoFilm,
        skip: !isSuccessPromoId && !paramsFilmId,
    })

    const memoizedFilm = useMemo(() => ({
        ...promoFilm,
        titleHref: getHrefFromTitle(promoFilm?.title)
    }), [promoFilm?.title])

    return [promoId || paramsFilmId, memoizedFilm]
}
