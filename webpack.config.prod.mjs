import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { merge } from "webpack-merge";
import common from "./webpack.config.common.mjs";
import WebExtPlugin from "web-ext-plugin";
import path from "path";

export default merge(common, {
  mode: "production",
  plugins: [
    new MiniCssExtractPlugin(),
    new WebExtPlugin({
      sourceDir: path.resolve(import.meta.dirname, "./public"),
      buildPackage: true,
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
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: { importLoaders: 1, modules: true },
          },
        ],
      },
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
        ],
      },
    ],
  },
});
