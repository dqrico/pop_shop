import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault();
        axios
            .post(
                "http://localhost:8000/api/users/login",
                {
                    email: email,
                    password: password,
                }
            )
            .then((res) =>{
                console.log(res, "res");
                console.log(res.data, "in res data");
                navigate("/home");
            })
            .catch((err)=>{
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            });
    };

    
    return(
        <div className="login-form">
            
            <h2>Login</h2>
            <p className="error-text">{errorMessage ? errorMessage : ""}</p>
            <form onSubmit={login}>
                <div>
                    <label>Email: </label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login"
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login"
                    />
                </div>
                <br/>
                <div className="center">
                    <button>Login</button>
                </div>
            </form>
        </div>
    );
};


export default Login;
