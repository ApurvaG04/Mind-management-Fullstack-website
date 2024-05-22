import './App.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const userEmail = sessionStorage.getItem("email")
    const navigate = useNavigate()

    const register = () => {
        const opts = {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "name":name,
                "email":email,
                "password":password
            })
        }
        fetch('http://127.0.0.1:5000/signup', opts)
        .then(resp => {
            if(resp.status === 200) {
                console.log(name)
                alert("Account created successfully");
                navigate('/login');
                window.location.reload(false)
                return resp.json()}
            else alert("User already exists")        
        })
        .catch(error => {
            if (error.resp) {
                console.log(error.resp)
            }
        })
    }

    return (
        <div className='container d-flex align-items-center px-4 pt-5 my-5 py-4 bg-body-secondary col-lg-4'>
        <div className='form-signin w-100 m-auto'>
        <form>
            {/* <img class="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/> */}
            <h1 className="h3 mb-3 fw-normal">Signup</h1>
            <div className="form-floating py-2">
                <input type="name" value={name} onChange={(event) => setName(event.target.value)} text={name} name="name" id="floatingName" className="form-control" placeholder="Enter name" />
                <label className="form-label" htmlFor="floatingName">Name</label>
            </div>
            <div className="form-floating py-2">
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} text={email} name="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating py-2">
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} text={password} name="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="form-check text-start my-3">
            <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
            <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me
            </label>
            </div>
            <button className="btn btn-primary w-100 py-3" onClick={register} type="button">Signup</button>
            <p className="small fw-bold mt-2 pt-1 mb-1">Already have an account? <a href="/login" className="link-danger">Login</a></p>
        </form>
        </div>
    </div>
    );
};
export default Signup;