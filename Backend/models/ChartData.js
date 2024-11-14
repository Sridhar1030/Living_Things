import mongoose from "mongoose";

const chartDataSchema = new mongoose.Schema({
	total_kwh: Number,
	createdAt: Date,
	algo_status: String,
});

export default mongoose.model("ChartData", chartDataSchema);
