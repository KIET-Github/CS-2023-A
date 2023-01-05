// importing components
import { StrictMode, useContext } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

// importing context
import AuthContext from '../../context/auth';

// importing pages
import Page404 from '../../pages/404/404';
import HomePage from '../../pages/Home/Home';
import LoginPage from '../../pages/Login/Login';
import SignupPage from '../../pages/Signup/Signup';
import DashboardPage from '../../pages/Dashboard/Dashboard';

// App component
export default function App() {
	const authCtx = useContext(AuthContext); // auth context

	return (
		<StrictMode>
			<Router>
				<Routes>
					<Route exact path="/" element={<HomePage />} />
					{authCtx.isLoggedIn ? (
						<Route exact path="/dashboard" element={<DashboardPage />} />
					) : (
						<>
							<Route exact path="/login" element={<LoginPage />} />
							<Route exact path="/signup" element={<SignupPage />} />
						</>
					)}

					{/* not found */}
					<Route exact path="*" element={<Page404 />} />
				</Routes>
			</Router>
		</StrictMode>
	);
}
