import { Link } from "react-router-dom";
import { setLogout } from "../../state";
import { useDispatch, useSelector } from "react-redux";

const Nav = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const logout = () => {
		dispatch(setLogout());
	};
	return (
		<nav className="flex flex-wrap items-center justify-between  bg-white font-semibold dark:bg-gray-800">
			<div className="w-auto lg:order-2 lg:w-1/5 lg:text-center">
				<Link
					className="text-xl font-bold text-gray-800 dark:text-gray-100 font-heading"
					to="/">
					LOR SMIT
				</Link>
			</div>
			<div className="block lg:hidden">
				<button className="flex items-center px-3 py-2 text-indigo-500 border border-indigo-500 dark:border-gray-100 dark:text-gray-100 rounded navbar-burger">
					<svg
						className="w-3 h-3 fill-current"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
					</svg>
				</button>
			</div>
			{user.userType === "student" ? (
				<div className="hidden w-full navbar-menu lg:order-1 lg:block lg:w-2/5">
					<Link
						className="block mt-4 mr-10 text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-white"
						to="/">
						Home
					</Link>

					{/* <Link
						className="block mt-4 mr-10 text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-white"
						to="/profile">
						Profile
					</Link> */}

					<Link
						className="block mt-4 text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-white"
						to="/Lor">
						Request LOR
					</Link>
				</div>
			) : user.userType === "faculty" ? (
				<div className="hidden w-full navbar-menu lg:order-1 lg:block lg:w-2/5">
					<Link
						className="block mt-4 mr-10 text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-white"
						to="/">
						Home
					</Link>
				</div>
			) : (
				<div className="hidden w-full navbar-menu lg:order-1 lg:block lg:w-2/5">
					<Link
						className="block mt-4 mr-10 text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-white"
						to="/">
						Home
					</Link>
					<Link
						className="block mt-4 mr-10 text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-white"
						to="/analytics">
						Analytics
					</Link>
				</div>
			)}
			<div className="hidden w-full navbar-menu lg:order-3 lg:block lg:w-2/5 lg:text-right">
				<button
					className="block mt-4  lg:inline-block lg:mt-0 bg-orange-500 hover:bg-orange-600 text-gray-800duration-200 py-1 px-2 rounded-lg"
					onClick={logout}>
					Logout
				</button>
			</div>
		</nav>
	);
};

export default Nav;
