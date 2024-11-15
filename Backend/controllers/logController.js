import Log from "../models/Log.js";

export const saveLog = async (req, res) => {
	try {
		const { accessTime, accessDate, employeeName, algoStatus } = req.body;

		const newLog = new Log({
			accessTime,
			accessDate,
			employeeName,
			algoStatus,
		});

		await newLog.save();
		res.status(200).json({
			message: "Log saved successfully",
			data: newLog,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};


export const getLogs = async (req, res) => {
	try {
		const logs = await Log.find().sort({ accessTime: 1 }); 
		res.status(200).json(logs);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};