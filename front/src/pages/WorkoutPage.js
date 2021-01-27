import React, { useState } from 'react'

import FooterMenu from '../components/FooterMenu'
import Search from '../components/Search'
import WorkoutTabs from './WorkoutTabs'

//import { Tabs } from 'react-tabs';
//import { Tabs } from 'react-materialize'
//import 'react-tabs/style/react-tabs.css';

const WorkoutPage = ({ workouts, tabs }) => {
    const [localState, setLocalState] = useState('main')

    const handleTabClick = () => console.log('tab menu clikki')
    const handleMenuClick = () => console.log('footermenu clikki')

    if (localState === 'main') {
        return (
            <div>
                <Search handleChange={() => console.log('emmä tiiä')} />
                <WorkoutTabs tabs={tabs} handleClick={handleTabClick} />
                <FooterMenu handleClick={handleMenuClick} />
            </div>
        )
    }
}

export default WorkoutPage