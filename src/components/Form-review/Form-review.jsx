import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAddReviewMutation } from '../../services/filmsAPI'
import styles from './Form-review.module.css'


export const FormReview = () => {
    const { id } = useParams()
    const { name } = useSelector((state) => state.user)

    const [reviewRating, setReviewRating] = useState(null)
    const [reviewText, setReviewText] = useState('')

    const [addReview] = useAddReviewMutation()

    const starList = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

    const handleSubmit = (evt) => {
        evt.preventDefault()

        const newDate = new Date()

        addReview({
            filmId: id,
            rating: reviewRating,
            text: reviewText,
            author: name,
            datetime: newDate.toISOString().slice(0, 10),
            date: newDate.toLocaleString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
        })
        setReviewRating(null)
        setReviewText('')
    }

    const handleChangeText = (evt) => {
        setReviewText(evt.target.value)
    }

    return (
        <div className={styles.review}>
            <form onSubmit={handleSubmit}>
                <div className={styles.stars}>
                    {starList.map((star) =>
                        <span key={star}>
                            <input
                                className={styles.input}
                                id={`star-${star}`}
                                type='radio'
                                name='rating'
                                onChange={() => setReviewRating(star + '')}
                                value={star} />
                            <label
                                className={`${styles.label} ${star <= reviewRating && styles.check}`}
                                htmlFor={`star-${star}`}
                            >Rating {star}</label>
                        </span>
                    )}
                </div>

                <div className={styles.text}>
                    <textarea value={reviewText} onChange={handleChangeText} className={styles.textarea} name='review-text' id='review-text' placeholder='Review text'></textarea>
                    <div className={styles.submit}>
                        <button className={styles.btn} type='submit'>Post</button>
                    </div>

                </div>
            </form>
        </div>
    )
}