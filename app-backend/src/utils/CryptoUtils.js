const CryptoJS = require("crypto-js");

function getRandomString() {
  const SALT_SIZE = 512; // 86-char-long
  const salt = CryptoJS.lib.WordArray.random(SALT_SIZE / 8);
  const hash = CryptoJS.SHA3(salt, { outputLength: SALT_SIZE });
  return hash.toString(CryptoJS.enc.Base64url);
}

function getRandomPassword() {
  const [MIN, MAX] = [16, 32];
  const length = MIN + Math.floor(Math.random() * (MAX - MIN + 1));
  return getRandomString().slice(0, length);
}

module.exports = { getRandomString, getRandomPassword };
