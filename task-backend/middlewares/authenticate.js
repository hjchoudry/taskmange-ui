const jwt = require("jsonwebtoken");

module.exports = function authenticate( req ,res, next ) {
  const token = req?.cookies.jwt;
  if (token) {
    jwt.verify(token, "s3cr3t", (error, decodedToken) => {
      if (error) {
        return (
          res.status(403).json({alert:{type:"error",
          message:"Authentication error!",
          description:"Please logout and login again!"
        }, })
          );
      } else {
        req.decoded = decodedToken;
        req.user = decodedToken.payload;
        next();
      }
    });
  } else {
    return res.status(403).json({alert:{type:"error",
    message:"No Token Provided!",
    description:"Please logout and login again!"
  } });
  }
};
