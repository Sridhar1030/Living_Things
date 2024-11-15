import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
	try {
		// Use the MONGO_URI from environment variables
		const mongoURI = process.env.MONGO_URI;
		if (!mongoURI) {
			console.error(
				"MONGO_URI is not defined in the environment variables"
			);
			return;
		}

		await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB connected");
	} catch (error) {
		console.error("MongoDB connection failed:", error.message);
	}
};

export default connectDB;
