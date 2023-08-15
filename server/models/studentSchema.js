const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	registrationNumber: {
		type: Number,
		required: true,
		unique: true,
	},
	yearOfPassing: {
		type: Date,
		required: true,
	},
	greScore: {
		type: Number,
		required: true,
	},
	proof: {
		type: String,
		required: true,
	},
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
