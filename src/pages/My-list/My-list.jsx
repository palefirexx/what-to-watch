import { useSelector } from 'react-redux'
import { Catalog, Footer, Header } from '../../widgets'
import { useMyList } from '../../hooks'
import { Title, UserBlock } from '../../components'


const MyList = () => {
	const { email } = useSelector((state) => state.user)
	const [myList, handleToggleMyList] = useMyList(!!email)

	return (
		<>
			<Header >
				<Title >My list</Title>
				<UserBlock />
			</Header>
			<Catalog title={'Catalog'} hiddenTitle myList={myList} handleToggleMyList={handleToggleMyList} />
			<Footer />
		</>
	)
}

export default MyList