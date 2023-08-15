/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Index = ({ name, status, type, student, id }) => {
	const navigate = useNavigate();
	const token = useSelector((state) => state.token);
	let content;
	let fshow = true;

	if (status === "Declined" || status === "Faculty Approved") {
		fshow = false;
	}

	const getInfo = () => {
		console.log("get info");
	};
	const approve = async () => {
		try {
			const res = await fetch(
				`http://localhost:3001/faculty/response/${id}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						facultyApproval: true,
					}),
				}
			);
			const data = await res.json();
			console.log(data);
			navigate("/asdfasdfasdf");
		} catch (err) {
			console.log(err);
		}
	};

	const decline = () => {
		console.log("decline");
	};
	if (type === "faculty") {
		content = (
			<div>
				<div className="flex justify-between">
					<h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
						{name}
					</h5>
					<button
						onClick={getInfo}
						className="text-white  bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center">
						Get Info
					</button>
				</div>

				<p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
					{status}
				</p>

				<p className="font-thin text-gray-700 mb-3 dark:text-gray-400">
					<span className="font-bold">Student Request: </span>
					{student}
				</p>

				<div
					className={`flex justify-between ${fshow ? "" : "hidden"}`}>
					<button
						onClick={approve}
						className="text-white  bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center">
						Approve
					</button>
					<button
						onClick={decline}
						className="text-white  bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  ">
						Decline
					</button>
				</div>
			</div>
		);
	} else {
		content = <div className="p-5"></div>;
	}

	return (
		<div className="mx-auto w-[100%]">
			<div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
				<div className="p-5">{content}</div>
			</div>
		</div>
	);
};

export default Index;
