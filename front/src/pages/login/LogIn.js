import React, { useState } from 'react'
import './login.css'

const Welcome = ({ handleGlobalState }) => {
    return (
        <div className='welcome-page'>
            <div className='login-button-container'>
                <div className='login-button-rounded login_green' onClick={handleGlobalState('sign up')}>Create Account</div>
                <div className='login-button-rounded login_grey' onClick={handleGlobalState('log in')}>Log In</div>
            </div>
        </div>
    )
}

const LogIn = ({ setGlobalState }) => {
    // welcome, sign up, sign in
    const [localState, setLocalState] = useState('welcome')

    const handleLocalStateChange = (state) => {
        return () => setLocalState(state)
    }

    if (localState === 'welcome')
        return (
            <div>
                <Welcome handleGlobalState={handleLocalStateChange} />
            </div>
        )
}

export default LogIn