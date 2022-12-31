import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import GoogleIcon from "../icons/GoogleIcon";
import { APP_COLORS } from "../../theme/colors";
import { CustomIcon } from "../icons/CustomIcons";

export interface SocialButtonProps {
  icon: string;
  fill: string;
  width?: string;
  secondaryFill?: string;
  action: () => any;
}

const SocialButton = ({ icon, fill, width, action }: SocialButtonProps) => {
  const iconElement = CustomIcon(icon);
  return (
    <TouchableOpacity
      onPress={action}
      style={[styles.social_button_container, { width: width ?? "100%" }]}
    >
      {iconElement({ fill })}
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  social_button_container: {
    width: "100%",
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: APP_COLORS.BACKGROUND_COLOR_SECONDARY,
    borderWidth: 2,
    borderColor: APP_COLORS.PRIMARY_COLOR,
    borderStyle: "solid",
  },
});
