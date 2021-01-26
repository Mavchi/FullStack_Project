import React, { useState } from 'react'
import {  } from 'react-materialize';

import FooterMenu from '../components/FooterMenu'
import Search from '../components/Search'
import WorkoutThumbnail from '../components/WorkoutThumbnail'

const WorkoutPage = ({}) => {
    return (
        <Search handleChange={handleSearchChange}/>
        {workoutDescs.map(workout => <WorkoutThumbnail key={workout.name + workout.id.toString()} workout={workout} handleClick={handleWorkoutThumbnailClick}/>)}
        
        <FooterMenu handleClick={handleMenuClick}/>
    )
}