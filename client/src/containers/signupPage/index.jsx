import { useFormik } from "formik";
import { validationSchema, initialValues } from "./utils.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Index = () => {
	const navigate = useNavigate();

	const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
		useFormik({
			initialValues,
			validationSchema,
			onSubmit: async (values, action) => {
				try {
					console.log(values);
					const response = await fetch(
						"http://localhost:3001/auth/register",
						{
							method: "POST",
							headers: { "content-type": "application/json" },
							body: JSON.stringify(values),
						}
					);

					const data = await response.json();
					console.log(data);
					action.resetForm();
					if (data.error == "User already exists") {
						alert(data.error);
					} else if (data.error) {
						console.log(data.error);
						alert("Something went wrong");
					} else {
						alert(data.message);
						navigate("/login");
					}
				} catch (err) {
					alert("Something went wrong");
				}
			},
		});
	return (
		<div className="flex justify-center items-center h-screen bg-orange-100">
			<div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
				<div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
					Register Your Account
				</div>
				<div className="mt-8">
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col mb-2">
							<div className="flex relative ">
								<span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="15"
										height="15"
										viewBox="0 0 24 24"
										fill="none"
										stroke="#9b9b9b"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round">
										<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
										<circle cx="12" cy="7" r="4"></circle>
									</svg>
								</span>
								<input
									type="text"
									id="name"
									value={values.name}
									onChange={handleChange}
									onBlur={handleBlur}
									className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
									placeholder="Your Name"
								/>
							</div>
							{errors.name && touched.name ? (
								<span className="text-xs text-red-600 dark:text-teal-300 font-thin">
									{errors.name}
								</span>
							) : null}
						</div>
						<div className="flex flex-col mb-2">
							<div className="flex relative ">
								<span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
									<svg
										width="15"
										height="15"
										fill="currentColor"
										viewBox="0 0 1792 1792"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
									</svg>
								</span>
								<input
									type="text"
									id="email"
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
									placeholder="Your email"
								/>
							</div>
							{errors.email && touched.email ? (
								<span className="text-xs text-red-600 dark:text-teal-300 font-thin">
									{errors.email}
								</span>
							) : null}
						</div>
						<div className="flex flex-col mb-2">
							<div className="flex relative ">
								<span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="15"
										height="15"
										viewBox="0 0 24 24"
										fill="none"
										stroke="#636161"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round">
										<path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5" />
										<path d="M5.5 5.1L2 12v6c0 1.1.9 2 2 2h16a2 2 0 002-2v-6l-3.4-6.9A2 2 0 0016.8 4H7.2a2 2 0 00-1.8 1.1z" />
									</svg>
								</span>
								<select
									id="department"
									className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.department}>
									<option value="" disabled>
										Department
									</option>
									<option value="CSE">CSE</option>
									<option value="ECE">ECE</option>
									<option value="EEE">EEE</option>
									<option value="MECH">MECH</option>
									<option value="CIVIL">CIVIL</option>
									<option value="CHEM">CHEM</option>
									<option value="IT">IT</option>
								</select>
							</div>
							{errors.department && touched.department ? (
								<span className="text-xs text-red-600 dark:text-teal-300 font-thin">
									{errors.department}
								</span>
							) : null}
						</div>

						<div className="flex flex-col mb-2">
							<div className="flex relative ">
								<span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
									<svg
										width="15"
										height="15"
										fill="currentColor"
										viewBox="0 0 1792 1792"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
									</svg>
								</span>
								<input
									type="password"
									id="password"
									value={values.password}
									onChange={handleChange}
									className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
									placeholder="Your password"
								/>
							</div>
							{errors.password && touched.password ? (
								<span className="text-xs text-red-600 dark:text-teal-300 font-thin">
									{errors.password}
								</span>
							) : null}
						</div>
						<div className="flex flex-col mb-6">
							<div className="flex relative ">
								<span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
									<svg
										width="15"
										height="15"
										fill="currentColor"
										viewBox="0 0 1792 1792"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
									</svg>
								</span>
								<input
									type="password"
									id="passwordConfirm"
									value={values.passwordConfirm}
									onChange={handleChange}
									className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
									placeholder="Confirm password"
								/>
							</div>
							{errors.passwordConfirm &&
							touched.passwordConfirm ? (
								<span className="text-xs text-red-600 dark:text-teal-300 font-thin">
									{errors.passwordConfirm}
								</span>
							) : null}
						</div>

						<div className="flex w-full">
							<button
								type="submit"
								className="py-2 px-4  bg-orange-500 hover:bg-orange-600 focus:ring-orange-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
								Sign up
							</button>
						</div>
					</form>
				</div>
				<div className="flex items-center justify-center mt-6">
					<Link
						to="/login"
						className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white hover:font-semibold ">
						<span className="ml-2">Already have an account?</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Index;
