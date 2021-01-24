import React, { useState } from 'react'

import FooterMenu from './components/FooterMenu'
import WorkoutThumbnail from './components/WorkoutThumbnail'
import Search from './components/Search'

function App() {
  const [workout, setWorkout] = useState({
    id: 1,
    name: 'Upper Body',
    pro: true,
    level: 'Beginner',
    cardio: 2,
    muscle: 1,
    img: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  })

  const handleMenuClick = (action) => {
    return () => {
      console.log(action, 'clicked')
    }
  }

  const handleWorkoutThumbnailClick = (workout_id) => {
    return () => {
      console.log('clicked', workout_id)
    }
  }

  const handleSearchChange = (action) => {
    return null
  }

  return (
    <div className="content">
      <Search handleChange={handleSearchChange}/>
      <WorkoutThumbnail workout={workout} handleClick={handleWorkoutThumbnailClick}/>

      <FooterMenu handleClick={handleMenuClick}/>
    </div>
  )
}

export default App;
