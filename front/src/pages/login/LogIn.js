import React, { useState } from 'react'
import './login.css'

import facebook_icon from '../../img/icons/facebook-icon.svg'
import google_icon from '../../img/icons/google-icon.svg'

import 'materialize-css';
import { TextInput } from 'react-materialize';

import loginService from '../../services/login'

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
    // main, sign up-facebook, sign up-google, sign up-email
    const [localState, setLocalState] = useState('main')

    const handleLocalStateChange = (state) => {
        return () => (
            setLocalState(state)
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
                            <img style={{ height: '40px' }} src={facebook_icon} alt={'facebook-icon'} />
                        </div>
                        Sign Up with Facebook
                    </div>
                    <div className='login-button login-blue' onClick={handleLocalStateChange('sign up-google')}>
                        <div className={'login-thumbnail-container'}>
                            <img style={{ height: '40px' }} src={google_icon} alt={'google-icon'} />
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
                <div style={{ color: '#E4DEDE', textAlign: 'center' }}>
                    Already have an account? <span style={{ color: '#395185' }} onClick={handleGlobalState('sign in')}>Log In</span>
                </div>
            </div>
        )

    if (localState === 'sign up-email')
        return (
            <div className='login-container-centered'>
                <div style={{ fontWeight: 'bold', fontSize: '30px', textAlign: 'center', color: '#E4DEDE' }}>Sign Up with Email</div>
                <TextInput
                    label='Name'
                />
                <TextInput
                    label='Email'
                    email='true'
                />
                <TextInput
                    label='Create Password'
                    password='true'
                />

                <div style={{ color: '#E4DEDE', textAlign: 'center' }}>
                    Permission for marketing
                </div>

                <div className='login-button login-grey'>
                    Create Account
                </div>
                <div style={{ color: '#E4DEDE', textAlign: 'center' }}>
                    Already have an account? <span style={{ color: '#395185' }} onClick={handleGlobalState('sign in')}>Log In</span>
                </div>
            </div>
        )
}

const SignIn = ({ handleInitUser, handleGlobalState }) => {
    //const [localState, setLocalState] = useState('main')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLocalStateChange = (state) => {
        return () => (
            console.log(state, 'clicked')
        )
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })

            setUsername('')
            setPassword('')
            handleInitUser(user)
        } catch (exception) {
            console.log('wrong credentials, cant log in')
        }
    }

    //if (localState === 'main')
    return (
        <div className='sign-page'>
            <div className='sign-header'>
                Welcome Back
                </div>
            <div className='sign-container'>
                <div className='login-button login-blue' onClick={handleLocalStateChange('sign in-facebook')}>
                    <div className={'login-thumbnail-container'}>
                        <img style={{ height: '40px' }} src={facebook_icon} alt={'facebook-icon'} />
                    </div>
                        Log In with Facebook
                    </div>
                <div className='login-button login-blue' onClick={handleLocalStateChange('sign in-google')}>
                    <div className={'login-thumbnail-container'}>
                        <img style={{ height: '40px' }} src={google_icon} alt={'google-icon'} />
                    </div>
                        Log In with Google
                    </div>

                <div className='login-button' onClick={handleLocalStateChange('or')}>
                    or
                    </div>

                <input value={username} placeholder='Email' style={{ color: '#E4DEDE' }} onChange={({ target }) => setUsername(target.value)} />
                <input value={password} placeholder='Password' style={{ color: '#E4DEDE' }} onChange={({ target }) => setPassword(target.value)} />
                <div style={{ color: '#395185', textAlign: 'center' }} onClick={handleGlobalState('forgot password')}>Forgot Password</div>
                <div className='login-button login-grey' onClick={handleLogin}>
                    Log In with Email
                    </div>
            </div>
            <div style={{ color: '#E4DEDE', textAlign: 'center' }}>
                Don't have an account? <span style={{ color: '#395185' }} onClick={handleGlobalState('sign up')}>Sign Up</span>
            </div>
        </div>
    )
}

const LogIn = ({ handleInitUser, setGlobalState }) => {
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
                <SignIn handleInitUser={handleInitUser} handleGlobalState={handleLocalStateChange} />
            </div>
        )
}

export default LogIn