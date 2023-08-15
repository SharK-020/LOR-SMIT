import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./containers/homePage";
import LoginPage from "./containers/loginPage";
import SignupPage from "./containers/signupPage";
import ProfilePage from "./containers/profilePage";
import VerifyPage from "./containers/verifyPage";
import RequestPage from "./containers/requestPage";
import { setTheme } from "./state";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	let routes;
	useEffect(() => {
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			dispatch(setTheme("dark"));
		} else {
			dispatch(setTheme("light"));
		}
	}, [dispatch]);

	if (user) {
		if (!user.isVerified) {
			routes = (
				<Routes>
					<Route path="/verify" element={<VerifyPage />} />{" "}
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route path="*" element={<Navigate to="/verify" />} />
				</Routes>
			);
		} else {
			if (user.userType === "admin") {
				routes = (
					<Routes>
						<Route
							path="/"
							element={<HomePage userType={user.userType} />}
						/>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				);
			} else if (user.userType === "hod") {
				routes = (
					<Routes>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				);
			} else if (user.userType === "faculty") {
				routes = (
					<Routes>
						<Route
							path="/"
							element={<HomePage userType={user.userType} />}
						/>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				);
			} else {
				routes = (
					<Routes>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route
							path="/"
							element={<HomePage userType={user.userType} />}
						/>
						<Route path="/Lor" element={<RequestPage />} />
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				);
			}
		}
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
