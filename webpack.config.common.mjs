import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";

export default {
  target: "web",
  entry: {
    // Content Scripts
    instagram: "./src/scripts/content_scripts/instagram/index.ts",
    x: "./src/scripts/content_scripts/x/index.ts",
    tools: "./src/scripts/content_scripts/tools/index.ts",

    // Background Scripts
    background: "./src/scripts/background/index.ts",

    // Page Scripts
    script: "./src/popup/index.tsx",
  },
  output: {
    path: path.resolve(import.meta.dirname, "public"),
    filename: "[name].js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      cache: true,
      chunks: ["script"],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("manifest.json"),
          to: path.resolve("public"),
        },
        {
          from: path.resolve(import.meta.dirname, "src", "assets"),
          to: path.resolve("public"),
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(
            "node_modules",
            "webextension-polyfill/dist/browser-polyfill.min.js"
          ),
          to: ".",
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@repository": path.resolve(import.meta.dirname, "src/repository"),
      "@components": path.resolve(import.meta.dirname, "src/popup/components"),
      "@contexts": path.resolve(import.meta.dirname, "src/popup/contexts"),
      "@hooks": path.resolve(import.meta.dirname, "src/popup/hooks"),
      "@constants": path.resolve(import.meta.dirname, "src/constants"),
      "@utils": path.resolve(import.meta.dirname, "src/utils"),
      "@api": path.resolve(import.meta.dirname, "src/api"),
      "@background": path.resolve(
        import.meta.dirname,
        "src/scripts/background"
      ),
      "@content": path.resolve(
        import.meta.dirname,
        "src/scripts/content_scripts"
      ),
      "@scripts": path.resolve(import.meta.dirname, "src/scripts"),
      "@": path.resolve(import.meta.dirname, "src"),
    },
    extensions: [".ts", ".tsx"],
  },
};
