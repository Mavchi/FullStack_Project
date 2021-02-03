import Workout from '../components/Workout'
import FooterMenu from '../components/FooterMenu'

const Home = ({ user, handleGlobalStateChange }) => {
    console.log('home', user)

    return (
        <div>
            <div>
                {user.favourite_workouts.map(workout => <Workout key={'thombnail-' + workout.name} workout={workout} />)}
            </div>
            <FooterMenu handleClick={handleGlobalStateChange}/>
        </div>
    )
}

export default Home