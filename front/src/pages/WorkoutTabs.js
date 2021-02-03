
import React, { useState, useEffect } from 'react'
import ScrollMenu from 'react-horizontal-scrolling-menu'

import lodash from 'lodash'
//import { Tab } from 'react-materialize'

import './WorkoutTabs.css'



// Print menu item
const MenuItem = ({ text, selected }) => {
    return (
        <div className={`menu-item ${selected ? 'active' : ''}`}>
            {text}
        </div>
    )
}

// all menu item component
const Menu = ( list, selected ) => 
    list.map(el => {
        const {name} = el

        return <MenuItem text={name} key={'tab-menu-item-'+name} selected={selected} />
    })

const Arrow = ({ text, className }) => {
    return (
        <div
            className={className}
        >{text}</div>
    )
}
const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const WorkoutPages = ({ appData, handleClick }) => {
    //console.log('appData',appData.workout_menus[0].name)
    const [selected, setSelected] = useState({selected: 0})
    const [list, setList] = useState([])

    useEffect(() => {
        const new_list = []
        for(let i=0; i<appData.workout_menus.length; i++){
            console.log(appData.workout_menus[i].name)
            new_list.push({name: appData.workout_menus[i].name})
            console.log(new_list)
        }
        setList(new_list)
    }, [appData.workout_menus])
    
    console.log(list)
    const onSelect = key => {
        setSelected({selected: key})
    }

    // create menu items
    const menuItems = Menu(list, selected)
    return (
        <div>
            <ScrollMenu
                data={menuItems}
                arrowLeft={ArrowLeft}
                arrowRight={ArrowRight}
                selected={selected}
                onSelect={onSelect}
            />
            {appData.workout_menus[selected].name}
        </div>
    )
}

export default WorkoutPages