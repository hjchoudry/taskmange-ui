const authenticate = require("./authenticate");
const checkSession = require("./checkSession");
const admin = require("./admin");
const notFound = require("./404Page");

module.exports = {
  authenticate,
  checkSession,
  admin,
  notFound
};
