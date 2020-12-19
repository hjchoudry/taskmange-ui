const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if(req.cookies.user_sid && req.session.user) {
    console.info("session credte")
    return res.redirect("/");
  } else {
    next();
    console.info("session not created")
  }
};
