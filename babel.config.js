// /** @type {import('@babel/core').TransformOptions['plugins']} */
// const plugins = [
//   /** react-native-reanimated web support @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#web */
//   "@babel/plugin-proposal-export-namespace-from",
//   /** NOTE: This must be last in the plugins @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#babel-plugin */
//   "react-native-reanimated/plugin",
// ]

// /** @type {import('@babel/core').TransformOptions} */
// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ["babel-preset-expo"],
//     env: {
//       production: {},
//     },
//     plugins,
//   };
// };

// babel.config.js

const plugins = [
  [
    "@babel/plugin-proposal-decorators",
    {
      legacy: true,
    },
  ],
  [
    "babel-plugin-root-import",
    {
      root: __dirname,
      rootPathPrefix: "~/",
      // mapping ~/ to the ./app directory (again, your app structure may differ here)
      rootPathSuffix: "app",
    },
  ],
  ["@babel/plugin-proposal-optional-catch-binding"],
  "inline-dotenv",
  "react-native-reanimated/plugin", // NOTE: this must be last in the plugins
]

const expoConfig = {
  presets: ["babel-preset-expo"],
  env: {
    production: {},
  },
  plugins,
}

/** @type {import('@babel/core').TransformOptions} */
module.exports = function (api) {
  api.cache(true)
  return expoConfig
}
