const Lor = require("../models/lorSchema");
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

				return res.status(200).json({ message: "LOR Declined" });
			}
			const studentId = lor.studentId;
			const student = await User.findById(studentId);
			const dept = student.department;
			const hod = await User.findOne({
				department: dept,
				userType: "hod",
			});

			if (hod) {
				console.log(hod);

				lor = await Lor.findByIdAndUpdate(lorId, {
					hodId: hod._id,
					facultyApproval,
					status: "Faculty Approved",
				});

				console.log(lor);
				res.status(200).json({ message: "LOR Approved" });
			} else {
				return res.status(404).json({ error: "HOD not found" });
			}
		} else {
			return res.status(404).json({ error: "Cannot perform operation" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const hodResponse = async (req, res) => {
	try {
		const lorId = req.params.lorId;
		const hodId = req.user._id;

		const { hodApproval, hodMessage } = req.body;

		let lor = await Lor.findById(lorId);

		if (String(hodId) === String(lor.hodId)) {
			if (!hodApproval) {
				lor = await Lor.findByIdAndUpdate(lorId, {
					hodApproval,
					facultyMessage,
					status: "Declined",
				});

				return res.status(200).json({ message: "LOR Declined" });
			}
			lor = await Lor.findByIdAndUpdate(lorId, {
				hodApproval,
				status: "Approved",
			});
			res.status(200).json({ message: "LOR Approved" });
		} else {
			return res.status(404).json({ error: "cannot perform operation" });
		}
	} catch (err) {
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
