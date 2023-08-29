import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	department: Yup.string().required("Department is required"),
	email: Yup.string().email("Invalid Email").required("Email is required"),
    userType: Yup.string().required("User Type is required"),
	password: Yup.string().min(8).required("Password is required"),
	passwordConfirm: Yup.string()
		.min(8)
		.required("Confirm Password is required")
		.oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const initialValues = {
	email: "",
	password: "",
	passwordConfirm: "",
	name: "",
    userType: "",
	department: "",
};
