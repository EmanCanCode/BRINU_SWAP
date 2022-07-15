const webpack = require("webpack");
const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const mode = "development";
const devtool = "inline-source-map";

const imageInlineSizeLimit = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT ?? '10000');

module.exports = {
    mode,
    devtool,
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".scss"],
        fallback: {
            "http": require.resolve("http-browserify"),
            "https": require.resolve("https-browserify"),
            "stream": require.resolve("stream-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "assert": require.resolve("assert/"),
            "util": require.resolve("util/"),
            "os": require.resolve("os-browserify/browser"),
        },
    },
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG']),
        new ForkTsCheckerWebpackPlugin()
    ],
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader" },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                loader: require.resolve('url-loader'),
                options: {
                  limit: imageInlineSizeLimit,
                  name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
        filename: "main.js",
    },
    devServer: {
        compress: true,
        open: true,
        port: 9000,
        // publicPath: path.resolve(__dirname, "src"),
        static: [path.resolve(__dirname, "src"), path.resolve(__dirname, "dist"), path.resolve(__dirname)],
    },
};