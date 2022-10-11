import React, {useEffect, useState} from "react";
import axios from "axios";



const Register = (props) =>{

    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});

    
    // using single-state object to hold all data
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const register = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/register",
            user,
            {
                withCredentials: true
            })
            .then((res)=>{
                console.log(res.data);
                setUser({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
                setConfirmReg("Thank you for Registering, you can login now");
                setErrors({});
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })
    }


    return(
        <div>

            <h1>Register</h1>
            {confirmReg ? <h4 style={{color: "green"}}>{confirmReg}</h4> :null}
            <form onSubmit={register}>
                <div>
                    <label>Username</label>
                    {errors.username ? (
                        <span className="error-text">{errors.username.message}</span>
                    ) : null}
                    <input
                        type="text"
                        name="username"
                        onChange={(e)=> handleChange(e)}    
                    />
                </div>
                <div>
                    <label>Email</label>
                    {errors.email ? (
                        <span className="error-text">{errors.email.message}</span>
                    ) : null}
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password</label>
                    {errors.password ? (
                        <span className="error-text">{errors.password.message}</span>
                    ) : null}
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    {errors.confitmPassword ? (
                        <span className="error-text">{errors.ConfirmPassword.message}</span>
                    ) : null}
                    <input
                        type="password"
                        name="ConfirmPassword"
                        value={user.ConfirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className="center">
                    <button>Register</button>
                </div>
            </form>
        </div>
    )

}