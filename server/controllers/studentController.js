const Student = require("../models/studentSchema");
const Lor = require("../models/lorSchema");
const User = require("../models/userSchema");
const path = require("path");
exports.updateInfo = async (req, res) => {
	const role = req.user.userType;
	if (role === "student") {
		try {
			const userId = req.user._id;
			const { registrationNumber, yearOfPassing, greScore } = req.body;
			const file = req.files;
			const proof = `assets/students/${file.file.name}`;
			const filePath = path.join(__dirname, `../${proof}`);
			file.file.mv(filePath, (err) => {
				if (err) {
					return res.status(500).json({ error: err.message });
				}
			});
			const student = Student.create({
				userId,
				registrationNumber,
				yearOfPassing,
				greScore,
				proof,
			});
			if (student) {
				const user = await User.findByIdAndUpdate(userId, {
					isVerified: true,
				});
				return res.status(200).json({
					user,
					message: "Student updated successfully",
					update: true,
				});
			} else {
				return res
					.status(404)
					.json({ error: "cannot perform operation" });
			}
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

		console.log(studentId);

		if (!user || !student) {
			return res.status(404).json({ error: "Student not found" });
		}

		res.status(200).json({ student, user });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

