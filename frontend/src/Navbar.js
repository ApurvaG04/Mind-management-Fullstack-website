import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './App.css';
import {useNavigate} from "react-router-dom";

const Navigation = (props) => {

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
				sessionStorage.removeItem("email");
                alert("Successfully Logout");
                navigate('/');
				window.location.reload(false);
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
		<Navbar expand="lg" className="bg-dark" data-bs-theme="dark">
			<Container>
				<Navbar.Brand href="/">Mind Fitness</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
				<Nav variant="underline" className="me-auto">
					<Nav.Link href="/">Home</Nav.Link>
					<Nav.Link href="/readings">Readings</Nav.Link>
					<NavDropdown title="Services" id="basic-nav-dropdown">
					<NavDropdown.Item href="/journal">Journal</NavDropdown.Item>
					<NavDropdown.Item href="/affirmations">Affirmation</NavDropdown.Item>
					<NavDropdown.Item href="/meditation">Meditation</NavDropdown.Item>
					{/* <NavDropdown.Divider /> */}
					{/* <NavDropdown.Item href="#action/3.4">
						Separated link
					</NavDropdown.Item> */}
					</NavDropdown>
				</Nav>
				<Nav variant="underline">
					{(userEmail && userEmail!=="" && userEmail!==undefined)?
					<>
					 <button className="btn btn-danger" type="submit" onClick={logoutClick}>Logout</button>
					 <h5 className="nav-item text-white">Welcome <strong>{userName}</strong>!!</h5>
					 </> : <>
					 <Nav.Link href="/login">Login</Nav.Link>
					<Nav.Link eventKey={2} href="/signup">Signup</Nav.Link>
					</>}
				</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
				// <div class="d-grid gap-2 d-md-flex justify-content-md-end">
				// 	{(userEmail && userEmail!=="" && userEmail!==undefined)?			
				// 	<>
				// 	<button className="btn btn-danger" type="submit" onClick={logoutClick}>Logout</button>
				// 	<h5 className="nav-item">Welcome <strong>{userName}</strong>!!</h5>
				// 	</>
				// 	:										
				// 	<a href="/login" class="btn btn-primary me-md-2" role="button">Login</a>}
  				// 	<button class="btn btn-primary" type="button">Signup</button>
				// </div>
	);
};

export default Navigation;