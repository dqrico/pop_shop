const express = require("express");
const cors = require("cors");
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


require("./routes/course.routes")(app);
require("./routes/user.routes")(app);

require("./config/mongoose.config");


app.listen(8000, ()=> console.log("Locked and Loaded on port 8000"))