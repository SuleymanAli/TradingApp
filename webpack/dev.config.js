const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WWPlugin = require("./ww_plugin.js");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

global.port = "8080";

module.exports = (env, options) => ({
  entry: "./src/main.js",
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /script_ww\.js$/,
        loader: "worker-loader",
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext][query]",
        },
      },
      // {
      //   loader: "sass-loader",
      //   options: {
      //     additionalData: "$env: " + process.env.NODE_ENV + ";"
      //   }
      // }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new WWPlugin(),
    new webpack.DefinePlugin({
      MOB_DEBUG: JSON.stringify(process.env.MOB_DEBUG),
    }),
  ],
  devServer: {
    proxy: {
      "/api/v3/**": {
        target: "https://api.binance.com",
        changeOrigin: true,
      },
      "/ws/**": {
        target: "wss://stream.binance.com:9443",
        changeOrigin: true,
        ws: true,
      },
      "/api/udf/**": {
        target: "https://www.bitmex.com",
        changeOrigin: true,
      },
    },
    host: "0.0.0.0",
    onListening: function (server) {
      const port = server.listeningApp.address().port;
      global.port = port;
    },
    before(app) {
      app.get("/debug", function (req, res) {
        try {
          let argv = JSON.parse(req.query.argv);
          console.log(...argv);
        } catch (e) {}
        res.send("[OK]");
      });
    },
    historyApiFallback: true,
  },
  optimization: {
    minimize: options.mode === "production",
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: {
            reserved: ["_id", "_tf"], // for scripts std
          },
        },
      }),
    ],
  },
  devtool: "source-map",
});
