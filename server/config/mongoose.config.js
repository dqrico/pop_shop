const mongoose = require("mongoose");



const dbName = "coursesDB"



mongoose.connect("mongodb+srv://davidqrico:rCnHvI3C2vB1FKFZ@cluster0.mvzfnev.mongodb.net/?retryWrites=true&w=majority")

    .then(()=>{
        console.log(`Connected to the database called ${dbName}`)
    })
    .catch((err)=>{
        console.log(`error connecting to ${dbName}. Error:`,err)
    })