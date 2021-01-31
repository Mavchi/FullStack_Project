const mongoose = require('mongoose')

const workoutSchema = mongoose.Schema({
    name: String,
    description: {
        pro: { type: Boolean, },
        level: { type: String },
        cardio: { type: Number },
        muscle: { type: Number },
        img: { type: String },
        tags: [String],
    }
})

workoutSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        returnedObject.true_id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Workout', workoutSchema)