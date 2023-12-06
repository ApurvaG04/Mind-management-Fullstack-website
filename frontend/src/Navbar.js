import React from "react";
import { Link } from "react-router-dom";
import './App.css';
import {useNavigate} from "react-router-dom";

const Navbar = (props) => {

	const userEmail = sessionStorage.getItem('email');
	const userName = sessionStorage.getItem('name');
	const navigate = useNavigate();
    function logoutClick() {
        const opts = {
            method: 'GET',
        }
        fetch('http://127.0.0.1:5000/logout', opts)
        .then(resp => {
			if(resp.status === 200) {
				sessionStorage.removeItem("email")
                alert("Successfully Logout");
                navigate('/');
				window.location.reload(false)
                return resp.json()}
            else alert("There is some error")  
        })
        .catch(error => {
            if (error.resp) {
                console.log(error.resp)
                console.log(error.resp.status)
                console.log(error.resp.headers)
              }
        })
    }


	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<div className="col">
				<Link to="/">
					<span className="navbar-brand">Mind Care</span>
				</Link>
				<Link to="/">
					<span className="btn btn-primary">Home</span>
				</Link>
				<Link to="/journal">
					<button className="btn btn-primary">Journal</button>
				</Link>
				<Link to="/login">
					<button className="btn btn-primary">Login</button>
				</Link>
				{/* <Link to="/signup">
					<button className="btn btn-primary">Signup</button>
				</Link> */}
				{(userEmail && userEmail!="" && userEmail!=undefined)?			
				<>
					<button className="btn btn-danger" type="submit" onClick={logoutClick}>Logout</button>
					<p className="col"> Welcome <strong>{userName}</strong>!!</p>
				</>
				:										
				<button className="btn" type="submit"></button>}				
				
			</div>
		</nav>
	);
};

export default Navbar;