const Lor = require("../models/lorSchema");
const Student = require("../models/studentSchema");
const sendEmail = require("../utilities/Email");
const User = require("../models/userSchema");
const { compare } = require("../utils");

const facultyResponse = async (req, res) => {
	try {
		const lorId = req.params.lorId;
		const facultyId = req.user._id;

		const { facultyApproval, facultyMessage } = req.body;

		let lor = await Lor.findById(lorId);
		if (String(facultyId) === String(lor.facultyId)) {
			if (!facultyApproval) {
				lor = await Lor.findByIdAndUpdate(lorId, {
					facultyApproval,
					facultyMessage,
					status: "Declined",
				});
				const studentId = lor.studentId;
				const student = await Student.findById(studentId);
				const userId = student.userId;
				const user = await User.findById(userId);
				const mailOptions = {
					from: "resourcemsg@outlook.com",
					to: user.email,
					subject: "LOR declined by faculty",
					text: "LOR Declined by faculty",
				};
				await sendEmail(mailOptions);
				return res.status(200).json({ message: "LOR Declined" });
			}
			const studentId = lor.studentId;
			const student = await User.findById(studentId);
			const userId = student.userId;
			const user = await User.findById(userId);

			const dept = student.department;
			const hod = await User.findOne({
				department: dept,
				userType: "hod",
			});

			const email = user.email;

			if (hod) {
				console.log(hod);

				lor = await Lor.findByIdAndUpdate(lorId, {
					hodId: hod._id,
					facultyApproval,
					status: "Faculty Approved",
				});
				const mailOptions = {
					from: "resourcemsg@outlook.com",
					to: email,
					subject: "LOR approved by faculty",
					text: "LOR approved by faculty",
				};
				await sendEmail(mailOptions);
				console.log(lor);
				res.status(200).json({ message: "LOR Approved" });
			} else {
				return res.status(404).json({ error: "HOD not found" });
			}
		} else {
			return res.status(404).json({ error: "Cannot perform operation" });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err.message });
	}
};

const hodResponse = async (req, res) => {
	try {
		const lorId = req.params.lorId;
		const hodId = req.user._id;

		const { hodApproval, facultyMessage } = req.body;

		let lor = await Lor.findById(lorId);

		if (String(hodId) === String(lor.hodId)) {
			if (!hodApproval) {
				lor = await Lor.findByIdAndUpdate(lorId, {
					hodApproval,
					facultyMessage,
					status: "Declined",
				});
				const studentId = lor.studentId;
				const student = await Student.findById(studentId);
				const userId = student.userId;
				const user = await User.findById(userId);
				const mailOptions = {
					from: "resourcemsg@outlook.com",
					to: user.email,
					subject: "LOR declined by HOD",
					text: "LOR Declined by HOD",
				};
				await sendEmail(mailOptions);
				return res.status(200).json({ message: "LOR Declined" });
			}
			lor = await Lor.findByIdAndUpdate(lorId, {
				hodApproval,
				facultyMessage,
				status: "Approved",
			});
			const studentId = lor.studentId;
			const student = await Student.findById(studentId);
			const userId = student.userId;
			const user = await User.findById(userId);
			const mailOptions = {
				from: "resourcemsg@outlook.com",
				to: user.email,
				subject: "LOR approved by HOD",
				text: "LOR approved by HOD",
			};
			await sendEmail(mailOptions);
			res.status(200).json({ message: "LOR Approved" });
		} else {
			return res.status(404).json({ error: "cannot perform operation" });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err.message });
	}
};

exports.response = async (req, res) => {
	if (req.user.userType === "faculty") {
		facultyResponse(req, res);
	} else if (req.user.userType === "hod") {
		hodResponse(req, res);
	} else {
		return res.status(404).json({ error: "cannot perform operation" });
	}
};

exports.findFacultyByDepartment = async (req, res) => {
	try {
		const department = req.params.department;

		const faculty = await User.find({ department, userType: "faculty" });

		if (!faculty) {
			return res.status(404).json({ error: "No faculty found" });
		}

		faculty.sort(compare);

		res.status(200).json({ faculty });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
exports.findFaculty = async (req, res) => {
	try {
		const faculty = await User.find({ userType: "faculty" });

		if (!faculty) {
			return res.status(404).json({ error: "No faculty found" });
		}
		faculty.sort(compare);
		res.status(200).json({ faculty: faculty });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
