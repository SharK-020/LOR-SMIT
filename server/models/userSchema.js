const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter your name"],
	},
	userType: {
		type: String,
		enum: ["faculty", "student", "hod", "admin"],
		default: "student",
		required: true,
	},
	department: {
		type: String,
		enum: [
			"CSE",
			"ECE",
			"EEE",
			"ME",
			"CE",
			"IT",
			"CA",
			"MANAGEMENT",
			"MATHS",
			"PHYSICS",
			"CHEMISTRY",
			"AI&DS",
		],
		required: [true, "Please tell us your department"],
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, "Please provide a valid email"],
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
		minlength: 8,
		select: false,
	},

	passwordConfirm: {
		type: String,
		required: [true, "Please confirm your password"],
		validate: {
			validator: function (el) {
				return el === this.password;
			},
			message: "Passwords are not the same",
		},
	},
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	this.passwordConfirm = undefined;
	next();
});

userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
