import express from "express";
import {
	getChartData,
	getFilteredChartData,
	importChartData,
} from "../controllers/chartController.js";
import { verifyJWT } from "../middleware/auth.middlewares.js";

const router = express.Router();

router.get("/",  getChartData);
router.post("/import",verifyJWT, importChartData);
router.get('/filtered',verifyJWT , getFilteredChartData);


export default router;
