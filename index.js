import cors from "cors";
import dotenv from "dotenv";
import error from "./middleware/error.js";
import express from "express";
import info from "./middleware/info.js";
import log from "./log.js";
import mongoose from "mongoose";
import ok from "./middleware/ok.js";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(info);
app.use("/", routes);
app.use(ok);
app.use(error);

const init = async () => {
	await mongoose.connect(process.env.MONGO_CONNECTION_URI);
	log(`Connected to database`);

	app.listen(port, () => {
		log(`Server is running at http://localhost:${port}`);
	});
};

init();
