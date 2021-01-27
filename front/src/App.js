import React, { useEffect, useState } from 'react'
import lodash from 'lodash'

import WorkoutPage from './pages/WorkoutPage'

import workoutDescService from './services/workout_descriptions'
import workoutPageService from './services/workout_pages'

function App() {
  const [defaultWorkouts, setDefaultWorkouts] = useState([])
  const [workoutLists, setWorkoutLists] = useState({ tabs: [], favourite: [] })
  const [globalState, setGlobalState] = useState("workouts")

  let initiated = false

  useEffect(() => {
    workoutDescService
      .getAll()
      .then(workouts => {
        // download default workouts
        //console.log('workouts', workouts)
        setDefaultWorkouts(workouts)
      })
      .catch(error => {
        console.log('couldnt download workout descriptions from server:', error)
      })
  }, [])

  if (!initiated) {
    initiated = true
    // download workout menu data
    let new_workout_list = lodash.cloneDeep(workoutLists)
    new_workout_list.tabs = lodash.cloneDeep(workoutPageService.getAll())
    //console.log('new_workout_list', new_workout_list)
    setWorkoutLists(new_workout_list)
  }

  if (globalState === "workouts") {
    //console.log('defaultWorkouts', defaultWorkouts)
    //console.log('workoutLists.tabs', workoutLists.tabs)
    return (
      <div className="content">
        <WorkoutPage
          workouts={defaultWorkouts}
          tabs={workoutLists.tabs}
        />
      </div>
    )
  }
}

export default App;
