import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import DashboardPage from './components/DashboardPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
        
				<Route path="/" element={<DashboardPage />} />
				<Route />
				<Route />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
