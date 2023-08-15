const Student = require("../models/studentSchema");
const Lor = require("../models/lorSchema");
const User = require("../models/userSchema");
exports.updateInfo = async (req, res) => {
	const role = req.user.userType;
	if (role === "student") {
		try {
			const userId = req.user._id;
			console.log(req.body);
			const { registrationNumber, yearOfPassing, greScore } = req.body;
			const file = req.files;
			console.log(file);
			// const student = Student.create({
			// 	userId,
			// 	registrationNumber,
			// 	yearOfPassing,
			// 	greScore,
			// });

			// if (student) {
			// 	await User.findByIdAndUpdate(userId, { isVerified: true });
			// } else {
			// 	return res
			// 		.status(404)
			// 		.json({ error: "cannot perform operation" });
			// }

			res.status(200).json({
				message: "Student updated successfully",
				update: true,
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({ error: err.message });
		}
	} else {
		console.log(req.user);
		return res.status(404).json({ error: "cannot perform operation" });
	}
};

exports.createLor = async (req, res) => {
	const role = req.user.userType;

	if (role === "student") {
		try {
			const facultyId = req.params.facultyID;
			const faculty = await User.findById(facultyId);
			const { studentRequest } = req.body;

			const lor = await Lor.create({
				facultyName: faculty.name,
				studentName: req.user.name,
				studentId: req.user._id,
				facultyId,
				studentRequest,
			});

			if (!lor) {
				return res.status(404).json({ error: "Something went wrong" });
			}

			res.status(200).json({ message: "LOR created successfully" });
		} catch (err) {
			res.status(500).json({ error: err.message });
			console.log(err);
		}
	} else {
		return res.status(404).json({ error: "cannot perform operation" });
	}
};

exports.getStudent = async (req, res) => {
	try {
		const studentId = req.params.studentId;
		const student = await Student.findOne({ userId: studentId });
		const user = await User.findById(studentId);

		if (!user || !student) {
			return res.status(404).json({ error: "Student not found" });
		}

		res.status(200).json({ student, user });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
