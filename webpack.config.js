var UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "dist/eth-button.js"
  },
  plugins: [new UglifyJSPlugin()]
};
