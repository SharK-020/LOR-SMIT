const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// Register

exports.register = async (req, res, next) => {
	try {
		const { name, userType, department, email, password, passwordConfirm } =
			req.body;
		await User.create({
			name,
			userType,
			department,
			email,
			password,
			passwordConfirm,
		});
		res.status(201).json({ message: "User created successfully" });
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ error: err.message });
	}
};

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const isMatch = await user.correctPassword(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ error: "Invalid Credentials" });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		let userObj = user.toObject();
		delete userObj.password;

		res.status(200).json({ token, userObj });
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ error: err.message });
	}
};
