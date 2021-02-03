import React, { useEffect, useState } from 'react'
//import lodash from 'lodash'

import LogIn from './pages/login/LogIn'
import Home from './pages/Home'
import SettingsPage from './pages/Settings'
import WorkoutPage from './pages/Workouts'

import loginService from './services/login'
import appDataService from './services/appData'

//import workoutDescService from './services/workout_descriptions'
//import workoutPageService from './services/workout_pages'
//import favouriteWorkoutsService from './services/favourite_workouts'

function App() {
  const [globalState, setGlobalState] = useState("Home")
  const [appData, setAppData] = useState(null)
  const [user, setUser] = useState(null)

  //window.localStorage.removeItem('loggedKFITappUser')
  useEffect(() => {
    const getData = async () => {
      // dowload appData from server first
      const app_data = await appDataService.getAll()
      //console.log('app_data', app_data)
      setAppData(app_data)

      const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedKFITappUser'))
      //console.log('token', loggedUserJSON)
      if (loggedUserJSON !== "undefined" || loggedUserJSON !== null || !loggedUserJSON) {
        //console.log('token löytyy selaimesta')
        const user = await loginService.getUserData(loggedUserJSON)
        //console.log('app, user: ', user)
        //const updated_user = lodash.cloneDeep(user)
        // download favourite workouts
        setUser(user)
      }
    }

    getData()
  }, [])

  const handleGlobalStateChange = (action) => {
    return () => {
      setGlobalState(action)
    }
  }

  const handleLogIn = async (user) => {
    setUser(user)
    setGlobalState('Home')
  }
  
  if (user === null || user.login_data === null)
    return (
      <div>
        <LogIn handleInitUser={handleLogIn} setGlobalState={handleGlobalStateChange} />
      </div>
    )
  //console.log('user in app, before Home', user)
  if (globalState === 'Home')
    return (
      <div>
        <Home user={user} handleGlobalStateChange={handleGlobalStateChange}/>
      </div>
    )
  
  if(globalState === 'Workouts') {
    return (
      <WorkoutPage appData={appData} handleGlobalStateChange={handleGlobalStateChange}/>
    )
  }
  
  if(globalState === 'Settings') 
      return (
        <SettingsPage handleGlobalStateChange={handleGlobalStateChange}/>
      )
}

export default App;
