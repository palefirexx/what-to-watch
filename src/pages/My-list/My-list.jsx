import { Catalog, Footer, Header } from '../../widgets'
import { useMyList } from '../../hooks'
import { Title, UserBlock } from '../../components'


const MyList = () => {
	const [myList, handleToggleMyList] = useMyList()
	
	return (
		<>
			<Header >
				<Title >My list</Title>
				<UserBlock />
			</Header>
			<Catalog
				title={'Catalog'}
				hiddenTitle
				myList={myList}
				handleToggleMyList={handleToggleMyList} />
			<Footer />
		</>
	)
}

export default MyList