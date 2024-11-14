import express from "express";
import {
	getChartData,
	getFilteredChartData,
	importChartData,
} from "../controllers/chartController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/",  getChartData);
router.post("/import", importChartData);
router.get('/filtered', getFilteredChartData);


export default router;
