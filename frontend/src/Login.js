import './App.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const userEmail = sessionStorage.getItem("email")
    const navigate = useNavigate()

    const loginClick = () => {
        const opts = {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "email":email,
                "password":password
            })
        }
        fetch('http://127.0.0.1:5000/login', opts)
        .then(resp => {
            if(resp.status === 200) {
                alert("Login successful");
                navigate('/');
                window.location.reload(false)
                sessionStorage.setItem("email", email)
                return resp.json()}
            else alert("Email or password invalid")        
        }) 
        .then(data => {
            sessionStorage.setItem("name", data.name)
        })
        .catch(error => {
            if (error.resp) {
                console.log(error.resp)
            }
        })
    }

    return (
        <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
            <div className='container'>
                <h1 className='page-header text-center'>Login</h1>
            </div>
            <form>
                {(userEmail && userEmail!="" && userEmail!=undefined) ? "You are logged in with this email "+userEmail : 
                <div>
                    <div className="form-outline mb-4">
                        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} text={email} name="email" id="form3Example3" className="form-control form-control-lg" placeholder="Enter email" />
                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                    </div>            
                    <div className="form-outline mb-3">
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} text={password} name="password" id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" />
                        <label className="form-label" htmlFor="form3Example4">Password</label>
                    </div>
                </div>}
                <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="button" className="btn btn-primary btn-lg" onClick={loginClick} >Login</button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/signup" className="link-danger">Register</a></p>
                </div>
  
            </form>
           
        </div>
    );
};
export default Login;