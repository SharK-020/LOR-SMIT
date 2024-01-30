import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./containers/homePage";
import LoginPage from "./containers/loginPage";
import SignupPage from "./containers/signupPage";
import ProfilePage from "./containers/profilePage";
import VerifyPage from "./containers/verifyPage";
import RequestPage from "./containers/requestPage";
import Analytics from "./containers/analyticsPage";
import { setLogout, setTheme } from "./state";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const token = useSelector((state) => state.token);
	let routes;
	useEffect(() => {
		const notExpired = async () => {
			const res = await fetch("http://localhost:3001/auth/checkToken", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await res.json();

			if (data.data === false) {
				dispatch(setLogout());
			}
		};
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			dispatch(setTheme("dark"));
		} else {
			dispatch(setTheme("light"));
		}
		notExpired();
	}, [dispatch, token]);

	if (user) {
		if (!user.isVerified) {
			routes = (
				<Routes>
					<Route path="/verify" element={<VerifyPage />} />
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
						<Route path="/analytics" element={<Analytics />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				);
			} else if (user.userType === "hod") {
				routes = (
					<Routes>
						<Route
							path="/"
							element={<HomePage userType={user.userType} />}
						/>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="/analytics" element={<Analytics />} />
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

				{/* <Route path="/verify/:code" element={<Account />} /> */}

				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
		);
	}
	return <BrowserRouter>{routes}</BrowserRouter>;
}

export default App;
