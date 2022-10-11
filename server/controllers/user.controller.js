const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {


    register: (req, res) => {
        
        //req data + User model = create user object 

        const user = new User(req.body);
        
        //info inside instance of this object
        //save = instance method
        //create = static + takes object as parameter

        user.save()
            .then((newUser)=>{
                console.log(newUser);
                console.log("Successfully registered!");
                res.json({
                    successMessage: "Thank you for registering!",
                    user: newUser
                })
            })
            .catch((err)=>{
                console.log("Register NOT successful!");
                res.status(400).json(err);
            })
    },


    login: (req, res)=>{
        User.findOne({email: req.body.email})
            .then((userRecord)=>{
                //check if returned obj is null
                if(userRecord === null){
                    res.status(400).json({message: "Invalid Login Attempt"})
                }
                else{
                    //if email is found:
                    bcrypt.compare(req.body.password, userRecord.password)
                        .then((isPasswordValid)=>{
                            //Cookie = "usertoken"
                            if(isPasswordValid) {
                                console.log("password is valid");
                                res.cookie(
                                    "usertoken",
                                    jwt.sign(
                                        {
                                            //usertoken cookie payload:
                                           id: userRecord._id,
                                           email: userRecord.email,
                                           username: userRecord.username
                                        },
                                        process.env.JWT_SECRET
                                    ),
                                        {
                                            httpOnly: true,
                                            expires: new Date(Date.now() + 9000000)
                                        }
                                ).json({
                                    message: "Successfully Logged in",
                                    userLoggedIn: userRecord.username
                                });
                            }
                            else{
                                res.status(400).json({message: "Invalid Attempt"})
                            }
                        })
                        .catch((err)=>{
                            console.log(err);
                            res.status(400).json({message: "Invalid Attempt"})
                        })
                }
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json({message: "Invalid Attempt"})
            })
    },


    logout: (req,res)=>{
        console.log("logging out");
        res.clearCookie("usertoken");
        res.json({message: "Succesffully logged out!"})
    },


    getLoggedInUser: (req, res)=>{

        const decodedJWT = jwt.decode(req.cookies.usertoken,{
            complete: true
        })

        User.findOne({_id: decodedJWT.payload.id})
            .then((user)=>{
                console.log(user);
                res.json(user)
            })
            .catch((err)=>{
                console.log(err);
            })
    }


}