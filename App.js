import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  HomeScreen,
  ForgotPasswordScreen,
  LoginScreen,
  SignupScreen,
} from "./screens";
import { TamaguiProvider, createTamagui } from "@tamagui/core";
import { config } from "@tamagui/config/v3";
import { RootNavigator } from "./navigation/RootNavigator";
import { AuthenticatedUserProvider } from "./providers";
const tamaguiConfig = createTamagui(config);

// TypeScript types across all Tamagui APIs

const App = () => {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <AuthenticatedUserProvider>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </AuthenticatedUserProvider>
    </TamaguiProvider>
  );
};
export default App;
