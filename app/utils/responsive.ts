import Constants from "expo-constants"
import { Dimensions, NativeModules, Platform, StatusBar } from "react-native"

const { StatusBarManager } = NativeModules

export const getStatusBarHeigh2 = () => {
  if (Platform.OS === "ios") {
    // For iOS, use the StatusBar component
    return StatusBar.currentHeight
  } else if (Platform.OS === "android" && StatusBarManager) {
    // For Android, use the StatusBarManager module
    return StatusBarManager.HEIGHT
  }

  return 0 // Default value
}

export const statusBarHeight = getStatusBarHeigh2()

export const screenHeight = Dimensions.get("screen").height
export const screenWidth = Dimensions.get("screen").width
export const windowHeight = Dimensions.get("window").height
export const windowWidth = Dimensions.get("window").width
export const navbarHeight = screenHeight - windowHeight

export const shortAddress = (address: string, num?: number) => {
  const numLettters = num || 5

  return address
    ? address.length > numLettters * 2
      ? `${address.slice(0, numLettters)}...${address.slice(-numLettters)}`
      : address
    : ""
}
export const isAndroid = Platform.OS === "android"

export const isAndroid12OrGreater = () => {
  return isAndroid && Number(Platform.Version) > 30
}

export const isRunningInExpoGo = Constants.appOwnership === "expo"

export function isIphoneX() {
  "worklet"

  const dimen = { height: windowHeight, width: windowWidth }

  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTV &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  )
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle
  }

  return regularStyle
}

export function getStatusBarHeight(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
    default: 0,
  })
}

export function getBottomSpace() {
  "worklet"

  return isIphoneX() ? 34 : 0
}

// guideline height for standard 5" device screen is 680
export const RFValue = (fontSize: number, standardScreenHeight = 680) => {
  const standardLength = windowWidth > windowHeight ? windowWidth : windowHeight

  const offset =
    (windowWidth > windowHeight ? 0 : Platform.OS === "ios" ? 78 : StatusBar.currentHeight) || 0

  const deviceHeight =
    isIphoneX() || Platform.OS === "android" ? standardLength - offset : standardLength

  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight

  const match = Math.round(heightPercent)

  return match
}

export const RFValue2 = (fontSize: number, standardScreenHeight = 680) => {
  "worklet"

  const standardLength = (windowWidth > windowHeight ? windowWidth : windowHeight) || 0

  const offset =
    (windowWidth > windowHeight ? 0 : Platform.OS === "ios" ? 78 : StatusBar.currentHeight) || 0

  const deviceHeight =
    (isIphoneX() || Platform.OS === "android" ? standardLength - offset : standardLength) || 0

  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight || 0

  const match = Math.round(heightPercent) || fontSize

  return match
}

export const idealIOSHeight = 940 as const

export const responsive = <T extends number>(font: T) =>
  windowWidth > 786 ? (RFValue(font, windowWidth + 200) as T) : (RFValue(font, idealIOSHeight) as T)

export const responsive2 = <T extends number>(font: T) => {
  "worklet"

  const value = windowWidth > 786 ? windowWidth + 200 : idealIOSHeight

  const newVal = RFValue2(font, value) as unknown as T

  // console.log({ newVal });
  //
  return newVal
}
