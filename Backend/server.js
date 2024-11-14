import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import ChartData from "./models/ChartData.model.js"; // Correct import
import fs from "fs";
import path from "path";
import { config } from "dotenv";

// Load environment variables from .env file
config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(json());

// MongoDB connection
connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Fetch chart data from JSON file
app.get("/api/chart-data", (req, res) => {
  // Get the correct directory path for the JSON file
  const filePath = path.join( 'chartData.json'); // Ensure correct file path

  // Log the resolved file path to verify
  console.log('File Path:', filePath);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('File Read Error:', err); // Enhanced error logging
      return res.status(500).json({ message: "Error reading JSON file" });
    }

    try {
      const chartData = JSON.parse(data); // Parse the JSON data
      res.json(chartData); // Return the parsed data as a response
    } catch (parseErr) {
      console.error('JSON Parse Error:', parseErr);
      return res.status(500).json({ message: "Error parsing JSON file" });
    }
  });
});

// Insert chart data from JSON into MongoDB
app.post("/api/import-chart-data", (req, res) => {
  const filePath = path.join( 'chartData.json'); // Ensure correct file path

  fs.readFile(filePath, 'utf8', async (err, data) => {
    if (err) {
      console.error('File Read Error:', err);
      return res.status(500).json({ message: "Error reading JSON file" });
    }

    try {
      const chartData = JSON.parse(data);
      
      // Insert data into MongoDB
      await ChartData.insertMany(chartData);
      res.json({ message: "Chart data successfully inserted into MongoDB" });
    } catch (err) {
      console.error('Insert Error:', err);
      res.status(500).json({ message: "Error inserting data into MongoDB" });
    }
  });
});




// Log data access
app.post("/api/logs", async (req, res) => {
	const { access_time, access_date, employee_name, algo_status } = req.body;

	const newLog = new Log({
		access_time,
		access_date,
		employee_name,
		algo_status,
	});
	try {
		await newLog.save();
		res.status(201).json({ message: "Log saved" });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Start server
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
