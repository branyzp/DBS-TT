import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import DashboardPage from './components/DashboardPage';
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userDetails, setUserDetails] = useState(null);

	return (
		<BrowserRouter>
			<Navbar
				isAuthenticated={isAuthenticated}
				setIsAuthenticated={setIsAuthenticated}
				setUserDetails={setUserDetails}
			/>
			<Routes>
				<Route
					path="/"
					element={
						<Login
							isAuthenticated={isAuthenticated}
							setIsAuthenticated={setIsAuthenticated}
						/>
					}
				/>
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
