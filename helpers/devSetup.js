const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackDevConfig = require("../webpack.config.dev.js")();
const compiler = webpack(webpackDevConfig);

// Tell express to use the webpack-dev-middleware and use the webpack.dev.config.js
// configuration file as a base.

module.exports = function(app) {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackDevConfig.output.publicPath,
      hot: true, 
      stats: { colors: true }
    })
  );
}
