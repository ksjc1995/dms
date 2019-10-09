const User = require("../helpers/db").User;
const bcrypt = require("bcrypt");
const jwt = require("../helpers/jwt");
const saltRounds = 9;
exports.login = async function(req, res, err) {
  try {
    const user = await User.findOne({ userEmail: req.body.userEmail });
    let isAuthenticated = false;
    if (user) {
      isAuthenticated = await bcrypt.compare(req.body.userPassword, user.hash);
      if (isAuthenticated) {
        //generate jwt token with 8hr time limit
        const authToken = jwt.sign({
          userEmail: req.body.userEmail,
          roleId: user.roleId
        });
        user.activeToken = authToken;
        const updateActiveTokenResult = await user.save();
        if (updateActiveTokenResult) {
          return res.json({
            message: "Success",
            status: 200,
            token: authToken
          });
        }
      }
    } else {
      return res.json({
        message: "User doesn't exist!! Please signup",
        status: 401
      });
    }
    return res.json({
      message: "Email or password incorrect",
      status: 401
    });
  } catch (err) {
    console.log("Error", err);
    return res.json({
      message: "Some unusual error occurred",
      status: 500
    });
  }
};

exports.signup = async function(req, res, err) {
  //check if userEmail exists
  if (await User.findOne({ userEmail: req.body.userEmail })) {
    return res.json({
      message: `Email ${req.body.userEmail} is already taken`,
      status: 409
    });
  }
  const newUserInstance = new User();
  newUserInstance.userEmail = req.body.userEmail;

  if (req.body.userPassword) {
    const hash = await bcrypt.hash(req.body.userPassword, saltRounds);
    newUserInstance.hash = hash;
    const result = await newUserInstance.save();
    return res.json({
      message: "Registered Successfully",
      status: 200,
      result: result
    });
  }
};

exports.logout = async function(req, res, err) {
  const authHeader = req.headers["authorization"];
  const decodedToken = jwt.decode(authHeader);
  if (decodedToken) {
    try {
      const user = await User.findOne({ userEmail: decodedToken.userEmail });
      if (user) {
        user.activeToken = "";
        const updateActiveTokenResult = await user.save();
        if (updateActiveTokenResult) {
          return res.json({
            message:"Successfully logged out!!",
            status:200
          })
        }
      }
    } catch (err) {
      console.log(err);
      return res.json({
        message: "Unknown error!!",
        status: 500
      });
    }
  } else {
    return res.json({
      message: "You need to logged in to logout!!",
      status: 200
    });
  }
};
