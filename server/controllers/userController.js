const Lor = require("../models/lorSchema");
const User = require("../models/userSchema");
const Student = require("../models/studentSchema");
exports.getLor = async (req, res) => {
	try {
		const userId = req.user._id;
		let lor;
		if (req.user.userType === "student") {
			lor = await Lor.find({ studentId: userId });
		} else if (req.user.userType === "faculty") {
			lor = await Lor.find({ facultyId: userId });
		} else if (req.user.userType === "hod") {
			lor = await Lor.find({ hodId: userId });
		}
		if (!lor) {
			return res.status(404).json([]);
		}

		res.status(200).json(lor);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.getStudent = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		const student = await Student.findOne({ userId });
		if (!student) {
			return res.status(404).json({ error: "Student not found" });
		}

		res.status(200).json({ user, student });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
