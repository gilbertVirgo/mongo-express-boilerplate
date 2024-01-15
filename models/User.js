import { Schema, model } from "mongoose";

import jwt from "jsonwebtoken";

const UserSchema = new Schema({
	username: String,
	password: String,
	tokens: [String],
});

UserSchema.methods.newToken = function () {
	const token = jwt.sign({ username: this.username }, process.env.JWT_SECRET);

	this.tokens = [...this.tokens, token];

	this.save();

	return token;
};

export default new model("User", UserSchema);
