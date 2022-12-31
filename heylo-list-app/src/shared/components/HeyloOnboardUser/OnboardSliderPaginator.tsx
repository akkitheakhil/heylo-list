import {
  StyleSheet,
  Animated,
  View,
  useWindowDimensions,
  Easing,
} from "react-native";
import React from "react";
import { APP_COLORS } from "../../../theme/colors";

const OnboardSliderPaginator = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ flexDirection: "row", height: 64 }}>
      {data.map((_: any, i: number) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          easing: Easing.inOut(Easing.exp),
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={i.toString()}
          ></Animated.View>
        );
      })}
    </View>
  );
};

export default OnboardSliderPaginator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: APP_COLORS.PRIMARY_COLOR,
    marginHorizontal: 8,
  },
});
