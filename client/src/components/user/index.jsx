/* eslint-disable react/prop-types */
import Form from "./Form";
import { useState } from "react";
const Index = (props) => {
	const facultyId = props.userId;
	const [visible, setVisible] = useState(false);
	const handleOnClose = () => {
		setVisible(false);
	};
	return (
		<div className="p-4 bg-white shadow-lg rounded-2xl w-80 dark:bg-gray-800 h-64 mx-auto max-w-full my-8">
			<img
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv4UK-VacVrppny4aGjzhWStSrcsP_6A1UdFvRLCMg&s"
				alt="photo"
				className="rounded-lg w-28 h-28 mx-auto"
			/>

			<div className="flex flex-col">
				<p className="text-xl text-gray-800 dark:text-white mx-auto mt-2 font-medium">
					{props.name}
				</p>
				<p className="text-sm text-gray-400 mx-auto mb-2">
					{props.department}
				</p>
				<button
					type="button"
					onClick={() => setVisible(true)}
					className=" w-1/2 px-4 py-2 text-base text-white bg-indigo-500 border rounded-lg hover:bg-indigo-700 mx-auto">
					Request LOR
				</button>
			</div>

			<Form
				visible={visible}
				onClose={handleOnClose}
				facultyId={facultyId}
			/>
		</div>
	);
};

export default Index;
