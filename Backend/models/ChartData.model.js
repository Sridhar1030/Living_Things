import mongoose from "mongoose";
// Define the schema for chart data
const chartSchema = new mongoose.Schema(
	{
		serialNo: { type: String, required: true },
		clientID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Client",
			required: true,
		},
		deviceMapID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "DeviceMap",
			required: true,
		},
		devices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Device" }],
		total_kwh: { type: Number, required: true },
		ac_run_hrs: { type: Number, required: true },
		ac_fan_hrs: { type: Number, required: true },
		algo_status: { type: Number, required: true },
		billing_ammount: { type: Number, required: true },
		cost_reduction: { type: Number, required: true },
		energy_savings: {
			savings_percent: { type: Number },
			ref_kwh: { type: Number },
			us_meter: { type: Number },
			us_calc: { type: Number },
			inv_factor: { type: Number },
		},
		mitigated_co2: { type: Number },
		weather: {
			max_temp: { type: Number },
			min_temp: { type: Number },
		},
	},
	{ timestamps: true }
);

// Create the model
const ChartData = mongoose.model("ChartData", chartSchema);

//export default not simple

export default ChartData;

