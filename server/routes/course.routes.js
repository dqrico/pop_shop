const CourseController = require("../controllers/course.controller");
// const {authenticate} = require("../config/jwt.config")


module.exports = (app) => {

    app.get("/api/courses", CourseController.findAllCourses);    // GET HTTP =  data is only being read
    app.post("/api/courses", CourseController.createNewCourse);  // POST HTTP = when data is being sent to server to create document

    //! CALLS WITH PARAMS - GO AFTER !
    // param (:id) MUST MATCH as defined in controller 1:43:00
    app.get("/api/courses/:id", CourseController.findOneCourse);
    app.delete("/api/courses/:id", CourseController.deleteCourse);
    
    
}