const User = require("../models/user.model");
const bcrypt = require("bcrypt");


module.exports = {


    register: (req, res) => {
        console.log("in register");
        console.log(req.body);

        const user = new User(req.body);

        User.findOne({email: user.email})
            .then((uniqueEmailCheck)=>{
                if(uniqueEmailCheck === null){
                    user.save()
                        .then((newUser)=>{
                           console.log(newUser);
                           console.log("Successfully registered");
                           res.json({
                                successMessage: "Thank you for registering!",
                                user: newUser
                           });
                        })
                        .catch((err)=>{
                            console.log("Register NOT successful!");
                            res.status(400).json(err);
                        })
                }
                else{
                    res.status(400).json({message: "Email already taken!"})
                }
            })
            .catch((err)=> {
                res.status(400).json(err);
            })
    },

    login: (req, res)=>{
        User.findOne({email: req.body.email})
            .then((userRecord)=>{
                if(userRecord === null){
                    res.status(400).json({message: "Invalid Login Attempt"})
                }
                else{
                    bcrypt.compare(req.body.password, userRecord.password)
                        .then((isPasswordValid)=>{
                            if(isPasswordValid) {
                                console.log("password is valid");
                                res.json({message: "Successfully logged in!"})
                            }
                            else{
                                res.status(400).json({message: "Invalid Login and/or Email"})
                            }
                        })
                        .catch((err)=>{
                            console.log(err);
                            res.status(400).json({message: "Invalid Login and/or Email"})
                        })
                }
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json({message: "Invalid Login and/or Email"})
            })
    },


    logout: (req,res)=>{
        console.log("logging out");
        res.json({message: "Succesffully logget out!"})
    },


    getOneUser: (req, res)=>{
        User.findOne({_id: req.params.id})
            .then((oneUser)=>{
                res.json(oneUser)
            })
            .catch((err)=>{
                console.log(err);
            })
    }

}