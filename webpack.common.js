const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const copyWebpackPlugin = require("copy-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    entry: {
        main: "./src/app.js",
        competition: "./src/competition.js",
        team: "./src/team.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
    },
    devServer: {
        writeToDisk: true,
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/i,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|ico|woff|woff2|ttf|eot|svg)$/i,
                use: [
                    {
                    loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot)$/i,
                use: [
                    {
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                    },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            chunks: ["main"],
            filename: "index.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/competition.html",
            chunks: ["competition"],
            filename: "competition.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/team.html",
            chunks: ["team"],
            filename: "team.html",
        }),
        new copyWebpackPlugin ({
            patterns: [
                {
                    from: "src/svg",
                    to: "svg"
                },
                {
                    from: "src/favicon.ico",
                    to: "favicon.ico",
                },
                {
                    from: "src/angga.jpg",
                    to: "angga.jpg"
                },
                {
                    from: "src/pages",
                    to: "pages"
                },
                {
                    from: "src/components",
                    to: "components"
                },
                {
                    from: "src/icon",
                    to: "icon"
                },
                {
                    from: "src/manifest.json",
                    to: "manifest.json"
                }
            ]
        }),
        new InjectManifest({
            swSrc: "./src/sw.js"
        }),
        new CleanWebpackPlugin(),
    ],
};
