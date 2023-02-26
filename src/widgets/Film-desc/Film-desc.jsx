import { memo, useState } from 'react'
import { filmNavLinks } from '../../app/const'
import { getRatingLevel } from '../../app/utils'
import { useFetchReviewsQuery } from '../../services/filmsAPI'
import { Details, FilmNav, Overview, Rating, Reviews, Poster } from '../../components'
import styles from './Film-desc.module.css'


export const FilmDesc = memo(({ film }) => {
    const [activeNavItem, setActiveNavItem] = useState(filmNavLinks[0])
    const { data: reviews } = useFetchReviewsQuery(film.id)

    return (
        <div className={`${styles.wrap} ${styles.translateTop}`}>
            <div className={styles.info}>
                <Poster title={film.title} imgHref={film.titleHref} posterBig />
                <div className={styles.desc}>
                    <FilmNav
                        navList={filmNavLinks}
                        activeNavItem={activeNavItem}
                        setActiveNavItem={setActiveNavItem}
                    />
                    <div className={`${styles.text}`}>
                        {activeNavItem === 'Overview' && film.rating &&
                            <>
                                <Rating
                                    score={film.rating.score}
                                    count={film.rating.count}
                                    level={getRatingLevel(film.rating.score)}
                                />
                                <Overview film={film} />
                            </>
                        }
                        {activeNavItem === 'Details' &&
                            <div className={styles.row}>
                                <Details film={film} />
                            </div>
                        }
                        {activeNavItem === 'Reviews' &&
                            <div className={styles.row}>
                                {reviews &&
                                    <Reviews reviews={reviews} />
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
})
