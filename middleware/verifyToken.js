import User from "../models/User.js";
import jwt from "jsonwebtoken";

export default async (req, res, next) => {
	if (!req.headers.authorization) next(new Error("No auth header"));

	const token = req.headers.authorization.split("Bearer ")[1];
	const payload = jwt.verify(token, process.env.JWT_SECRET);

	if (!payload.username) next(new Error("No username in JWT"));

	const user = await User.findOne({ username: payload.username });

	if (!user.tokens.includes(token)) next(new Error("Invalid token"));

	next();
};
