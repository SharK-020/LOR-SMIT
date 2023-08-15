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
		<div className="mx-auto max-w-full">
			<div className="p-4 bg-white shadow-lg rounded-2xl w-80 dark:bg-gray-800 ">
				<div className="flex flex-row items-start gap-4">
					<img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv4UK-VacVrppny4aGjzhWStSrcsP_6A1UdFvRLCMg&s"
						alt="photo"
						className="rounded-lg w-28 h-28"
					/>
					<div className="flex flex-col justify-evenly w-full ">
						<div>
							<p className="text-xl font-medium text-gray-800 dark:text-white">
								{props.name}
							</p>
							<p className="text-xs text-gray-400 mb-6">
								{props.department}
							</p>
							<button
								type="button"
								onClick={() => setVisible(true)}
								className=" w-1/2 px-4 py-2 text-base text-white bg-indigo-500 border rounded-lg hover:bg-indigo-700 ">
								Request
							</button>
						</div>
					</div>
				</div>
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
