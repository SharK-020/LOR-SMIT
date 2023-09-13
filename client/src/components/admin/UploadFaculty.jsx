import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
const UploadFaculty = () => {
	const token = useSelector((state) => state.token);
	const [file, setFile] = useState(null);
	const upload = async (e) => {
		setFile(e.target.files[0]);
	};
	const submit = async () => {
		try {
			const formData = new FormData();

			formData.append("file", file);

			const res = await fetch(
				"http://localhost:3001/admin/create/multiple",
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
					},
					body: formData,
				}
			);

			console.log(res.body);
		} catch (err) {
			console.log(err);
			alert("Something Went wrong");
		}
	};
	return (
		<div
			className="cursor-pointer rounded-[24px] p-[10px] w-[300px] h-[200px]"
			// onClick={toggleModal}
		>
			<div className="max-w-sm rounded-[14px] overflow-hidden h-full">
				<div className="px-10 py-4 h-full flex flex-col items-center bg-[#1F2937] text-white">
					<h1 className="text-xl pb-3 font-bold font-serif">
						Upload Faculty File
					</h1>

					<input
						className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
						id="file_input"
						type="file"
						onChange={upload}
					/>
					<button
						className="bg-orange-500 hover:bg-orange-600 mt-6 p-4 rounded-lg font-semibold"
						onClick={submit}>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default UploadFaculty;
