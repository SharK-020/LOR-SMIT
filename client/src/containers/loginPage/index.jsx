import { useFormik } from "formik";
import { validationSchema, initialValues } from "./utils.jsx";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { useNavigate } from "react-router-dom";

const Index = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
		useFormik({
			initialValues: initialValues,
			validationSchema: validationSchema,
			onSubmit: async (values, action) => {
				try {
					console.log(values);
					const response = await fetch(
						"http://localhost:3001/auth/login",
						{
							method: "POST",
							headers: { "content-type": "application/json" },
							body: JSON.stringify(values),
						}
					);

					const data = await response.json();
					console.log(data);
					action.resetForm();
					if (data.error) {
						alert("Invalid Credentials");
					} else {
						dispatch(
							setLogin({
								user: data.userObj,
								token: data.token,
							})
						);
						navigate("/");
					}
				} catch (err) {
					alert("Invalid Credentials");
				}
			},
		});

	return (
		<div className="bg-orange-100 h-screen flex justify-center px-4">
			<form
				onSubmit={handleSubmit}
				className="w-full  md:w-[30%] lg:w-[45%] xl:w-[33%] bg-white flex-col  h-[40%]   xl:h-[45%] my-auto rounded-4xl shadow-lg ">
				<div className="flex-col min-h-full">
					<div className="text-center text-3xl font-semibold p-4">
						Login
					</div>
					<div className="p-4 w-[90%] mx-auto flex-col min-h-[70%] text-xl ">
						<div className="w-[100%] flex justify-between">
							<label htmlFor="email" className="w-1/3">
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
								className="  border w-2/3"
							/>
						</div>
						{errors.email && touched.email ? (
							<p className="text-xs text-red-500 mt-1 ">
								{errors.email}
							</p>
						) : null}

						<div className="w-[100%] flex justify-between my-4">
							<label htmlFor="password" className="w-1/3">
								Password
							</label>
							<input
								type="password"
								autoComplete="off"
								id="password"
								name="password"
								value={values.password}
								onChange={handleChange}
								onBlur={handleBlur}
								className=" border w-2/3"
							/>
						</div>
						{errors.password && touched.password ? (
							<p className="text-xs text-red-500 mt-1 ">
								{errors.password}
							</p>
						) : null}
						<div className="w-full mt-4 flex justify-center">
							<button
								type="submit"
								className={`
								h-8 w-1/3 rounded-lg text-center ${
									(errors.email && touched.email) ||
									(errors.password && touched.password)
										? "bg-orange-400"
										: "bg-orange-600 hover:bg-orange-400 duration-200"
								}`}>
								Login
							</button>
						</div>
						<p
							className="text-center m-3 hover:cursor-pointer hover:text-orange-600 duration-300"
							onClick={() => {
								navigate("/signup");
							}}>
							Create an Account
						</p>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Index;
