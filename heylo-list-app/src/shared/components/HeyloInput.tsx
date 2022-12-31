import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { isDataNotEmpty } from "../util/CommonUtils";
import { APP_COLORS } from "@theme/colors";
import { APP_FONTS } from "@theme/fonts";
import { Ionicons } from "@expo/vector-icons";

export interface HeyloInputProps {
  type: "Text" | "Password" | "Email" | "Number" | "Phone";
  readonly: boolean;
  placeholder?: string;
  label?: string;
  onTextChange?: (text: string) => void;
  validationError?: string;
}

// default
// number-pad
// decimal-pad
// numeric
// email-address
// phone-pad
// url

const KEYBOARD_TYPES: { [key in string]: KeyboardTypeOptions } = {
  Email: "email-address",
  Text: "default",
  Password: "default",
  Number: "numeric",
  Phone: "phone-pad",
};

const HeyloInput = ({ ...props }: HeyloInputProps) => {
  const placeHolderColor: string = APP_COLORS.TEXT_COLOR_ACCENT;
  const isSecureField: boolean = props.type === "Password";
  const [hidePassword, setHidePassword] = useState<boolean>(isSecureField);
  const keyboardType = KEYBOARD_TYPES[props.type];

  return (
    <View style={styles.heylo_input_container}>
      <Text style={styles.heylo_label}> {props.label}</Text>
      <View>
        <TextInput
          style={[
            styles.heylo_input,
            {
              borderColor: isDataNotEmpty(props.validationError)
                ? APP_COLORS.COLOR_RED
                : APP_COLORS.PRIMARY_COLOR,
            },
          ]}
          placeholder={props.placeholder}
          placeholderTextColor={placeHolderColor}
          secureTextEntry={hidePassword}
          onChangeText={props.onTextChange}
          keyboardType={keyboardType}
        ></TextInput>
        {isSecureField && (
          <Ionicons
            style={styles.heylo_password_icon_style}
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            color={APP_COLORS.PRIMARY_LIGHT}
            size={24}
          ></Ionicons>
        )}
        {isDataNotEmpty(props.validationError) && (
          <Text style={styles.heylo_error_text}> {props.validationError} </Text>
        )}
      </View>
    </View>
  );
};

export default HeyloInput;

const styles = StyleSheet.create({
  heylo_input_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  heylo_input: {
    backgroundColor: APP_COLORS.ACCENT_COLOR,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: "solid",
    height: 64,
    padding: 8,
    color: APP_COLORS.COLOR_WHITE,
    fontFamily: APP_FONTS.FONT_FAMILY_SEMI_BOLD,
    fontSize: APP_FONTS.FONT_SIZE_MEDIUM,
  },
  heylo_label: {
    color: APP_COLORS.TEXT_COLOR_ACCENT,
    fontFamily: APP_FONTS.FONT_FAMILY_SEMI_BOLD,
    fontSize: APP_FONTS.FONT_SIZE_LARGE,
    marginVertical: 16,
    flexGrow: 1,
  },

  heylo_password_icon_style: {
    position: "absolute",
    right: 12,
    top: 32,
    transform: [
      {
        translateY: -14,
      },
    ],
  },

  heylo_error_text: {
    color: APP_COLORS.COLOR_RED,
    marginVertical: 8,
  },
});
