import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSignOutUser } from "src/firebase/FirebaseAuth";
import { APP_COLORS } from "../../theme/colors";

const ProfileScreen = () => {
  const { error, callSignOut } = useSignOutUser();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: APP_COLORS.BACKGROUND_COLOR,
      }}
    >
      <Pressable
        onPress={callSignOut}
        style={{
          height: 40,
          width: 200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>Sign out</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
