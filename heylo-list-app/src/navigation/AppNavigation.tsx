import {
  View,
  Text,
  Pressable,
  Animated,
  useWindowDimensions,
} from "react-native";
import React, { useContext, useRef } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useMFA, useSignOutUser } from "../firebase/FirebaseAuth";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import DashboardScreen from "src/screens/dashboard/DashboardScreen";
import CategoryScreen from "src/screens/category/CategoryScreen";
import ListScreen from "src/screens/list/ListScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import { APP_COLORS } from "src/theme/colors";
import { CategoryIcon } from "../shared/icons";
import ListIcon from "../shared/icons/ListIcon";
import ProfileIcon from "../shared/icons/ProfileIcon";
import { APP_FONTS } from "@theme/fonts";
import { AddIcon, HomeIcon } from "@shared/icons";
import { AuthenticatedUserContext } from "src/context/AuthContext";
import EmailVerificationScreen from "../screens/email-verification/EmailVerificationScreen";
import EnrollMFAScreen from "src/screens/enroll-mfa/EnrollMFAScreen";
import PieIcon from "src/shared/icons/PieIcon";

const AppNavigation = () => {
  const { user, mfaSkip } = useContext(AuthenticatedUserContext);
  const { hasMfaAuth } = useMFA();

  const Tab = createBottomTabNavigator();
  const { width } = useWindowDimensions();

  const tabIndicatorOffsetValue = useRef(
    new Animated.Value((1 * width) / 5)
  ).current;

  if (!user?.emailVerified) {
    return <EmailVerificationScreen />;
  }

  if (!hasMfaAuth && !mfaSkip) {
    return <EnrollMFAScreen />;
  }

  const EMPTY_SCREEN = () => {
    return <View> </View>;
  };

  const animation = (value: number) => {
    const toValue = (value * width) / 5;
    return Animated.spring(tabIndicatorOffsetValue, {
      toValue,
      useNativeDriver: false,
    }).start();
  };

  const TAB_OPTIONS: BottomTabNavigationOptions = {
    headerStyle: {
      backgroundColor: APP_COLORS.BACKGROUND_COLOR,
      elevation: 0,
      height: 140,
    },
    headerTitleStyle: {
      fontFamily: APP_FONTS.FONT_FAMILY_BOLD,
      fontSize: APP_FONTS.FONT_SIZE_XXL,
      color: APP_COLORS.COLOR_WHITE,
    },
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarStyle: [
            {
              backgroundColor: APP_COLORS.BACKGROUND_COLOR,
              elevation: 0,
              position: "absolute",
              bottom: 0,
              alignItems: "flex-end",
              shadowOffset: {
                width: 0,
                height: 0, // for iOS
              },
              height: 80,
              borderTopWidth: 0,
            },
            null,
          ],
          tabBarIcon: ({ color, size, focused }) => {
            if (route.name === "Dashboard") {
              return (
                <HomeIcon
                  fill={
                    focused ? APP_COLORS.PRIMARY_COLOR : APP_COLORS.COLOR_WHITE
                  }
                  secondaryFill={
                    focused ? APP_COLORS.PRIMARY_DARK : APP_COLORS.COLOR_WHITE
                  }
                />
              );
            }
            if (route.name === "Category") {
              return (
                <CategoryIcon
                  fill={
                    focused ? APP_COLORS.PRIMARY_COLOR : APP_COLORS.COLOR_WHITE
                  }
                  secondaryFill={
                    focused ? APP_COLORS.PRIMARY_DARK : APP_COLORS.COLOR_WHITE
                  }
                />
              );
            }
            if (route.name === "List") {
              return (
                <ListIcon
                  fill={
                    focused ? APP_COLORS.PRIMARY_COLOR : APP_COLORS.COLOR_WHITE
                  }
                  secondaryFill={
                    focused ? APP_COLORS.PRIMARY_DARK : APP_COLORS.COLOR_WHITE
                  }
                />
              );
            }
            if (route.name === "Profile") {
              return (
                <ProfileIcon
                  fill={
                    focused ? APP_COLORS.PRIMARY_COLOR : APP_COLORS.COLOR_WHITE
                  }
                  secondaryFill={
                    focused
                      ? APP_COLORS.BACKGROUND_COLOR
                      : APP_COLORS.BACKGROUND_COLOR
                  }
                />
              );
            }

            if (route.name === "ADD BUTTON") {
              return (
                <View
                  style={{
                    position: "absolute",
                    bottom: 25,
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      top: 5,
                      backgroundColor: APP_COLORS.SECONDARY_DARK,
                      height: 48,
                      width: 48,
                      borderRadius: 100,
                      opacity: 0.6,
                    }}
                  ></View>
                  <Pressable
                    style={({ pressed }) => [
                      {
                        transform: [
                          {
                            translateY: pressed ? 6 : 0,
                          },
                        ],
                      },
                    ]}
                  >
                    <AddIcon
                      fill={APP_COLORS.SECONDARY}
                      secondaryFill={APP_COLORS.COLOR_WHITE}
                      height={48}
                      width={48}
                    ></AddIcon>
                  </Pressable>
                </View>
              );
            }
          },
        })}
      >
        <Tab.Screen
          options={{
            ...TAB_OPTIONS,
            headerRight: () => {
              return (
                <Pressable
                  style={({ pressed }) => [
                    {
                      marginHorizontal: 12,
                      opacity: pressed ? 0.6 : 1,
                      alignItems: "center",
                    },
                  ]}
                >
                  <PieIcon
                    fill={APP_COLORS.PRIMARY_COLOR}
                    secondaryFill={APP_COLORS.PRIMARY_DARK}
                  ></PieIcon>
                </Pressable>
              );
            },
          }}
          name="Dashboard"
          component={DashboardScreen}
          listeners={() => ({
            tabPress: () => {
              animation(1);
            },
          })}
        ></Tab.Screen>
        <Tab.Screen
          options={TAB_OPTIONS}
          name="Category"
          component={CategoryScreen}
          listeners={() => ({
            tabPress: () => {
              animation(2);
            },
          })}
        ></Tab.Screen>
        <Tab.Screen
          component={EMPTY_SCREEN}
          name="ADD BUTTON"
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault();
            },
          })}
        ></Tab.Screen>
        <Tab.Screen
          options={TAB_OPTIONS}
          name="List"
          component={ListScreen}
          listeners={() => ({
            tabPress: () => {
              animation(4);
            },
          })}
        ></Tab.Screen>
        <Tab.Screen
          options={TAB_OPTIONS}
          name="Profile"
          component={ProfileScreen}
          listeners={() => ({
            tabPress: () => {
              animation(5);
            },
          })}
        ></Tab.Screen>
      </Tab.Navigator>
      <Animated.View
        style={{
          width: 10,
          height: 10,
          borderRadius: 100,
          backgroundColor: APP_COLORS.PRIMARY_COLOR,
          position: "absolute",
          bottom: 10,
          left: tabIndicatorOffsetValue,
          transform: [
            {
              translateX: -width / 5 / 2 - 5,
            },
          ],
        }}
      ></Animated.View>
    </>
  );
};

export default AppNavigation;
