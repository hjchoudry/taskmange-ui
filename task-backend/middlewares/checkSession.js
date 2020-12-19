const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if(req.cookies.user_sid && req.session.user) {
    return res.redirect("/");
  } else {
    next();
  }
};
