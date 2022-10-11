const Course = require('../models/course.model');
const jwt = require("jsonwebtoken");





module.exports = {
    // CRUD functions use model to connect to Collection, then perform action on collection/documents
    // CREATE
    createNewCourse: (req, res)=>{

        const newCourseObject = new Course(req.body);

        const decodedJWT = jwt.decode(req.cookies.usertoken,{
            complete: true
        })

        newCourseObject.createdBy = decodedJWT.payload.id;

        newCourseObject.save()
            .then((newCourse)=>{
                console.log(newCourse);
                res.json(newCourse)
            })
            .catch((err)=>{
                console.log("createNewCourse failed");
                res.status(400).json(err);
            })
    },
    
    // READ
    findAllCourses: (req, res) => {
        Course.find()
            .populate("createdBy", "username email")
            .then((allCourses)=>{
                console.log(allCourses);
                res.json(allCourses)
            })
            .catch((err)=>{
                console.log("findAllCourses failed");
                res.json({message: "Issue with findAll", error: err})
            })
    },

    findOneCourse: (req, res)=>{
        Course.findOne({_id: req.params.id})
            .then((oneCourse)=>{
                console.log(oneCourse);
                res.json(oneCourse)
            })
            .catch((err)=>{
                console.log("findOneCourse Failed");
                res.json({message: "error with findOne", error: err})
            })
    },

    // UPDATE
    updateCourse: (req, res)=>{
        Course.findOneAndUpdate({_id: req.params.id},
            req.body,
            {new: true, runValidators: true}
            )
            .then((updatedCourse)=>{
                console.log(updatedCourse);
                res.json(updatedCourse)
            })
            .catch((err)=>{
                console.log("UpdateCourse Failed");
                res.status(400).json(err)
            })
    },

    // DELETE
    deleteCourse: (req, res)=>{
        Course.deleteOne({_id: req.params.id})
            .then((deletedCourse)=>{
                console.log(deletedCourse);
                res.json(deletedCourse)
            })
            .catch((err)=>{
                console.log("DeleteCourse Failed");
                res.json({message: "error with deleteOne", error: err})
            })
    },

}