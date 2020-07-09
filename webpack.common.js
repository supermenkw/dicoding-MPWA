const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const copyWebpackPlugin = require("copy-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

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
                    {
                        loader: "sass-loader"
                    }
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
                    from: "src/svg/*.svg",
                    to: "svg/[name].[ext]"
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
            ]
        }),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'src/sw.js'),
        }),
        new WebpackPwaManifest({
            name: 'Gila Bola App',
            short_name: 'Gilabola',
            description: 'Informasi lengkap tentang sepak bola!',
            start_url: "index.html",
            background_color: '#0000',
            gcm_sender_id: "381248738485",
            icons: [
                    {
                        src: path.resolve('src/icon-192.png'),
                        size: '192x192' // you can also use the specifications pattern
                    },
                    {
                        src: path.resolve('src/icon-512.png'),
                        size: '512x512' // you can also use the specifications pattern
                    },
                    ]
        }),
        new CleanWebpackPlugin(),
    ],
};
