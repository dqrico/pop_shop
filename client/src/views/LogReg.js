import React, { useState, useEffect } from 'react';
import Login from "../components/Login";
import Register from "../components/Register";

const LogReg = (props) => {


    return(
        <div>
            <div>
                <div className="Header">
                    <h1>Welcome to Pop Shop LMS</h1>
                </div>
                <div className="logreg-forms">
                    <Register />
                    <Login />
                </div>
            </div>
        </div>
    )
}


export default LogReg;