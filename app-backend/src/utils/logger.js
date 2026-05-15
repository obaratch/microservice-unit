const config = require("config");

const logger = require("pino")();

logger.level = logger.levels.values[config.server.log.level];

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
    "REQ"
  );

  await next();
};

module.exports = logger;
