import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./containers/homePage";
import LoginPage from "./containers/loginPage";
import SignupPage from "./containers/signupPage";
import ProfilePage from "./containers/profilePage";
import { useSelector } from "react-redux";

function App() {
	const user = useSelector((state) => state.user);
	let routes;
	console.log(user);

	if (user) {
		routes = (
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/" element={<HomePage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		);
	} else {
		routes = (
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
		);
	}
	return <BrowserRouter>{routes}</BrowserRouter>;
}

export default App;
