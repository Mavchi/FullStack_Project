
import React, { useState } from 'react'

import FooterMenu from '../components/FooterMenu'
import Search from '../components/Search'
import WorkoutTabs from './WorkoutTabs'

//import { Tabs } from 'react-tabs';
//import { Tabs } from 'react-materialize'
//import 'react-tabs/style/react-tabs.css';

const WorkoutPage = ({ appData, handleGlobalStateChange }) => {
    const [localState, setLocalState] = useState(appData.workout_menus[0].name)

    //console.log('appData', appData)

    const handleTabClick = () => console.log('tab menu clikki')

    return (
        <div>
            <Search handleChange={() => console.log('emmä tiiä')} />
            <WorkoutTabs appData={appData} handleClick={handleTabClick} />
            <FooterMenu handleClick={handleGlobalStateChange} />
        </div>
    )
}

export default WorkoutPage