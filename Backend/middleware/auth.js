export default (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (authHeader && authHeader === "Bearer your_token_here") {
		next();
	} else {
		res.status(403).json({ message: "Unauthorized" });
	}
};
