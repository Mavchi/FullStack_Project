import Workout from '../components/Workout'

const Home = ({ user }) => {
    console.log('home', user.favourite_workouts)

    return (
        <div>
        {user.favourite_workouts.map(workout => <Workout key={workout.name} workout={workout}/>)}
        </div>
    )
}

export default Home