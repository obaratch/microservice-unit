const { version } = require("../package.json");

module.exports = {
  version,
  server: {
    port: 3000,
    log: {
      level: "info",
    },
  },
};
