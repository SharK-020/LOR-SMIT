import { Link } from "react-router-dom";
import { setLogout } from "../../state";
import { useDispatch } from "react-redux";
const DesktopNav = () => {
	const dispatch = useDispatch();
	const logout = () => {
		dispatch(setLogout());
	};
	return (
		<div className="flex justify-between">
			<div className="flex justify-between text-base  w-1/4">
				<Link to="/">Home</Link>
				<Link to="/profile">Profile</Link>
				<Link to="/request">Request LOR</Link>
				<Link to="/create" className="hidden">
					Create Account
				</Link>
			</div>
			<div className="font-bold font-sans w-1/4 text-center text-xl">
				LOR SMIT
			</div>

			<div className="w-1/4 text-right flex justify-end text-base">
				<div
					className="  rounded-lg w-1/3 text-center bg-orange-600 hover:bg-orange-400 duration-200"
					onClick={logout}>
					Logout
				</div>
			</div>
		</div>
	);
};

export default DesktopNav;
