const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const setGlobalMiddlewares = app => {
  app.use(morgan("tiny"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
};

module.exports = setGlobalMiddlewares;
