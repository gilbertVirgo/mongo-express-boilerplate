import log from "../log.js";

export default (req, res, next) => {
	log(`[${req.ip}] ${req.method.toUpperCase()} ${req.originalUrl}`);

	next();
};
