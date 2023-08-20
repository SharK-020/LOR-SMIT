import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../state";

const Index = () => {
	const dispatch = useDispatch();

	const token = useSelector((state) => state.token);
	const [file, setFile] = useState(null);
	const [registrationNumber, setRegistrationNumber] = useState(null);
	const [greScore, setGreScore] = useState(null);
	const [yearOfPassing, setYearOfPassing] = useState(null);

	const upload = (e) => {
		console.log(e);
		setFile(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("registrationNumber", registrationNumber);
			formData.append("greScore", greScore);
			formData.append("yearOfPassing", yearOfPassing);

			await fetch("http://localhost:3001/student/updateInfo", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			});

			alert("You will be logged out for verification");
			dispatch(setLogout());
		} catch (err) {
			alert("Something Went wrong");
		}
	};

	return (
		<div>
			<Navbar />
			<div className="flex justify-center items-center h-screen bg-orange-100 dark:bg-white">
				<div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
					<div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
						Account Verification
					</div>
					<div className="mt-8">
						<form onSubmit={handleSubmit}>
							<div className="flex flex-col mb-2">
								<div className="flex relative ">
									<input
										type="number"
										id="registrationNumber"
										name="registrationNumber"
										onChange={(e) =>
											setRegistrationNumber(
												e.target.value
											)
										}
										className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
										placeholder="Your Registration Number"
									/>
								</div>
							</div>
							<div className="flex flex-col mb-2">
								<div className="flex relative ">
									<input
										type="number"
										id="greScore"
										name="greScore"
										onChange={(e) =>
											setGreScore(e.target.value)
										}
										className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
										placeholder="GRE Score"
									/>
								</div>
							</div>
							<div className="flex flex-col mb-2">
								<label
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									htmlFor="proof">
									Year of Passing
								</label>
								<input
									className="block  rounded-r-lg border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
									id="yearOfPassing"
									name="yearOfPassing"
									onChange={(e) =>
										setYearOfPassing(e.target.value)
									}
									type="date"
								/>
							</div>

							<div className="flex flex-col mb-2">
								<label
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									htmlFor="proof">
									SMIT Marksheet
								</label>
								<input
									className="block  rounded-r-lg border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
									id="proof"
									name="file"
									type="file"
									onChange={upload}
								/>
							</div>

							<div className="flex w-full">
								<button
									type="submit"
									className="py-2 px-4  bg-orange-500 hover:bg-orange-600 focus:ring-orange-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Index;
