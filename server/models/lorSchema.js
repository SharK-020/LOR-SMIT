const mongoose = require("mongoose");

const lorSchema = new mongoose.Schema(
	{
		studentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Student",
			required: true,
		},
		facultyId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		hodId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
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
			enum: ["Pending", "Approved", "Declined", "Initiated"],
			default: "Initiated",
		},
	},
	{ timestamps: true }
);

const Lor = mongoose.model("Lor", lorSchema);

module.exports = Lor;
