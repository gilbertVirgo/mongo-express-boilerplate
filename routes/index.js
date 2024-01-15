import express from "express";
import user from "./user.js";
import verifyToken from "../middleware/verifyToken.js";

const allRoutes = [...user];

const router = express.Router();

allRoutes.forEach(({ route, method, secure = true, action }) => {
	if (!secure) router[method](route, action);
	else router[method](route, verifyToken, action);
});

export default router;
