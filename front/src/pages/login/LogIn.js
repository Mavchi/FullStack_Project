import React, { useState } from 'react'
import './login.css'

import facebook_icon from '../../img/icons/facebook-icon.svg'
import google_icon from '../../img/icons/google-icon.svg'

const Welcome = ({ handleGlobalState }) => {
    return (
        <div className='welcome-page'>
            <div className='login-welcome-button-container'>
                <div className='login-button login-rounded login-green' onClick={handleGlobalState('sign up')}>Create Account</div>
                <div className='login-button login-rounded login-grey' onClick={handleGlobalState('sign in')}>Log In</div>
            </div>
        </div>
    )
}

const SignUp = ({ handleGlobalState }) => {
    const [localState, setLocalState] = useState('main')

    const handleLocalStateChange = (state) => {
        return () => (
            console.log(state, 'clicked')
        )
    }

    if (localState === 'main')
        return (
            <div className='sign-page'>
                <div className='sign-header'>
                    Welcome
                </div>
                <div className='sign-container'>
                    <div className='login-button login-blue' onClick={handleLocalStateChange('sign up-facebook')}>
                        <div className={'login-thumbnail-container'}>
                            <img style={{ height: '40px'}} src={facebook_icon} alt={'facebook-icon'}/>
                        </div>
                        Sign Up with Facebook
                    </div>
                    <div className='login-button login-blue' onClick={handleLocalStateChange('sign up-google')}>
                        <div className={'login-thumbnail-container'}>
                            <img style={{ height: '40px'}} src={google_icon} alt={'google-icon'}/>
                        </div>
                        Sign Up with Google
                    </div>

                    <div className='login-button' onClick={handleLocalStateChange('or')}>
                        or
                    </div>
                    <div className='login-button login-grey' onClick={handleLocalStateChange('sign up-email')}>
                        Sign Up with Email
                    </div>
                </div>
                <div style={{ color: '#E4DEDE', textAlign: 'center'}}>
                    Already have an account? <span style={{ color: '#395185'}} onClick={handleGlobalState('sign in')}>Sign In</span>
                </div>
            </div>
        )
}

const SignIn = ({ handleGlobalState }) => {
    const [localState, setLocalState] = useState('main')

    const handleLocalStateChange = (state) => {
        return () => (
            console.log(state, 'clicked')
        )
    }

    if (localState === 'main')
        return (
            <div className='sign-page'>
                <div className='sign-header'>
                    Welcome Back
                </div>
                <div className='sign-container'>
                    <div className='login-button login-blue' onClick={handleLocalStateChange('sign in-facebook')}>
                        <div className={'login-thumbnail-container'}>
                            <img style={{ height: '40px'}} src={facebook_icon} alt={'facebook-icon'}/>
                        </div>
                        Log In with Facebook
                    </div>
                    <div className='login-button login-blue' onClick={handleLocalStateChange('sign in-google')}>
                        <div className={'login-thumbnail-container'}>
                            <img style={{ height: '40px'}} src={google_icon} alt={'google-icon'}/>
                        </div>
                        Log In with Google
                    </div>

                    <div className='login-button' onClick={handleLocalStateChange('or')}>
                        or
                    </div>

                    <input value='Email' style={{ color: '#E4DEDE' }}/>
                    <input value='Password' style={{ color: '#E4DEDE' }}/>
                    <span style={{ color: '#395185', textAlign: 'center'}} onClick={handleGlobalState('forgot password')}>Forgot Password</span>
                    <div className='login-button login-grey' onClick={handleLocalStateChange('sign in-email')}>
                        Log In with Email
                    </div>
                </div>
                <div style={{ color: '#E4DEDE', textAlign: 'center'}}>
                    Don't have an account? <span style={{ color: '#395185'}} onClick={handleGlobalState('sign up')}>Sign Up</span>
                </div>
            </div>
        )
}

const LogIn = ({ setGlobalState }) => {
    // welcome, sign up, sign in, forgot password
    const [localState, setLocalState] = useState('welcome')

    const handleLocalStateChange = (state) => {
        return () => {
            console.log('clicked', state)
            setLocalState(state)
        }
    }

    if (localState === 'welcome')
        return (
            <div>
                <Welcome handleGlobalState={handleLocalStateChange} />
            </div>
        )

    if (localState === 'sign up')
        return (
            <div>
                <SignUp handleGlobalState={handleLocalStateChange} />
            </div>
        )

    if (localState === 'sign in')
        return (
            <div>
                <SignIn handleGlobalState={handleLocalStateChange} />
            </div>
        )
}

export default LogIn