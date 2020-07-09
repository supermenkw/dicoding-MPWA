const merge = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const WriteFileWebpackPlugin = require("write-file-webpack-plugin");

module.exports = merge(common, {
    mode: "development",
});
