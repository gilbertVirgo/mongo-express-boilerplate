import dayjs from "dayjs";
import fs from "fs";
import getDirname from "./getDirname.js";

export default (message) => {
	const messageWithTimestamp = `[${dayjs().format(
		"DD/MM/YY HH:mm:ss"
	)}] ${message}`;

	console.log(messageWithTimestamp);

	fs.appendFileSync(
		getDirname(import.meta.url) + "/log",
		messageWithTimestamp + "\r\n"
	);
};
