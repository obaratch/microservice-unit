import pino from "pino";
import config from "../config.js";

type AppLogger = pino.Logger & {
	honoLog: (c: any, next: () => Promise<void>) => Promise<void>;
};

const logger = pino() as AppLogger;

logger.level = config.log.level;

logger.honoLog = async (c, next) => {
	const { req } = c;
	const url = new URL(req.url);

	logger.debug(
		{
			http: {
				ip: req.header("x-forwarded-for"),
				method: req.method,
				hostname: url.hostname,
				originalUrl: url.pathname,
				query: Object.fromEntries(url.searchParams),
			},
			//   user: _.pick(user, ["uid", "loginid"]),
		},
		"REQ",
	);

	await next();
};

export default logger;
