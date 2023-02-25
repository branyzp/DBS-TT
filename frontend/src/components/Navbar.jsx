import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function Header({ isAuthenticated, setIsAuthenticated, setUserDetails }) {
	// const headerItems = ['Dashboard', 'Claims', 'Logout'

	//? use navigate to handle routing
	let navigate = useNavigate();

	const handleClick = (route) => {
		navigate(route);
	};

	const handleLogout = () => {
		navigate('/');
		setIsAuthenticated(false);
		setUserDetails(null);
	};

	return (
		<div>
			<Navbar bg="light" expand="lg">
				<Container>
					<Navbar.Brand>Insurance Claims Portal</Navbar.Brand>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />

					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}

// {
// 	//? map out header items to generate out clickable links
// }
// {
// 	isAuthenticated &&
// 		headerItems.map((element, index) => {
// 			return (
// 				<Nav.Link
// 					key={index}
// 					onClick={() => handleClick(element.toLowerCase())}
// 				>
// 					{element}
// 				</Nav.Link>
// 			);
// 		});
// }

export default Header;
