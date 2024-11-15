import express from "express";
import { saveLog, getLogs } from "../controllers/logController.js";

const router = express.Router();

router.post("/", saveLog);
router.get("/", getLogs); 

export default router;
