import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import errorTestApi from "./api/errortest.js";
import usersApi from "./api/users.js";
import config from "./config.js";
import logger from "./utils/logger.js";
import { Stopwatch } from "./utils/TimeUtils.js";

const { CORS_DOMAIN = "localhost|127\\.0\\.0\\.1" } = process.env;
logger.debug({ CORS_DOMAIN });
const stopwatch = new Stopwatch({ autostart: true });
logger.info("starting...");

const app = new Hono();

app.use(secureHeaders());
const corsOrigin = new RegExp(CORS_DOMAIN);
app.use(
	cors({
		origin: (origin) => (corsOrigin.test(origin) ? origin : null),
	}),
);

app.use(logger.honoLog);

app.get("/healthcheck", (c) => {
	return c.text("ok");
});

app.route("/api/errortest", errorTestApi);
app.route("/api/errortest/", errorTestApi);
app.route("/api/users", usersApi);
app.route("/api/users/", usersApi);

const { port } = config.server;
serve({ fetch: app.fetch, hostname: "0.0.0.0", port }, () => {
	logger.info({ port }, "server listening");

	stopwatch.stop();
	logger.info(`server started in ${stopwatch.time(0)}ms`);
});
