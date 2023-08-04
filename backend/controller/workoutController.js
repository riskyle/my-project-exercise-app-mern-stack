const { default: mongoose } = require('mongoose')
const { Exercise } = require('../model/workoutModel')

//GET all workouts
const workouts = async (req, res) => {
    //code
    try {
        const user_id = req.user._id;
        const exercise = await Exercise.find({ user_id }).sort({ createdAt: -1 })
        res.status(200).json(exercise)
    } catch (error) {
        console.log(error)
        res.send({ error: error.message })
    }
}

//POST a new workout
const add_workout = async (req, res) => {
    //code
    const { title, reps, loads } = req.body;
    const user_id = req.user._id
    try {
        if (!title) { throw Error("Fill workout title.") }
        else if (!reps) { throw Error("Fill workout reps.") }
        else if (!loads) { throw Error("Fill workout loads.") }
        const exercises = await Exercise.create({ title, reps, loads, user_id })
        res.status(200).json(exercises)
        console.log("Workout Added!")
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

//GET a single workout
const workout = async (req, res) => {
    //code
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400)
            throw Error("ID is not valid.")
        }
        const exercise = await Exercise.findById(id)
        res.status(200).json(exercise);
        console.log(exercise)
    } catch (error) {
        res.status(400).json({ error: error.message })
        console.log("Bad Request!");
    }
}

//DELETE a workout
const delete_workout = async (req, res) => {
    //code
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error("No such workouts.")
        }
        await Exercise.findByIdAndDelete(id)
        //send this id to react js
        res.status(200).json({ id });
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

//UPDATE a workout
const update_workout = async (req, res) => {
    //code
    try {
        const id = req.params.id;
        await Exercise.findByIdAndUpdate(id, req.body)
        res.status(200).json({ msg: "Updated!" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//export to use in another file
module.exports = {
    workouts,
    add_workout,
    workout,
    delete_workout,
    update_workout,
}