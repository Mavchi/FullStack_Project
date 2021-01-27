import React from 'react'
import { Tab } from 'react-materialize'
import WorkoutThumbnail from '../components/WorkoutThumbnail'

const WorkoutPage = ({ tab, handleClick }) => {
    return (
        <Tab
            active
            className="red"
            options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false
            }}
            title={tab.name}
        >
            {tab.workouts.map(workout => (
                <WorkoutThumbnail workout={workout} handleClick={() => console.log('reeni painettu')}/>
            ))}
        </Tab>
    )
}

export default WorkoutPage