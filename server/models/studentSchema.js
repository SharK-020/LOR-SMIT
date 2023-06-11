const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	registrationNumber: {
		type: String,
		required: true,
		unique: true,
	},
	yearOfPassing: {
		type: Number,
		required: true,
	},
	greScore: {
		type: Number,
		required: true,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
