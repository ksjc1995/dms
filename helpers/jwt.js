const jwt = require("jsonwebtoken");

const config = require("../config/jwt");
var privateKEY = config.privateKey;

module.exports = {
  sign: payload => {
    var signOptions = {
      expiresIn: "8h"
    };
    return jwt.sign(payload, privateKEY, signOptions);
  },

  verify: token => {
    return jwt.verify(token, config.privateKey);
  },

  decode: authHeader => {
    const token = authHeader.split(" ")[1];
    let decodedToken = "";
    try {
      decodedToken = jwt.verify(token,config.privateKey);
    } catch (err) {
      console.log('Error while decoding', err);
      return null;
    }

    return decodedToken;
  }
};
