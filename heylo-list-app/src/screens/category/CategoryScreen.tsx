import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { APP_COLORS } from "src/theme/colors";

const CategoryScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: APP_COLORS.BACKGROUND_COLOR,
      }}
    >
      <Text>CategoryScreen</Text>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({});
