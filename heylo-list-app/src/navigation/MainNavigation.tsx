import { Text, View, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/FirebaseConfig";
import AppNavigation from "./AppNavigation";
import AuthNavigation from "./AuthNavigation";
import { APP_COLORS } from "../theme/colors";
import { NavigationContainer } from "@react-navigation/native";
import { AuthenticatedUserContext } from "@context/AuthContext";
import { isDataNotEmpty } from "src/shared/util/CommonUtils";
import { IUser } from "src/shared/models/IUser";
import { useMutation } from "@tanstack/react-query";
import { setAuthUser } from "src/api/UserAPI";
import { AxiosHttp } from "src/shared/httpClient/AxiosHttp";

const MainNavigation = () => {
  const { user, setUser, firstTimeUser, accessToken, setAccessToken } =
    useContext(AuthenticatedUserContext);

  const [isDataLoading, setIsDataLoading] = useState(true);
  const setUserAuth = useMutation(setAuthUser);
  const axios = AxiosHttp.getInstance();

  useEffect(() => {
    setIsDataLoading(true);
    const unsubscribeAuth = onAuthStateChanged(
      FirebaseAuth,
      async (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        const idToken = await authenticatedUser?.getIdToken();
        if (idToken) {
          console.log(idToken);
          setAccessToken(idToken);
          axios.updateAuthHeader(idToken);
        }
        setIsDataLoading(false);
      }
    );

    if (user && isDataNotEmpty(user.email)) {
      const userData: IUser = {
        email: user.email,
        displayName: user.displayName ?? "",
        emailVerified: user.emailVerified,
        photoURL: user.photoURL ?? "",
        userId: user.uid,
      };
      callUser(userData);
    }

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);

  const callUser = (userData: IUser) => {
    setUserAuth.mutate(userData, {
      onError: (err) => {
        console.log(err, "err");
      },
    });
  };

  if (isDataLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: APP_COLORS.BACKGROUND_COLOR,
        }}
      >
        <ActivityIndicator
          size="large"
          color={APP_COLORS.PRIMARY_COLOR}
        ></ActivityIndicator>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default MainNavigation;
