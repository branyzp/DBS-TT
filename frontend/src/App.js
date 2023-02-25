import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	return (
		<BrowserRouter>
			<Navbar isAuthenticated={isAuthenticated} />
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
				{/* <Route path="/dashboard" element={</>} /> */}
				{/* <Route path="/" element={</>} /> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
