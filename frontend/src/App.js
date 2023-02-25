import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route />
				<Route />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
