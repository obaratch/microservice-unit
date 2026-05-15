import { StatusCodes } from "http-status-codes";
import { Hono } from "hono";

const router = new Hono();

const _status = (status) => {
  const statusCode = Number(status || StatusCodes.INTERNAL_SERVER_ERROR);
  const isValidStatus = Number.isInteger(statusCode) && statusCode >= 100 && statusCode <= 599;
  return isValidStatus ? statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
};

const getErrorTest = async (c) => {
  const status = c.req.query("status");
  return c.text("error-test", _status(status));
};

const postErrorTest = async (c) => {
  const contentType = c.req.header("content-type") || "";
  const body = contentType.includes("application/json")
    ? await c.req.json().catch(() => ({}))
    : await c.req.parseBody().catch(() => ({}));
  return c.text("error-test", _status(body.status));
};

router.get("", getErrorTest);
router.get("/", getErrorTest);
router.post("", postErrorTest);
router.post("/", postErrorTest);

export default router;
