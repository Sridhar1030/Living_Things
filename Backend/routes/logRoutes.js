import express from "express";
import { saveLog } from "../controllers/logController.js";

const router = express.Router();

router.post("/", saveLog);

export default router;
