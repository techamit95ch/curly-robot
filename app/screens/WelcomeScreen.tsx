import { useFocusEffect } from "@react-navigation/native"
import { Button, Text } from "app/components";
import { useStore } from "app/store"
import React, { FC, useRef, useState } from "react"
import { ActivityIndicator, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { isRTL } from "../i18n"
import { AppStackScreenProps, navigate } from "../navigators"
import { colors, spacing } from "../theme"
import { useHeader } from "../utils/useHeader"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

const WelcomeScreen: FC<WelcomeScreenProps> = (_props) => {
  const isCurrentView = useRef(true)
  const [loading, setLoading] = useState(true)

  useFocusEffect(() => {
    isCurrentView.current = false
    setLoading(false)
  })

  const { navigation } = _props
  const logout = useStore((state) => state.logout)

  function goNext() {
    navigation.navigate("Demo")
  }

  // useHeader(
  //   {
  //     rightTx: "common.logOut",
  //     onRightPress: () => {
  //       logout()
  //       navigation?.navigate("Login")
  //     },
  //   },
  //   [logout],
  // )

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return loading ? (
    <View
      style={{
        backgroundColor: "#191015",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator />
    </View>
  ) : (
    <View style={$container}>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.readyForLaunch"
          preset="heading"
        />
        <Text tx="welcomeScreen.exciting" preset="subheading" />
        <Image style={$welcomeFace} source={welcomeFace} resizeMode="contain" />
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Text tx="welcomeScreen.postscript" size="md" />

        <Button
          testID="next-screen-button"
          preset="reversed"
          tx="welcomeScreen.letsGo"
          onPress={goNext}
        />
        <Button
          testID="next-screen-button"
          preset="reversed"
          tx="common.logOut"
          text="logout"
          onPress={() => {
            logout()
            // navigate("Login")
          }}
        />
      </View>
    </View>
  )
}
export default WelcomeScreen

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
}
const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
}
