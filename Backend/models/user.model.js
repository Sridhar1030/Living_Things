import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Schema definition
const userShema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			index: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			trim: true,
			lowercase: true,
			index: true,
		},
		fullName: {
			type: String,
			required: true,
			trim: true,
			index: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		refreshToken: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

// Pre-save hook for hashing password
userShema.pre("save", function (next) {
	if (!this.isModified("password")) return next();
	this.password = bcrypt.hashSync(this.password, 10);
	next();
});

// Password comparison method
userShema.methods.checkPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

// Access token generation method
userShema.methods.generateAccessToken = function () {
	console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);

	if (!process.env.ACCESS_TOKEN_SECRET) {
		throw new Error(
			"ACCESS_TOKEN_SECRET is not defined in environment variables"
		);
	}

	return jwt.sign(
		{
			id: this._id,
			username: this.username,
			email: this.email,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		}
	);
};

// Refresh token generation method
userShema.methods.generateRefreshToken = function () {
	console.log("REFRESH_TOKEN_SECRET:", process.env.REFRESH_TOKEN_SECRET);

	if (!process.env.REFRESH_TOKEN_SECRET) {
		throw new Error(
			"REFRESH_TOKEN_SECRET is not defined in environment variables"
		);
	}

	return jwt.sign(
		{
			id: this._id,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
		}
	);
};

// Export the model
export const User = mongoose.model("User", userShema);
