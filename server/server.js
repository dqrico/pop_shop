require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();


// MIDDLEWARE
//Required for POST + PUT CALLS (avoids TyperErrors on "post" calls)
//Parses incoming requests consisting of JSON payloads.
app.use(express.json()); 

//Parses incoming requests consisting of STRING/ARRAY JSON payloads.
app.use(express.urlencoded({extended: true})); 

//Allows front-end (port 3000) to call back-end (port 8000). (avoids "cors erros" with axios calls)
app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(cookieParser())

require("./routes/course.routes")(app);
require("./routes/user.routes")(app);

require("./config/mongoose.config");


app.listen(process.env.MY_PORT, ()=> console.log(`Locked and Loaded on ${process.env.MY_PORT}`))