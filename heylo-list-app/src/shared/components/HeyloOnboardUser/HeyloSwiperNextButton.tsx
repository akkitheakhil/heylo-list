import { Pressable, StyleSheet, Text, View, Animated } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Circle, G, Svg } from "react-native-svg";
import { APP_COLORS } from "@theme/colors";
import { AntDesign } from "@expo/vector-icons";

export interface HeyloSwiperNextButtonProps {
  percentage: number;
  scrollTo: () => void;
}

const HeyloSwiperNextButton = ({
  percentage,
  scrollTo,
}: HeyloSwiperNextButtonProps) => {
  const SIZE = 128;
  const STROKE_WIDTH = 4;
  const CENTER = SIZE / 2;
  const RADIUS = SIZE / 2 - STROKE_WIDTH / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const [buttonIcon, setButtonIcon] = useState<any>("arrowright");

  const progressRef = useRef<any>(null);

  const animation = (toValue: number) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
    if (percentage === 100) {
      setButtonIcon("check");
    } else {
      setButtonIcon("arrowright");
    }
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(({ value }) => {
      const strokeDashoffset = CIRCUMFERENCE - (CIRCUMFERENCE * value) / 100;
      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });
  }, [percentage]);

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE}>
        <G rotation={-90} origin={CENTER}>
          <Circle
            stroke={APP_COLORS.ACCENT_COLOR}
            cy={CENTER}
            cx={CENTER}
            r={RADIUS}
            strokeWidth={STROKE_WIDTH}
          />
          <Circle
            ref={progressRef}
            stroke={APP_COLORS.PRIMARY_DARK}
            cy={CENTER}
            cx={CENTER}
            r={RADIUS}
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={CIRCUMFERENCE}
          />
        </G>
      </Svg>
      <Pressable
        style={({ pressed }) => [
          pressed ? styles.button_pressed : styles.button_default,
          styles.button,
        ]}
        onPress={scrollTo}
      >
        <AntDesign
          name={buttonIcon}
          size={32}
          color={APP_COLORS.COLOR_WHITE}
        ></AntDesign>
      </Pressable>
    </View>
  );
};

export default HeyloSwiperNextButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 140,
  },
  button: {
    position: "absolute",
    backgroundColor: APP_COLORS.SECONDARY,
    borderRadius: 100,
    padding: 20,
  },

  button_default: {
    opacity: 1,
  },

  button_pressed: {
    opacity: 0.6,
  },
});
