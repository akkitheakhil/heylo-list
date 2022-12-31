import { View, Text } from "react-native";
import React, { useContext } from "react";

import RegisterScreen from "../screens/register/RegisterScreen";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/login/LoginScreen";
import { AuthenticatedUserContext } from "src/context/AuthContext";
import OnBoardingScreen from "src/screens/onboarding/OnBoardingScreen";

const Stack = createStackNavigator();

const AuthNavigation = () => {
  const { firstTimeUser } = useContext(AuthenticatedUserContext);

  if (firstTimeUser) {
    return <OnBoardingScreen></OnBoardingScreen>;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
