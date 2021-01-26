const mongoose = require('mongoose')

const workoutDescriptionSchema = mongoose.Schema({
    name: String,
    pro: Boolean,
    level: String,
    cardio: Number,
    muscle: Number,
    img: String
})

workoutDescriptionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        returnedObject.true_id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('WorkoutDescription', workoutDescriptionSchema)