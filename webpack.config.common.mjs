import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";

const paths = {
  content: "scripts/content_scripts",
  background: "scripts/background",
  packages: "packages",
  popup: "popup",
};

export default {
  target: "web",
  entry: {
    // Content Scripts
    instagram: {
      import: "./src/scripts/content_scripts/instagram/index.ts",
      filename: paths.content + "/instagram.js",
    },

    x: {
      import: "./src/scripts/content_scripts/x/index.ts",
      filename: paths.content + "/x.js",
    },

    tools: {
      import: "./src/scripts/content_scripts/tools/index.ts",
      filename: paths.content + "/tools.js",
    },

    // Background Scripts
    background: {
      import: "./src/scripts/background/index.ts",
      filename: paths.background + "/background.js",
    },

    // Page Scripts
    script: {
      import: "./src/popup/index.tsx",
      filename: `${paths.popup}/script.js`,
    },
  },
  output: {
    path: path.resolve(import.meta.dirname, "public"),
    filename: "[name].js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: paths.popup + "/index.html",
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
          to: path.resolve("public", "assets"),
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
          to: "./" + paths.packages,
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
