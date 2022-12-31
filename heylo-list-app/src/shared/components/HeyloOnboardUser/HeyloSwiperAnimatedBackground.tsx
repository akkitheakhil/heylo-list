import {
  Animated,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { APP_COLORS } from "../../../theme/colors";

const HeyloSwiperAnimatedBackground = ({ scrollX }) => {
  const { height, width } = useWindowDimensions();

  const YOLO_ANIMATE = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );

  const rotateAnimate = YOLO_ANIMATE.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["45deg", "10deg", "45deg"],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height,
          width: height,
          left: -height * 0.3,
          top: -height * 0.65,
          transform: [
            {
              rotate: rotateAnimate,
            },
          ],
        },
      ]}
    ></Animated.View>
  );
};

export default HeyloSwiperAnimatedBackground;

const styles = StyleSheet.create({
  container: {
    backgroundColor: APP_COLORS.ACCENT_COLOR,
    borderRadius: 86,
    position: "absolute",
    opacity: 0.7,
  },
});
