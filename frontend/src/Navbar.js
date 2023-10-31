import React from "react";
import { Link } from "react-router-dom";
import './App.css';

const Navbar = () => {
	return (
		<nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
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
					<button className="btn btn-primary btn-login">Login</button>
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;