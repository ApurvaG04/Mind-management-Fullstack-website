import './App.css';
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const token = sessionStorage.getItem("token");

    const handleClick = () => {
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
        fetch('http://127.0.0.1:5000/token', opts)
        .then(resp => {
            if(resp.status === 200) return resp.json();
            else alert("There is an Authetication error")
        })
        .then(data => {
            sessionStorage.setItem("token", data.access_token)
        })
        .catch(error => {
            console.error("Authentication error", error);
        })
    }

    return (
        <div className='auth'>
            <h1>Login</h1>
            {(token && token!="" && token!=undefined) ? "You are logged in with this token"+token : 
                <div>
                    <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button onClick={handleClick}>Login</button>
                </div>
            }
           
        </div>
    );
};
export default Login;