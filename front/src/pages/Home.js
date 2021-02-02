import Workout from '../components/Workout'

const Home = ({ user }) => {
    console.log('home', user)

    return (
        <div>
        {user.favourite_workouts.map(workout => workout.name)}
        </div>
    )
}

export default Home