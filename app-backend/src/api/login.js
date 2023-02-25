const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");
const CryptoUtils = require("../utils/CryptoUtils");

router.get("/onetime", async (req, res) => {
  const password = CryptoUtils.getRandomPassword();
  res.send(password);
});

router.post("/", async (req, res) => {
  const { id } = req.body;
  const user = { id };
  req.session.user = user;
  res.send({ success: true, user });
  logger.info("user logged in", user);
});

const logout = async (req, res) => {
  req.session.destroy((error) => {
    res.send({ success: true });
  });
};
router.get("/bye", logout);
router.post("/bye", logout);

module.exports = router;
