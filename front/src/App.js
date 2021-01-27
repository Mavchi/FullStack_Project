import React, { useEffect, useState } from 'react'
import lodash from 'lodash'

import WorkoutPage from './pages/WorkoutPage'

import workoutDescService from './services/workout_descriptions'
import workoutPageService from './services/workout_pages'

function App() {
  const [defaultWorkouts, setDefaultWorkouts] = useState([])
  const [workoutLists, setWorkoutLists] = useState({ tabs: [], favourite: [] })
  const [globalState, setGlobalState] = useState("workouts")

  useEffect(() => {
    workoutDescService
      .getAll()
      .then(workouts => {
        // download default workouts
        setDefaultWorkouts(lodash.cloneDeep(workouts))

        // download workout menu data
        let new_workout_list = ({ tabs: [], favourite: [] })
        new_workout_list.tabs = lodash.cloneDeep(workoutPageService.getAll())
        setWorkoutLists( new_workout_list )
        /*
        workoutPageService
          .getAll()
          .then(pages => {
            // set up data for workout menu
            let new_workout_list = lodash.cloneDeep(workoutLists)
            new_workout_list.tabs = lodash.deepCopy(pages)
            setWorkoutLists({ tabs: lodash.cloneDeep(new_workout_list), })
          })
          .catch(error => {
            console.log('couldnt download data for workout pages for server', error)
          })
        */
      })
      .catch(error => {
        console.log('couldnt download workout descriptions from server:', error)
      })
  }, [workoutLists])

  if (globalState === "workouts")
    return (
      <div className="content">
        <WorkoutPage
          workouts={defaultWorkouts}
          tabs={workoutLists.tabs}
        />
      </div>
    )
}

export default App;
