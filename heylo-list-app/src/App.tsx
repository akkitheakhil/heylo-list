import { registerRootComponent } from "expo";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainNavigation from "./navigation/MainNavigation";
import { AuthenticatedUserProvider } from "@context/AuthContext";
import {
  Oswald_200ExtraLight,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";

import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import { FirebaseApp } from "./firebase/FirebaseConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

SplashScreen.preventAutoHideAsync();

const firebase = FirebaseApp;
const storage = AsyncStorage;

export default function App() {
  const queryClient = new QueryClient();
  const [fontsLoaded] = useFonts({
    Oswald_200ExtraLight,
    Oswald_300Light,
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthenticatedUserProvider>
      <QueryClientProvider client={queryClient}>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <MainNavigation />
        </View>
      </QueryClientProvider>
      <ReactQueryDevtools />
    </AuthenticatedUserProvider>
  );
}

registerRootComponent(App);
