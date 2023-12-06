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
        <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
            <div className='container'>
                <h1 className='page-header text-center'>Register</h1>
            </div>
            <form>
                {/* {(userEmail && userEmail!="" && userEmail!=undefined) ? "You are logged in with this email "+userEmail :  */}
                <div>
                    <div className="form-outline mb-4">
                        <input type="name" value={name} onChange={(event) => setName(event.target.value)} text={name} name="name" id="form3Example3" className="form-control form-control-lg" placeholder="Enter name" />
                        <label className="form-label" htmlFor="form3Example3">Name</label>
                    </div> 
                    <div className="form-outline mb-4">
                        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} text={email} name="email" id="form3Example3" className="form-control form-control-lg" placeholder="Enter email" />
                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                    </div>            
                    <div className="form-outline mb-3">
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} text={password} name="password" id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" />
                        <label className="form-label" htmlFor="form3Example4">Password</label>
                    </div>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="button" className="btn btn-primary btn-lg" onClick={register} >Register</button>
                </div>
  
            </form>
           
        </div>
    );
};
export default Signup;