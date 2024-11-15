import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
	try {
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
