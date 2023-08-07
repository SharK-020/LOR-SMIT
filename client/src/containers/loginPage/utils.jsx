import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Email is Required"),
	password: Yup.string().required("Password is Required"),
});
export const initialValues = {
	email: "",
	password: "",
};
