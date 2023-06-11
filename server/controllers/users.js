const Student = require("../models/studentSchema");
const User = require("../models/userSchema");
const Lor = require("../models/lorSchema");
exports.updateInfo = async (req, res) => {
	const role = req.user.userType;
	if (role === "student") {
		try {
			const userId = req.params.userId;
			const { registrationNumber, yearOfPassing, greScore } = req.body;

			const student = Student.create({
				userId,
				registrationNumber,
				yearOfPassing,
				greScore,
			});

			if (student) {
				await Student.findOneAndUpdate(
					{ userId },
					{ isVerified: true }
				);
			} else {
				return res
					.status(404)
					.json({ error: "cannot perform operation" });
			}

			res.status(200).json({
				message: "Student info updated successfully",
			});
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	} else {
		return res.status(404).json({ error: "cannot perform operation" });
	}
};
exports.createLor = async (req, res) => {
	const role = req.user.userType;

	if (role === "student") {
		try {
			const userId = req.params.userId;
			const { facultyId, studentRequest } = req.body;

			const lor = await Lor.create({
				studentId: userId,
				facultyId,
				studentRequest,
			});

			if (!lor) {
				return res.status(404).json({ error: "Something went wrong" });
			}

			res.status(200).json({ message: "LOR created successfully" });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
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

		res.status(200).json({ faculty });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.getLor = async (req, res) => {
	try {
		const userId = req.params.userId;
		let lor;
		if (req.user.userType === "student") {
			lor = await Lor.find({ studentId: userId });
		} else if (req.user.userType === "faculty") {
			lor = await Lor.find({ facultyId: userId });
		}
		if (!lor) {
			return res.status(404).json({ error: "No LOR found" });
		}

		res.status(200).json({ lor });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
