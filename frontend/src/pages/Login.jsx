import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

function Login() {
	const [email, setemail] = useState({ email: '', dirty: false });
	const [password, setpassword] = useState({ password: '', dirty: false });

	// const auth = useAuth();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		// 	auth.Login(email, password).then(
		// 		() => {
		// 			navigate('/');
		// 		},
		// 		(err) => {
		// 			console.log(err);
		// 		}
		// 	);
	};

	return (
		<div className="formcard">
			<h1>Login Form</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						onChange={(e) => {
							setemail({ email: e.target.value, dirty: true });
							console.log(email);
						}}
						type="email"
						placeholder="Enter email"
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

				<Button variant="primary" type="submit">
					Login
				</Button>
			</Form>
		</div>
	);
}

export default Login;
