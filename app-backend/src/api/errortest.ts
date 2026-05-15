import type { Context } from "hono";
import { Hono } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { StatusCodes } from "http-status-codes";

const router = new Hono();

const contentlessStatusCodes = new Set<number>([101, 204, 205, 304]);

const _status = (status: unknown): ContentfulStatusCode => {
	const statusCode = Number(status || StatusCodes.INTERNAL_SERVER_ERROR);
	const isValidStatus =
		Number.isInteger(statusCode) &&
		statusCode >= 100 &&
		statusCode <= 599 &&
		!contentlessStatusCodes.has(statusCode);
	return isValidStatus
		? (statusCode as ContentfulStatusCode)
		: StatusCodes.INTERNAL_SERVER_ERROR;
};

const getErrorTest = async (c: Context) => {
	const status = c.req.query("status");
	return c.text("error-test", _status(status));
};

const postErrorTest = async (c: Context) => {
	const contentType = c.req.header("content-type") || "";
	const body: Record<string, unknown> = contentType.includes("application/json")
		? await c.req.json().catch(() => ({}))
		: await c.req.parseBody().catch(() => ({}));
	return c.text("error-test", _status(body.status));
};

router.get("", getErrorTest);
router.get("/", getErrorTest);
router.post("", postErrorTest);
router.post("/", postErrorTest);

export default router;
