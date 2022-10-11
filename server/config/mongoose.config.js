const mongoose = require("mongoose");





mongoose.connect(`mongodb+srv://davidqrico:${process.env.DB_PASSWORD}@cluster0.mvzfnev.mongodb.net/?retryWrites=true&w=majority`)

    .then(()=>{
        console.log(`Connected to Database: ${process.env.DB_NAME}`)
    })
    .catch((err)=>{
        console.log(`error connecting to ${process.env.DB_NAME}. Error:`,err)
    })