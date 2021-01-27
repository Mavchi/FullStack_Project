import React, { useState } from 'react'
import { Tabs } from 'react-materialize'

import FooterMenu from '../components/FooterMenu'
import Search from '../components/Search'
import WorkoutTab from './WorkoutTab'

const WorkoutPage = ({ workouts, tabs }) => {
    const [localState, setLocalState] = useState('main')

    const handleTabClick = () => console.log('tab menu clikki')
    const handleMenuClick = () => console.log('footermenu clikki')

    if(localState === 'main')
    return (
            <div>
                <Search handleChange={() => console.log('emmä tiiä')} />

                <Tabs
                    className="tab-demo z-depth-1"
                    options={{
                        swipeable: true
                    }}
                >
                    {tabs.map(tab => <WorkoutTab key={tab.name} tab={tab} handleClick={handleTabClick}/>)}
                </Tabs>

                <FooterMenu handleClick={handleMenuClick} />
            </div>
    )
}

export default WorkoutPage