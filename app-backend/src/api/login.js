const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");

router.post("/", async (req, res) => {
  const { id } = req.body;
  const user = { id };
  req.session.user = user;
  res.send({ success: true, user });
  logger.info("user logged in", user);
});

router.get("/bye", async (req, res) => {
  req.session.destroy((error) => {
    res.send({ success: true });
  });
});

module.exports = router;
