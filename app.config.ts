import { ExpoConfig, ConfigContext } from "@expo/config"

/**
 * Use ts-node here so we can use TypeScript for our Config Plugins
 * and not have to compile them to JavaScript
 */
require("ts-node/register")

/**
 * @param config ExpoConfig coming from the static config app.json if it exists
 *
 * You can read more about Expo's Configuration Resolution Rules here:
 * https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules
 */
module.exports = ({ config }: ConfigContext): Partial<ExpoConfig> => {
  const existingPlugins = config.plugins ?? []

  return {
    ...config,
    userInterfaceStyle:'dark',
    plugins: [
      ...existingPlugins,
      require("./plugins/withSplashScreen").withSplashScreen,
      require("./plugins/withFlipperDisabled").withFlipperDisabled,
      [
        require("./plugins/withRequiredHardware").withRequiredHardware,
        {
          // More info: https://developer.apple.com/documentation/bundleresources/information_property_list/uirequireddevicecapabilities/
          ios: ["front-facing-camera", "microphone"],
          // More info: https://developer.android.com/guide/topics/manifest/uses-feature-element
          android: ["android.hardware.camera.front", "android.hardware.microphone"],
        },
      ],
    ],
  }
}
