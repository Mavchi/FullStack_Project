import React from 'react'

import './WorkoutThumbnail.css'

import likedIcon from '../img/icons/heart-icon-liked.svg'
import notLikedIcon from '../img/icons/heart-icon-notliked.svg'

const WorkoutThumbnail = ({workout, handleClick}) => {
    return (
        <div className='workout-thumbnail' style={{ backgroundImage: `url(${workout.img})`, backgroundSize: 'contain'}}>
            <div className="workout-thumbnail-box">
                {workout.pro && ( <div className="pro">Pro</div>)}
                <div className='level'>{workout.level}</div>
                {true 
                    ? <div className='like'><img src={likedIcon} weight='24px' height ='24px' alt='liked'/></div>
                    : <div className='like'><img src={notLikedIcon} weight='24px' height ='24px' alt='not liked'/></div>
                }
            </div>
        </div>
    )
}

export default WorkoutThumbnail