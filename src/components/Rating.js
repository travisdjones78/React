import { useEffect, useState } from "react"
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

const Rating = ({
    rating,
    ratingChoice
}) => {
    const [starRating, setStarRating] = useState('')
    const finalRating = ratingChoice.filter((choice, idx) => idx + 1 === rating)

    useEffect(() => {
        setStarRating(rating)
    })

    const getStars = (rate) => {
        let stars = '';
        switch (rate) {
            case 1:
                stars = '32px'
                break;
            case 2:
                stars = '65px'
                break;
            case 3:
                stars = '97px'
                break;
            case 4:
                stars = '130px'
                break;
            case 5:
                stars = '162px'
                break;

            default:
                stars = '0px'
                break;
        }
        return stars
    }

    return (
        <>
            <img
                width={getStars(starRating)}
                className={style.stars}
            />
            <span className={style.difficulty}>
                ({finalRating})
            </span>
        </>
    )
}

Rating.propTypes = {
    ratingChoice: PropTypes.array,
    rating: PropTypes.number
}

export default Rating