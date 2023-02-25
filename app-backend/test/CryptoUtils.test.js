const utils = require("../src/utils/CryptoUtils");

const PTN_BASE64URL = /^[a-zA-Z0-9_\-].*/;

describe("getRandomString", () => {
  const func = utils.getRandomString;

  it("should generate random URL-safe string", () => {
    expect(func()).toMatch(PTN_BASE64URL);
  });

  it("should generate different string everytime", () => {
    const s1 = func();
    const s2 = func();
    expect(s1).not.toEqual(s2);
  });
});

describe("getRandomPassword", () => {
  const func = utils.getRandomPassword;

  it("should return string within length between 16 - 32", () => {
    const array = Array.from(new Array(100)).map(() => func().length);
    const min = Math.min(...array);
    const max = Math.max(...array);
    expect(min).toBeGreaterThanOrEqual(16);
    expect(max).toBeLessThanOrEqual(32);
  });
});
