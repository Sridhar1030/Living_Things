import express from "express";
import cors from "cors"; // Import cors
import connectDB from "./config/db.js";
import chartRoutes from "./routes/chartRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import { userRouter } from "./routes/user.routes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("Hello World");
});

// API routes
app.use("/api/charts", chartRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/auth", userRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
