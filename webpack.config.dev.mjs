import WebExtPlugin from "web-ext-plugin";
import path from "path";
import { merge } from "webpack-merge";
import common from "./webpack.config.common.mjs";

export default merge(common, {
  mode: "development",
  devtool: "source-map",
  plugins: [
    new WebExtPlugin({
      sourceDir: path.resolve(import.meta.dirname, "./public"),
      firefox:
        "/home/diogo-vitorino/Work/Apps/firefox-129.0b9/firefox/firefox-bin",
    }),
  ],  
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: /\.module\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: { importLoaders: 1, modules: true },
          },
        ],
      },
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
    ],
  },
});
