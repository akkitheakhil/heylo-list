import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { APP_COLORS } from "src/theme/colors";
import { APP_FONTS } from "src/theme/fonts";
import HeyloButtonRegular from "src/shared/components/HeyloButtonRegular";
import Illustrations from "src/shared/icons/Illustrations";
import { useMFA } from "../../firebase/FirebaseAuth";

const EnrollMFAScreen = () => {
  const { width } = useWindowDimensions();
  const { skipMFA } = useMFA();
  return (
    <View style={styles.container}>
      <View style={[styles.image, { width }]}>
        <Illustrations icon="mfaEnroll" />
      </View>
      <View style={{ flex: 0.7, padding: 4 }}>
        <Text style={styles.title_text}> Enroll for MFA</Text>
        <Text style={styles.description_text}>
          MFA adds an extra layer of security to your account by requiring you
          to provide a second form of authentication when logging in or
          accessing sensitive information. We strongly recommend that all users
          enroll in MFA to ensure the security of our systems. Enrolling in MFA
          only takes a few minutes and is easy to do, click continue to enroll
          now or skip to add MFA later.
        </Text>
      </View>
      <View>
        <HeyloButtonRegular label="Setup MFA" />
      </View>
      <View style={styles.action_cta}>
        <Pressable
          onPress={skipMFA}
          style={({ pressed }) => ({
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Text style={styles.secondary_action_text}>Skip for now</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EnrollMFAScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.BACKGROUND_COLOR,
    padding: 24,
  },
  image: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  title_text: {
    fontSize: APP_FONTS.FONT_SIZE_XXL,
    color: APP_COLORS.PRIMARY_COLOR,
    fontFamily: APP_FONTS.FONT_FAMILY_SEMI_BOLD,
    textAlign: "center",
    marginBottom: 12,
  },

  description_text: {
    color: APP_COLORS.COLOR_WHITE,
    fontFamily: APP_FONTS.FONT_FAMILY_LIGHT,
    textAlign: "justify",
    fontSize: APP_FONTS.FONT_SIZE_MEDIUM,
  },
  action_cta: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
  secondary_action_text: {
    fontFamily: APP_FONTS.FONT_FAMILY_MEDIUM,
    fontSize: APP_FONTS.FONT_SIZE_MEDIUM,
    color: APP_COLORS.SECONDARY,
    alignSelf: "center",
  },
});
