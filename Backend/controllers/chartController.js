import ChartData from "../models/ChartData.js";
import fs from "fs/promises";
import path from "path";
import mongoose from 'mongoose';




export const getChartData = async (req, res) => {
	try {
		const { startDate, endDate, algo_status } = req.query;

		// Build the filter object based on the query parameters
		const filter = {
			...(startDate && { createdAt: { $gte: new Date(startDate) } }),
			...(endDate && { createdAt: { $lte: new Date(endDate) } }),
			...(algo_status && { algo_status }),
			// Ensure only data with total_kwh > 0 is retrieved
			...(algo_status && { total_kwh: { $gt: 0 } }),
		};

		// Fetch data and sort by 'createdAt' in ascending order
		const data = await ChartData.find(filter).sort({ createdAt: 1 });

		// Format the 'createdAt' field to 'Aug 7, 2024' format
		const formattedData = data
			.filter(item => item.total_kwh > 0) // Filter out items with total_kwh == 0
			.map(item => ({
				...item.toObject(),
				createdAt: item.createdAt.toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'short',
					day: 'numeric',
				}),
			}));

		// Send the formatted data in response
		res.json(formattedData);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};


export const getFilteredChartData = async (req, res) => {
    try {
        // Check if the database is empty
        const existingData = await ChartData.countDocuments();
        
        // If no data exists, import the data from the JSON file
        if (existingData === 0) {
            console.log('No data found, importing chart data...');
            await importChartData(req, res); // Call the import function
        }

        // After ensuring data is in the database, filter by algo_status
        const { algo_status, start_date, end_date } = req.query;

        const filter = {
            ...(algo_status && { algo_status: parseInt(algo_status) }) // Filter by algo_status
        };

        // If date filters are provided, add them to the filter
        if (start_date && end_date) {
            filter.createdAt = {
                $gte: new Date(start_date), // Start date
                $lte: new Date(end_date)    // End date
            };
        }

        // Fetch filtered data
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

