import User from "../models/User.js";

export default [
	{
		route: "/user",
		method: "put",
		action: async (req, res, next) => {
			await User.create({
				username: req.body.username,
				password: req.body.password,
			}).catch(next);

			next();
		},
	},
	{
		route: "/user/login",
		method: "post",
		secure: false,
		action: async (req, res, next) => {
			const user = await User.findOne({
				username: req.body.username,
				password: req.body.password,
			}).catch(next);

			if (!user)
				return next(
					new Error("Incorrect username/password combo. Whoopsies!")
				);

			res.locals.jwt = user.newToken();

			next();
		},
	},
];
