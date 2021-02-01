import React, { useState } from 'react'
import ScrollMenu from 'react-horizontal-scrolling-menu';
//import { Tab } from 'react-materialize'
import WorkoutThumbnail from '../components/Workout'

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

const WorkoutPages = ({ tabs, handleClick }) => {
    const [selected, setSelected] = useState({selected: tabs[0].name})
    const list = tabs.map(tab => tab.name)
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
        </div>
    )
}

export default WorkoutPages