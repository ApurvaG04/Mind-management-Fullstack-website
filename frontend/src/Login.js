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
        fetch(process.env.REACT_APP_API_URL + '/login', opts)
        .then(resp => {
            if(resp.status === 200) {
                console.log("logged in")
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
        <div className='container d-flex align-items-center px-4 pt-5 my-5 py-4 bg-body-secondary col-lg-4'>
            <div className='form-signin w-100 m-auto '>
            <form>
                {/* <img class="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/> */}
                <h1 className="h3 mb-3 fw-normal">Login</h1>
                
                <div className="form-floating py-2">
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} text={email} name="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating py-2">
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} text={password} name="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <button type="button" className="btn btn-primary w-100 py-2" onClick={loginClick}>Login</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/signup" className="link-danger">Register</a></p>
            </form>
            </div>
        </div>
    );
};
export default Login;
