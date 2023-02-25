import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';


function Header() {
	const headerItems = ['Login'];

	//? use navigate to handle routing
	let navigate = useNavigate();

	const handleClick = (route) => {
		navigate(route);
	};

	return (
		<div>
			<Navbar bg="light" expand="lg">
				<Container>
					<Navbar.Brand
						className="cursorpointer"
						onClick={() => {
							handleClick('');
						}}
					>
						Insurance Claims Portal
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							{
								//? map out header items to generate out clickable links
							}
							{headerItems.map((element, index) => {
								return (
									<Nav.Link
										key={index}
										onClick={() => handleClick(element.toLowerCase())}
									>
										{element}
									</Nav.Link>
								);
							})}
							<NavDropdown title="Dropdown" id="basic-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">
									dropdown item1
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">
									dropdown item2
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">
									dropdown item3
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">
									separated dropdown item4
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}

export default Header;
