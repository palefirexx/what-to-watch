import {
	CardHeader,
	CardInfo,
	Catalog,
	FilmCard,
	Footer,
	Content,
	Header,
} from '../../widgets'
import { usePromoFilm } from '../../hooks'
import { UserBlock } from '../../components'
import { routes } from '../../app/const'


const Main = () => {
	const [promoId, film] = usePromoFilm()

	return film && (
		<>
			<FilmCard >
				<CardHeader
					title={film.title}
					imgHref={film.titleHref} >
					<Header >
						<UserBlock />
					</Header>
					<CardInfo film={film} />
				</CardHeader>
			</FilmCard>
			<Content>
				<Catalog
					showMore
					size={8}
					title={'Catalog'}
					hiddenTitle
					genresNav
					idPromoFilm={promoId} />
				<Footer />
			</Content>
		</>
	)
}

export default Main
