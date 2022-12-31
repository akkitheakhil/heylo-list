import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { APP_COLORS } from "src/theme/colors";
import { APP_FONTS } from "src/theme/fonts";

export interface HeyloButtonProps {
  label: string;
  onPress?: () => void;
}

const HeyloButtonRegular = ({ label, onPress }: HeyloButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        pressed ? styles.heylo_button_pressed : styles.heylo_button_default,
        styles.heylo_button,
      ]}
    >
      <View style={styles.heylo_button}>
        <Text style={styles.button_text}>{label}</Text>
      </View>
    </Pressable>
  );
};

export default HeyloButtonRegular;

const styles = StyleSheet.create({
  heylo_button: {
    width: "100%",
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  heylo_button_pressed: {
    backgroundColor: APP_COLORS.BACKGROUND_COLOR_SECONDARY,
    borderStyle: "solid",
    opacity: 0.6,
  },
  heylo_button_default: {
    backgroundColor: APP_COLORS.PRIMARY_DARK,
    borderStyle: "solid",
  },
  button_text: {
    color: APP_COLORS.COLOR_WHITE,
    fontFamily: APP_FONTS.FONT_FAMILY_SEMI_BOLD,
    fontSize: APP_FONTS.FONT_SIZE_LARGE,
  },
});
