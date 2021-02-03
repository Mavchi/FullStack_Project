import FooterMenu from '../components/FooterMenu'

const SettingsPage = ({ handleGlobalStateChange }) => {
    const logOut = () => {
        window.localStorage.removeItem('loggedKFITappUser')
        handleGlobalStateChange('Home')
        window.location.reload(false)
    }

    return (
        <div style={{ color: 'white' }}>
            <h1>Settings</h1>
            <button onClick={logOut}>Log out</button>

            <FooterMenu handleClick={handleGlobalStateChange}/>
        </div>
    )
}

export default SettingsPage