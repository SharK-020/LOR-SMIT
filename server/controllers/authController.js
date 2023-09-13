const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utilities/Email");
const Student = require("../models/studentSchema");
require("dotenv").config();
// Register

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
		console.log(email);
		const mailOptions = {
			from: "resourcemsg@outlook.com",
			to: email,
			subject: "Account activation link",
			text: `Hello ${name},\n\nPlease verify your account by clicking the link: \nhttp://localhost:5173/verify/${confirmationCode}\n`,
		};
		sendEmail(mailOptions).then((result) => {
			console.log(result);
			res.status(201).json({
				message:
					"Please click the verification link sent to your email",
			});
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
		if (user.status === "pending" && user.userType === "student") {
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
	const { code } = req.params;
	const user = User.findOneAndUpdate(
		{ confirmationCode: code },
		{ status: "active" }
	);
	if (user) {
		res.status(200).json({ message: "User verified" });
	} else {
		res.status(404).json({ error: "User not found" });
	}
};
