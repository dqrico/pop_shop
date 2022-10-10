const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema({

    username:{
        type: String,
        required: [true, "Username is Required"],
    },
    email:{
        type: String,
        required: [true, "Email is Required"],
    },
    password:{
        type: String,
        required: [true, "Password is Required"],
        minLength: [8, "Password must be at least 8 characters"]
    }
}, {timestamps: true})


UserSchema.virtual("confirmPassword")
    .get(()=> this._confirmPassword)
    .set((value)=> this._confirmPassword = value)


UserSchema.pre("validate", function(next){
    console.log("inside: validate");

    if (this.password !== this._confirmPassword){
        this.invalidate("confirmPassword", "Passwords must match");
    }
    next()
})


UserSchema.pre("save", function(next){
    console.log("inside: pre save");

    bcrypt.hash(this.password, 10)
        .then((hashedPassword)=>{
            console.log("inside: hash");
            this.password = hashedPassword;
            next();
        })
})


const User = mongoose.model("User", UserSchema);

module.exports = User;