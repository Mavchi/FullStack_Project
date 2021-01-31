import React, { useEffect, useState } from 'react'
import lodash from 'lodash'

import LogIn from './pages/login/LogIn'
import WorkoutPage from './pages/WorkoutPage'

import workoutDescService from './services/workout_descriptions'
import workoutPageService from './services/workout_pages'

function App() {
  const [defaultWorkouts, setDefaultWorkouts] = useState([])
  const [workoutLists, setWorkoutLists] = useState({ tabs: [], favourite: [] })
  const [globalState, setGlobalState] = useState("log in")

  useEffect(() => {
    workoutDescService
      .getAll()
      .then(workouts => {
        // download default workouts
        console.log('workouts', workouts)
        setDefaultWorkouts(lodash.cloneDeep(workouts))
      })
      .catch(error => {
        console.log('couldnt download workout descriptions from server:', error)
      })
  }, [])
/*
  useEffect(() => {
    workoutPageService
      .getAll()
      .then(pages => {
        // download menu items and included workouts
        console.log('pages', pages)
        setWorkoutLists(lodash.cloneDeep(pages))
      })
      .catch(error => {
        console.log('couldnt download workout menu from server:', error)
      })
  }, [])
*/
  const handleGlobalStateChange = (action) => {
    return () => setGlobalState(action)
  }

  if(globalState === 'log in')
    return (
      <div>
        <LogIn setGlobalState={handleGlobalStateChange}/>
      </div>
    )
/*
  if (globalState === "workouts") {
    return (
      <div className="content">
        <WorkoutPage
          workouts={defaultWorkouts}
          tabs={workoutLists}
        />
      </div>
    )
  }*/
}

export default App;
