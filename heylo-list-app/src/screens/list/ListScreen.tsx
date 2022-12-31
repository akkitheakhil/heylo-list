import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { APP_COLORS } from "src/theme/colors";

const ListScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: APP_COLORS.BACKGROUND_COLOR,
      }}
    >
      <Text>ListScreen</Text>
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({});
