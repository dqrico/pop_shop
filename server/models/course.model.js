const mongoose = require("mongoose");



const CourseSchema = new mongoose.Schema({
    
    course_name:{
        type: String,
        required: [true, "Course's name is Required"],
        minlength: [3, "Name's length must be at least 3 characters"]
    },

    instructor:{
        type: String,
        required: [true, "Course type is Required"],
        minlength: [3, "Course Type must be at least 3 characters"]
    },

    course_level:{
        type: String,
        required: [true, "Course Level is required"],
        enum: ["Beginner","Intermediate","Advanced"] 
    },

    enroll_by:{
        type: Date
    },

    starts_at:{
        type: Date
    },

    enrolled_students:{
        type: Number
    },

    is_webinar:{
        type: Boolean
    },

    //ref connect user to course
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    
}, {timestamps: true})



const Course = mongoose.model("Course", CourseSchema);


//Export model - to be imported/used by controller. 
//Course.find({}) = e.g. find all documents inside of collection

module.exports = Course;