import ChartData from "../models/ChartData.js";
import fs from "fs/promises";
import path from "path";
import mongoose from 'mongoose';
export const getChartData = async (req, res) => {
	try {
		const { startDate, endDate, algo_status } = req.query;
		const filter = {
			...(startDate && { createdAt: { $gte: new Date(startDate) } }),
			...(endDate && { createdAt: { $lte: new Date(endDate) } }),
			...(algo_status && { algo_status }),
		};
		const data = await ChartData.find(filter);
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};


export const getFilteredChartData = async (req, res) => {
    try {
        const { date, algo_status } = req.query;

        const filter = {
            ...(date && { createdAt: { $gte: new Date(date) } }), // Filter by date
            ...(algo_status && { algo_status: parseInt(algo_status) }) // Filter by algo_status
        };

        const data = await ChartData.find(filter);

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const importChartData = async (req, res) => {
	try {
		// Define the path to your chartData.json file
		const filePath = path.join(process.cwd(), 'chartData.json');
		
		// Read and parse the JSON data
		const jsonData = await fs.readFile(filePath, 'utf8');
		let chartDataArray = JSON.parse(jsonData);

		// Convert date and ObjectId fields
		chartDataArray = chartDataArray.map(data => ({
			...data,
			createdAt: new Date(data.createdAt["$date"]),  // Convert to JavaScript Date
			_id: data._id ? new mongoose.Types.ObjectId(data._id["$oid"]) : undefined  // Convert to ObjectId if present
		}));

		// Insert data into MongoDB
		await ChartData.insertMany(chartDataArray);
		res.json({ message: "Chart data imported successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

