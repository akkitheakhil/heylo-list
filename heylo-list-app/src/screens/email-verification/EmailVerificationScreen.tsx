import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { APP_COLORS } from "@theme/colors";
import HeyloButtonRegular from "@shared/components/HeyloButtonRegular";
import Illustrations from "@shared/icons/Illustrations";
import { APP_FONTS } from "@theme/fonts";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useResendEmail, useSignInWithGoogle } from "src/firebase/FirebaseAuth";

const EmailVerificationScreen = () => {
  const { width } = useWindowDimensions();

  const { callEmailVerification, checkCanUserContinue } = useResendEmail();

  return (
    <View style={styles.container}>
      <View style={[styles.image, { width }]}>
        <Illustrations icon="emailVerified" />
      </View>
      <View style={{ flex: 0.4, padding: 4 }}>
        <Text style={styles.title_text}> Email Verification</Text>
        <Text style={styles.description_text}>
          In order to complete your registration, please click on the
          confirmation link we sent to your email address. If you did not
          receive the email, please check your spam folder or request a new
          confirmation email by clicking the link below. Once the email is
          verified, please click continue.
        </Text>
      </View>
      <View>
        <HeyloButtonRegular label="Continue" onPress={checkCanUserContinue} />
      </View>
      <View style={styles.action_cta}>
        <Pressable
          onPress={callEmailVerification}
          style={({ pressed }) => ({
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Text style={styles.secondary_action_text}>Resend email</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EmailVerificationScreen;

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
    fontFamily: APP_FONTS.FONT_FAMILY_MEDIUM,
    textAlign: "justify",
    fontSize: APP_FONTS.FONT_SIZE_REGULAR,
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
