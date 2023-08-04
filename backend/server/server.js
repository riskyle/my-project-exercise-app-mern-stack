const express = require("express");

const mongoose = require("mongoose");

const dotenv = require('dotenv')
dotenv.config()

const cors = require("cors")

const app = express();

const workoutRoutes = require("../routes/workoutRoutes");

const userRoutes = require('../routes/userRoutes');

//middleware
app.use(express.json())
app.use(cors());
app.use(express.static('client/build'));

app.use('/workouts', workoutRoutes)

app.use('/user', userRoutes)

mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log("Connected!")
    app.listen(process.env.PORT_NODE, () => {
        console.log(`http://localhost:${process.env.PORT_NODE}/`)
    })
}).catch((err) => {
    console.log("Error message: ", err.message)
})


