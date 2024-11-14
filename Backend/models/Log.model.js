import { Schema, model } from "mongoose";

const logSchema = new Schema({
	access_time: String,
	access_date: String,
	employee_name: String,
	algo_status: String,
});

export default model("Log", logSchema);
