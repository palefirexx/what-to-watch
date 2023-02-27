import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { genres } from '../../app/const'
import { useFetchAllFilmsQuery, useFetchFilmsFromIdListQuery } from '../../services/filmsAPI'
import { FilmCardSmall, GenresNav } from '../../components'
import { BtnBorder } from '../../ui'
import styles from './Catalog.module.css'


export const Catalog = memo(({ genre = 'All genres', size = 4, title = 'Catalog', hiddenTitle, genresNav, idPromoFilm, myList, handleToggleMyList, showMore }) => {
	const [activeGenre, setActiveGenre] = useState(genre)
	const [page, setPage] = useState(1)
	const [films, setFilms] = useState([])

	let paramsFetchAllFilms = useMemo(() => ({
		_limit: size,
		_page: page,
		id_ne: idPromoFilm,
		genre: activeGenre !== 'All genres' ? activeGenre : undefined,
	}), [page, activeGenre, size, idPromoFilm])

	let { list, totalCount } = myList
		? useFetchFilmsFromIdListQuery(myList?.join('&id='), {
			selectFromResult: ({ data }) => ({
				list: data?.response,
				totalCount: data?.totalCount,
			}),
		})
		: useFetchAllFilmsQuery(paramsFetchAllFilms, {
			selectFromResult: ({ data }) => ({
				list: data?.response,
				totalCount: data?.totalCount,
			}),
			skip: !paramsFetchAllFilms,
		})

	useEffect(() => {
		setFilms([])
		setPage(1)
	}, [activeGenre, idPromoFilm])

	useEffect(() => {
		myList
			? setFilms(list)
			: list && setFilms((prev) => [...prev, ...list])
	}, [list])

	const toNextPage = useCallback(() => setPage((prev) => ++prev), [])

	const deleteItem = useCallback((film) => {
		handleToggleMyList(film)
		setFilms((prev) => prev.filter((item) => item.id !== film.id))
	}, [])

	return (
		<section className={`${styles.catalog} ${!hiddenTitle && styles.catalogLikeThis}`}>
			{genresNav &&
				<GenresNav genres={genres} setActiveGenre={setActiveGenre} activeGenre={activeGenre} />
			}
			<h2 className={`${styles.title} ${hiddenTitle && 'visually-hidden'}`}>{title}</h2>

			<div className={styles.filmsList}>
				{!films?.length && <span className={styles.title} >The list is empty</span>}
				{films?.map((film) => <FilmCardSmall
					deleteBtn={!!myList}
					handleClick={() => deleteItem(film)}
					classNameProps={styles.filmsCard}
					id={film.id}
					title={film.title}
					key={film.id} />)}
			</div>
			{showMore && films.length < totalCount &&
				<BtnBorder title={'Show more'} handleClick={toNextPage} />
			}
		</section >
	)
})
