const path = require("path");

// plugin to create html file and inject bundle script into it
const HtmlWebpackPlugin = require("html-webpack-plugin");

//plugin to clean dist folder
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = env => {
  return {
    mode: "development",

    /*  
      Entry point for webpack to build internal dependency graph
      There can be multiple entry points 
      Format : [name]: [path] 
    */

    entry: {
      app: "./client/index.js"
    },

    /*
      Webpack Plugins
    */
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "Document Management System",
        template: "./client/index.html"
      })
    ],
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath:'/'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.js|jsx$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ["file-loader"]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ["file-loader"]
        }
      ]
    },
    // see error messages in source file not bunled file
    devtool: "inline-source-map",

    // Serving dist with webpack dev server
    devServer: {
      contentBase: "./dist",
      open: true,
      historyApiFallback: true,
    }
  };
};
