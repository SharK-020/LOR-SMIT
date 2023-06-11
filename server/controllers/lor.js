const Lor = require("../models/lorSchema");
const User = require("../models/userSchema");

const facultyResponse = async (req, res) => {
	try {
		const lorId = req.params.lorId;
		const facultyId = req.user._id;

		const { facultyApproval, facultyMessage } = req.body;

		let lor = await Lor.findById(lorId);
		console.log(String(facultyId) === String(lor.facultyId));
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
			const hod = await User.find({ department: dept, userType: "hod" });
			console.log(hod, dept, studentId, student);
			lor = await Lor.findByIdAndUpdate(lorId, {
				hodId: hod._id,
				facultyApproval,
				status: "pending",
			});
			res.status(200).json({ message: "LOR Approved" });
		} else {
			return res.status(404).json({ error: "cannot perform operation" });
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
		if (hodId === lor.hodId) {
			if (!facultyApproval) {
				lor = await Lor.findByIdAndUpdate(lorId, {
					hodApproval,
					hodMessage,
					status: "Declined",
				});

				return res.status(200).json({ message: "LOR Declined" });
			}
			lor = await Lor.findByIdAndUpdate(lorId, {
				hodId: hod._id,
				facultyApproval,
				status: "Approved",
			});
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
	} else if (req.user.userType === "HOD") {
		hodResponse(req, res);
	} else {
		return res.status(404).json({ error: "cannot perform operation" });
	}
};
