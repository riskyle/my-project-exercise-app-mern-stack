const express = require("express");

const router = express.Router();

const {
    workouts,
    add_workout,
    workout,
    delete_workout,
    update_workout } = require('../controller/workoutController');
const requireAuth = require("../middleware/requireAuth");

//require authorization for all workout routes
router.use(requireAuth)

//routes

//GET all workouts
router.get('/', workouts)

//POST a new workout
router.post('/', add_workout)

//GET a single workout
router.get('/:id', workout)

//DELETE a workout
router.delete('/:id', delete_workout)

//UPDATE a workout
router.put('/:id', update_workout)

//export to use in another file
module.exports = router

