const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utilities/Email");
const Student = require("../models/studentSchema");
require("dotenv").config();

exports.register = async (req, res) => {
	try {
		const { name, department, email, password, passwordConfirm } = req.body;
		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ error: "User already exists" });
		}
		const confirmationCode = jwt.sign({ email }, process.env.JWT_SECRET);
		await User.create({
			name,
			department,
			email,
			password,
			confirmationCode,
			passwordConfirm,
		});
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ error: err.message });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		if (user.isVerified === false && user.userType === "student") {
			return res.status(404).json({ error: "User not verified" });
		}

		const isMatch = await user.correctPassword(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ error: "Invalid Credentials" });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});
		let userObj = user.toObject();
		delete userObj.password;

		if (userObj.userType === "student") {
			const student = await Student.findOne({ userId: userObj._id });

			if (student) {
				userObj.isVerified = true;
			} else {
				userObj.isVerified = false;
			}
		} else {
			userObj.isVerified = true;
		}

		res.status(200).json({ token, userObj });
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ error: err.message });
	}
};

exports.setStatus = async (req, res) => {
	const code = req.body.code.code;
	console.log(code);
	const email = code + ".com";

	const user = await User.findOneAndUpdate({ email }, { status: "active" });

	if (!user) {
		res.status(404).json({ error: "User not found" });
	} else {
		res.status(200).json({ message: "User verified" });
	}
};
