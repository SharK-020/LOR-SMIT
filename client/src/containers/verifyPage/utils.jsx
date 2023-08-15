import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
	registrationNumber: Yup.number().required(
		"Registration Number is required"
	),
	greScore: Yup.number().required("GRE Score is required"),
	yearOfPassing: Yup.date().required("Year of Passing is required"),
	proof: Yup.string().required("Proof is required"),
});
export const initialValues = {
	registrationNumber: "",
	greScore: "",
	yearOfPassing: "",
	proof: "",
};
