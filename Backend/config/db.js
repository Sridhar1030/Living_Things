import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect("mongodb://localhost:27017/analytics", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB connected");
	} catch (error) {
		console.error("MongoDB connection failed:", error.message);
	}
};

export default connectDB;
