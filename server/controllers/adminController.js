const User = require("../models/userSchema");

exports.createFaculty = async (req, res) => {
	const role = req.user.userType;
	if (role === "admin") {
		try {
			const {
				name,
				email,
				password,
				userType,
				department,
				passwordConfirm,
			} = req.body;

			console.log(req.body);
			const user = await User.create({
				name,
				email,
				password,
				department,
				userType,
				passwordConfirm,
			});
			if (!user) {
				return res.status(404).json({ error: "Something went wrong" });
			}
			res.status(200).json({ message: "Faculty created successfully" });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	} else {
		return res.status(404).json({ error: "cannot perform operation" });
	}
};
