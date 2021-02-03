
import React, { useState } from 'react'

import FooterMenu from '../components/FooterMenu'
import Search from '../components/Search'
import Workout from '../components/Workout'

import WorkoutTabs from './WorkoutTabs'

//import { Tabs } from 'react-tabs';
//import { Tabs } from 'react-materialize'
//import 'react-tabs/style/react-tabs.css';

const WorkoutsPage = ({ appData, handleGlobalStateChange }) => {
//    const [localState, setLocalState] = useState(appData.workout_menus[0].name)
    const [selectedTab, setSelectedTab] = useState(appData.workout_menus[0].name)
    //console.log('appData', appData.workout_menus[0].name)

    const handleTabClick = (selected_tab) => setSelectedTab(selected_tab)
    let active_tab_workouts = appData.workout_menus.find(menu => menu.name === selectedTab)
    console.log('active_tab_workouts', active_tab_workouts.workouts)
    return (
        <div>
            <Search handleChange={() => console.log('emmä tiiä')} />
            <WorkoutTabs appData={appData} handleCurrentTab={handleTabClick} />
            {active_tab_workouts.workouts.map(workout => <Workout key={selectedTab+'-'+workout.name} workout={workout}/>)}
            <FooterMenu handleClick={handleGlobalStateChange} />
        </div>
    )
}

export default WorkoutsPage