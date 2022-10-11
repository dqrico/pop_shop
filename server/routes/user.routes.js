const UserController = require("../controllers/user.controller");


module.exports = (app) => {

    app.post("/api/users/register", UserController.register);
    app.post("/api/users/login", UserController.login);
    app.post("/api/users/logout", UserController.logout);

    //! CALLS WITH PARAMS - GO AFTER !
    // param (:id) MUST MATCH as defined in controller
    app.get("/api/users/", UserController.getLoggedInUser);
    
}