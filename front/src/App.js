import React, { useEffect, useState } from 'react'
import lodash from 'lodash'

import LogIn from './pages/login/LogIn'
import WorkoutPage from './pages/WorkoutPage'
import Home from './pages/Home'

import workoutDescService from './services/workout_descriptions'
import workoutPageService from './services/workout_pages'
import favouriteWorkoutsService from './services/favourite_workouts'

function App() {
  const [defaultWorkouts, setDefaultWorkouts] = useState([])
  const [workoutLists, setWorkoutLists] = useState({ tabs: [], favourite: [] })
  const [globalState, setGlobalState] = useState("home")
  const [user, setUser] = useState(null)

  //window.localStorage.removeItem('loggedKFITappUser')

  useEffect(() => {
    console.log(window.localStorage.getItem('loggedKFITappUser'))
    const loggedUserJSON = window.localStorage.getItem('loggedKFITappUser')
    if (loggedUserJSON !== "undefined") {
      //console.log(loggedUserJSON, 'hupsista')
      const updated_user = {}
      updated_user.login_data = JSON.parse(loggedUserJSON)
      //const updated_user = lodash.cloneDeep(user)
      // download favourite workouts
      updated_user.favourite_workouts = favouriteWorkoutsService.getAll()
      setUser(updated_user)
    }
  }, [])

  const handleGlobalStateChange = (action) => {
    return () => setGlobalState(action)
  }

  const handleLogIn = async (user) => {
    const updated_user = {}
    updated_user.login_data = lodash.cloneDeep(user)

    // download favourite workouts
    updated_user.favourite_workouts = await favouriteWorkoutsService.getAll()

    setUser(updated_user)
    setGlobalState('home')
  }

  if (user === null)
    return (
      <div>
        <LogIn handleInitUser={handleLogIn} setGlobalState={handleGlobalStateChange} />
      </div>
    )
  console.log(user.favourite_workouts)
  if (globalState === 'home')
    return (
      <div>
        <Home user={user} />
      </div>
    )

}

export default App;
