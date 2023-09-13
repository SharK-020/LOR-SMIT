/* eslint-disable react/prop-types */
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const initialValues = {
	facultyApproval: false,
	hodApproval: false,
	facultyMessage: "",
};
const validationSchema = Yup.object().shape({
	facultyMessage: Yup.string().required("Message is required"),
	hodApproval: Yup.boolean().required("Approval is required"),
	facultyApproval: Yup.boolean().required("Approval is required"),
});

const Form = ({ visible, onClose, lorId }) => {
	const navigate = useNavigate();
	const token = useSelector((state) => state.token);
	const { values, handleBlur, handleChange, handleSubmit, isSubmitting } =
		useFormik({
			initialValues: initialValues,
			validationSchema: validationSchema,
			onSubmit: async (values, action) => {
				try {
					await fetch(
						`http://localhost:3001/faculty/response/${lorId}`,
						{
							method: "PATCH",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${token}`,
							},
							body: JSON.stringify(values),
						}
					);
					action.setSubmitting(true);
					action.resetForm();
					alert("Declined");
					onClose();
					navigate("/fasdfasdf");
				} catch (err) {
					alert("Something Went wrong");
				}
			},
		});
	if (!visible) {
		return null;
	}
	const handleOnClose = (e) => {
		if (e.target.id === "container") {
			onClose();
		}
	};

	return (
		<div
			id="container"
			onClick={handleOnClose}
			className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center bg-gray-600 ">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col bg-white h-[30%] rounded-lg justify-evenly">
				<label htmlFor="facultyMessage"></label>
				<input
					type="text"
					name="facultyMessage"
					id="facultyMessage"
					value={values.facultyMessage}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Remarks"
					className="border-2 border-black rounded-lg p-2 m-2"
				/>
				<button
					type="submit"
					disabled={isSubmitting}
					className=" p-2 border-black  bg-orange-500 hover:bg-orange-600 text-gray-800duration-200 rounded-lg w-1/3 mx-auto">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Form;
