import packageJson from "../../package.json" with { type: "json" };

const { NODE_ENV } = process.env;

const config = {
  version: packageJson.version,
  log: {
    level: NODE_ENV === "dev" ? "debug" : "info",
  },
  server: {
    port: 3000,
  },
};

export default config;
