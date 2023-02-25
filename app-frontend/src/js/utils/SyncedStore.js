import { HttpClient } from "./HttpUilts";

const NOOP = () => {};

export function login({ id, passwd }) {
  const resp = HttpClient.post("/api/login", { id, passwd });
  console.log({ resp });
}

export function getUserDataStore() {
  return {};
}

function connect(options) {
  const opts = {
    path: "ws://localhost/ws/",
    onOpen: NOOP,
    onClose: NOOP,
    onMessage: NOOP,
    ...options,
  };
  const ws = new WebSocket(path);
  ws.addEventListener("open", opts.onOpen);
  ws.addEventListener("message", opts.onMsg);
  ws.addEventListener("close", opts.onClose);
  return ws;
}
