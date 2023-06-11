const Student = require("../models/studentSchema");

exports.isVerified = async (req, res, next) => {
	try {
		const sid = req.user._id;
		const student = await Student.findOne({ userId: sid });
		if (!student) {
			return res.status(404).json({ error: "Student not found" });
		}

		if (!student.isVerified) {
			return res.status(401).json({ error: "Student not verified" });
		}

		next();
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
