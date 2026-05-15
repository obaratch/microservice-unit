const config = require("config");
const logger = require("./utils/logger");
const { CORS_DOMAIN = "localhost|127\\.0\\.0\\.1" } = process.env;
logger.debug({ CORS_DOMAIN });

const { serve } = require("@hono/node-server");
const { Hono } = require("hono");
const { cors } = require("hono/cors");
const { secureHeaders } = require("hono/secure-headers");

const Stopwatch = require("statman-stopwatch");
const stopwatch = new Stopwatch(true);
logger.info("starting...");

const app = new Hono();

app.use(secureHeaders());
const corsOrigin = new RegExp(CORS_DOMAIN);
app.use(
  cors({
    origin: (origin) => (corsOrigin.test(origin) ? origin : null),
  })
);

app.use(logger.honoLog);

app.get("/healthcheck", (c) => {
  return c.text("ok");
});

const errorTestApi = require("./api/errortest");
const usersApi = require("./api/users");

app.route("/api/errortest", errorTestApi);
app.route("/api/errortest/", errorTestApi);
app.route("/api/users", usersApi);
app.route("/api/users/", usersApi);

const { port } = config.server;
serve({ fetch: app.fetch, hostname: "127.0.0.1", port }, () => {
  logger.info({ port }, "server listening");

  stopwatch.stop();
  logger.info(`server started in ${stopwatch.time(0)}ms`);
});
