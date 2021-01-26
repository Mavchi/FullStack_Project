import React, { useEffect, useState } from 'react'
import lodash from 'lodash'

import WorkoutPage from './pages/WorkoutPage'

import workoutDescService from './services/workout_descriptions'

function App() {
  const [workoutDescs, setWorkoutDescs] = useState([])

  useEffect(() => {
    workoutDescService
      .getAll()
      .then(defaultWorkouts => {
        setWorkoutDescs(lodash.cloneDeep(defaultWorkouts))
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
      <WorkoutPage />
    </div>
  )
}

export default App;
