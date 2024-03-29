const mongoose = require("mongoose");

const lorSchema = new mongoose.Schema(
	{
		studentName: {
			type: String,
			required: true,
		},
		facultyName: {
			type: String,
			required: true,
		},
		studentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Student",
			required: true,
		},

		registrationNumber: {
			type: Number,
			required: true,
		},

		facultyId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		hodId: {
			type: mongoose.Schema.Types.ObjectId,
			default: null,
			ref: "User",
		},
		department: {
			enum: ["IT"],
			type: String,
			required: true,
		},
		studentRequest: {
			type: String,
			required: true,
		},
		facultyApproval: {
			type: Boolean,
		},
		hodApproval: {
			type: Boolean,
		},
		facultyMessage: {
			type: String,
		},
		status: {
			type: String,
			enum: ["Faculty Approved", "Approved", "Declined", "Initiated"],
			default: "Initiated",
		},
	},
	{ timestamps: true }
);

const Lor = mongoose.model("Lor", lorSchema);

module.exports = Lor;
