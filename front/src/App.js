import React, { useEffect, useState } from 'react'

import FooterMenu from './components/FooterMenu'
import WorkoutThumbnail from './components/WorkoutThumbnail'
import Search from './components/Search'

import workoutDescService from './modules/workout_descriptions'

function App() {
  const [workoutDescs, setWorkoutDescs] = useState([])

  useEffect(() => {
    workoutDescService
      .getAll()
      .then(defaultWorkouts => {
        setWorkoutDescs(defaultWorkouts)
      })
      .catch(error => {
        console.log('couldnt download workout descriptions from server:', error)
      })
  }, [])

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
