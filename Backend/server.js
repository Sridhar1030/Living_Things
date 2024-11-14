import express from "express";
import cors from "cors"; // Import cors
import connectDB from "./config/db.js";
import chartRoutes from "./routes/chartRoutes.js";
import logRoutes from "./routes/logRoutes.js";

const app = express();

// Use cors middleware to allow cross-origin requests from all domains
app.use(cors());

app.use(express.json());

connectDB();

app.use("/api/charts", chartRoutes);
app.use("/api/logs", logRoutes);

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
