import { createContext, useEffect, useState } from "react";
import { LayoutProps } from "src/shared/models/LayoutProps";
import { isDataNotEmpty } from "../shared/util/CommonUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "firebase/auth";

export type GlobalContentState = {
  user: User | null;
  setUser: (user: User | null) => void;

  accessToken?: string;
  setAccessToken: (token: string) => void;

  firstTimeUser: boolean;
  setFirstTimeUser: (firstTimeUser: boolean) => void;

  mfaSkip: boolean;
  setMfaSkip: (skip: boolean) => void;
};

const INITIAL_STATE: GlobalContentState = {
  user: null,
  setUser: (user: User | null) => {},

  accessToken: "",
  setAccessToken: (token: string) => {},

  firstTimeUser: true,
  setFirstTimeUser: (firstTimeUser: boolean) => {},

  mfaSkip: true,
  setMfaSkip: (skip: boolean) => {},
};

export const AuthenticatedUserContext =
  createContext<GlobalContentState>(INITIAL_STATE);

export const AuthenticatedUserProvider = ({ children }: LayoutProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string>("");
  const [firstTimeUser, setFirstTimeUser] = useState<boolean>(true);
  const [mfaSkip, setMfaSkip] = useState<boolean>(false);

  useEffect(() => {
    getFirstTimeUserInfo();
  }, []);

  useEffect(() => {
    persistFirstTimeUser(firstTimeUser);
  }, [firstTimeUser]);

  const persistFirstTimeUser = async (isFirstTime: boolean) => {
    await AsyncStorage.setItem("firstTimeUser", JSON.stringify(isFirstTime));
  };

  const getFirstTimeUserInfo = async () => {
    const isFirstTimeUserJson = await AsyncStorage.getItem("firstTimeUser");
    if (isDataNotEmpty(isFirstTimeUserJson)) {
      setFirstTimeUser(JSON.parse(isFirstTimeUserJson));
    }
  };

  return (
    <AuthenticatedUserContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        firstTimeUser,
        setFirstTimeUser,
        mfaSkip,
        setMfaSkip,
      }}
    >
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
