import React from 'react'
import home_icon from '../img/icons/home-icon.svg'
import workouts_icon from '../img/icons/dumbbell-icon.svg'
import statistics_icon from '../img/icons/stats-icon.svg'
import profile_icon from '../img/icons/profile-icon.svg'
import settings_icon from './icons/settings-icon.svg'

const FooterMenu = ({ handleClick }) => {
    const menu_items = [
        {name: 'Home', icon: home_icon},
        {name: 'Workouts', icon: workouts_icon},
        {name: 'Statistics', icon: statistics_icon},
        {name: 'Profile', icon: profile_icon},
        {name: 'Settings', icon: settings_icon},
    ]

    return(
        <div className="footer-menu">
            {menu_items.map((item) => (
                <div key={item.name} className="footer-menu-item" onClick={handleClick(item.name)}>
                    <img className="footer-menu-icon" src={item.icon} alt={item.name+'-icon'}/>
                </div>
            ))}
        </div>
    )
}

export default FooterMenu
