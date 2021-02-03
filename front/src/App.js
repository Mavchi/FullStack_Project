import React, { useEffect, useState } from 'react'
import lodash from 'lodash'

import LogIn from './pages/login/LogIn'
import Home from './pages/Home'

import loginService from './services/login'
//import WorkoutPage from './pages/WorkoutPage'

//import workoutDescService from './services/workout_descriptions'
//import workoutPageService from './services/workout_pages'
//import favouriteWorkoutsService from './services/favourite_workouts'

function App() {
  const [defaultWorkouts, setDefaultWorkouts] = useState([])
  const [workoutLists, setWorkoutLists] = useState({ tabs: [], favourite: [] })
  const [globalState, setGlobalState] = useState("home")
  const [user, setUser] = useState(null)

  //window.localStorage.removeItem('loggedKFITappUser')
  useEffect(() => {
    const getData = async () => {
      const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedKFITappUser'))
      console.log('token', loggedUserJSON)
      if (loggedUserJSON !== "undefined" || loggedUserJSON !== null || !loggedUserJSON) {
        console.log('token löytyy selaimesta')
        const user = await loginService.getUserData(loggedUserJSON)

        console.log('app, user: ', user)
        //const updated_user = lodash.cloneDeep(user)
        // download favourite workouts
        setUser(user)
      }
    }

    getData()
  }, [])

  const handleGlobalStateChange = (action) => {
    return () => setGlobalState(action)
  }

  const handleLogIn = async (user) => {
    setUser(user)
    setGlobalState('home')
  }

  if (user === null || user.login_data === null)
    return (
      <div>
        <LogIn handleInitUser={handleLogIn} setGlobalState={handleGlobalStateChange} />
      </div>
    )
  console.log('user in app, before Home', user)
  if (globalState === 'home')
    return (
      <div>
        <Home user={user} handleGlobalStateChange={handleGlobalStateChange}/>
      </div>
    )

}

export default App;
