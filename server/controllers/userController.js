const Lor = require("../models/lorSchema");

exports.getLor = async (req, res) => {
	try {
		const userId = req.user._id;
		let lor;
		if (req.user.userType === "student") {
			lor = await Lor.find({ studentId: userId });
		} else if (req.user.userType === "faculty") {
			lor = await Lor.find({ facultyId: userId });
		}
		if (!lor) {
			return res.status(404).json([]);
		}

		res.status(200).json(lor);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
exports.getLorByStatus = async (req, res) => {
	try {
		const userId = req.params.userId;
		let lor;
		if (req.user.userType === "student") {
			lor = await Lor.find({
				studentId: userId,
				status: req.body.status,
			});
		} else if (req.user.userType === "faculty") {
			lor = await Lor.find({
				facultyId: userId,
				status: req.body.status,
			});
		}
		if (!lor) {
			return res.status(404).json([]);
		}

		res.status(200).json(lor);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
