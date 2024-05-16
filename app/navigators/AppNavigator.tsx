import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
  useNavigationContainerRef,
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { LoginScreen, WelcomeScreen } from "app/screens"
// import * as Screens from "app/screens"
import { useStore, isAuthenticatedSelector, useAuthenticationStore } from "app/store"
import { colors } from "app/theme"
import React, { memo, useCallback } from "react"
import { View, useColorScheme, Text, ActivityIndicator } from "react-native"
import { shallow } from "zustand/shallow"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  Login: undefined
  Demo: NavigatorScreenParams<DemoTabParamList>
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const Demo = () => (
  <View
    style={{ flex: 1, backgroundColor: "#232332", alignItems: "center", justifyContent: "center" }}
  >
    <ActivityIndicator />
  </View>
)

const AppStack = function AppStack() {
  // useAuthenticationStore
  const authToken = useStore(
    useCallback((state) => state?.authToken, []),
    shallow,
  )
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        headerBackButtonMenuEnabled: true,
        headerTintColor: "#8e8e8e",
      }}
      initialRouteName={authToken ? "Welcome" : "Login"}
    >
      {authToken ? (
        <>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
              headerShown: true,
              headerBackButtonMenuEnabled: true,
              headerTintColor: "#8e8e8e",
            }}
          />
          <Stack.Screen name="Demo" component={Demo} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  )
}
const Loading = () => <ActivityIndicator />
export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = memo(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))
  const rootNavigationRef = useNavigationContainerRef()
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      fallback={<Loading />}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
