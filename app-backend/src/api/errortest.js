const { StatusCodes } = require("http-status-codes");
const express = require("express");
const router = express.Router();

const _send = (resp, status) => {
  resp.status(status || StatusCodes.INTERNAL_SERVER_ERROR).send("error-test");
};

router.get("/", async (req, res) => {
  const { status } = req.query;
  _send(res, status);
});

router.post("/", async (req, res) => {
  const { status } = req.body;
  _send(res, status);
});

module.exports = router;
