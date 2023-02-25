import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
// import { useAuth } from '../contexts/AuthContext';
let API_URL = '/api/login';

function Login({ isAuthenticated, setIsAuthenticated }) {
	const [username, setusername] = useState({ username: '', dirty: false });
	const [password, setpassword] = useState({ password: '', dirty: false });

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:5000/login', {
				employeeID: username.username,
				password: password.password,
			})
			.then((res) => {
				console.log(res);
				//? if user is authenticated, set global state isAuthenticated to true
				if (res.data.employeeID) {
					setIsAuthenticated(true);
					navigate('/dashboard');
					alert('Logged in successfully');
				} else {
					alert('Login failed');
				}
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
		navigate('/dashboard');
		setIsAuthenticated(true);
		console.log('username :', username, 'password :', password);
	};

	return (
		<div className="formcard">
			<h1>Login Form</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="formBasicUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control
						onChange={(e) => {
							setusername({ username: e.target.value, dirty: true });
							console.log(username);
						}}
						type="username"
						placeholder="Enter username"
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						onChange={(e) => {
							setpassword({ password: e.target.value, dirty: true });
							console.log(password);
						}}
						type="password"
						placeholder="Password"
					/>
				</Form.Group>

				{/* <Alert variant="danger">Wrong username or password entered.</Alert> */}

				<Button variant="primary" type="submit">
					Login
				</Button>
			</Form>
		</div>
	);
}

export default Login;
