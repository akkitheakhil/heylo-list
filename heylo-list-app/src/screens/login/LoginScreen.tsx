import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import HeyloInput from "@components/HeyloInput";
import SocialButton from "@components/SocialButton";
import HeyloButtonRegular from "@shared/components/HeyloButtonRegular";
import { LoginRegisterStyles } from "@shared/stylesheets/LoginRegisterStyles";
// Infrastructure
import { AUTH_ERRORS, useSignInWithGoogle } from "src/firebase/FirebaseAuth";
import { useSignInWithEmailAndPassword } from "../../firebase/FirebaseAuth";
import { useNavigation } from "@react-navigation/native";
import { APP_COLORS } from "src/theme/colors";
import { UserSchemaValidation } from "src/shared/validations/UserSchemaValidations";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { isDataNotEmpty } from "src/shared/util/CommonUtils";

const LoginScreen = ({ navigation }) => {
  const headerHeight = useHeaderHeight() + 100;
  const Scheme = UserSchemaValidation.omit({
    displayName: true,
  });
  type UserSchema = z.infer<typeof Scheme>;
  const [formErrors, setFormErrors] = useState<Partial<UserSchema>>({});
  const [userForm, setUserForm] = useState<UserSchema>({
    email: "",
    password: "",
  });

  const { callSignInWithGoogle } = useSignInWithGoogle();

  const { user, loading, error, callSignWithEmailPassword } =
    useSignInWithEmailAndPassword();

  const loginUser = () => {
    let isFormValid = true;
    try {
      Scheme.parse(userForm);
    } catch (err: any) {
      isFormValid = false;
      const validationError = fromZodError(err);
      validationError.details.forEach((issue) => {
        handleFormErrors(issue.message, issue.path[0].toString());
      });
    }

    if (!isFormValid) {
      return;
    }
    const { email, password } = userForm;
    callSignWithEmailPassword(email, password);
  };

  const handleFormErrors = (errorMessage: string, input: string) => {
    setFormErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const handleInput = (text: string, input: string) => {
    setUserForm((prevState) => ({ ...prevState, [input]: text }));
    handleFormErrors("", input);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.select({
          ios: 0,
          android: headerHeight,
        })}
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {loading ?? (
              <View style={styles.loading_screen_view}>
                <ActivityIndicator
                  size="large"
                  color={APP_COLORS.PRIMARY_COLOR}
                />
              </View>
            )}
            <View style={styles.header}>
              <Text style={styles.header_text}>LOGIN</Text>
            </View>
            <View>
              <Text style={styles.caption_text}>
                Login with your social account
              </Text>
            </View>
            <View style={styles.social_button_container}>
              <SocialButton
                fill="white"
                icon="google"
                width="48%"
                action={callSignInWithGoogle}
              />
              <SocialButton
                fill="white"
                icon="apple"
                width="48%"
                action={callSignInWithGoogle}
              />
            </View>
            <View style={styles.form_container}>
              <HeyloInput
                readonly={false}
                type="Email"
                label="Email"
                placeholder="email@example.com"
                onTextChange={(text) => handleInput(text, "email")}
                validationError={formErrors.email}
              />
              <HeyloInput
                readonly={false}
                type="Password"
                label="Password"
                placeholder="password"
                onTextChange={(text) => handleInput(text, "password")}
                validationError={formErrors.password}
              />
            </View>
            {isDataNotEmpty(error) && (
              <View>
                <Text style={styles.authentication_error}>
                  {AUTH_ERRORS[error.code]}
                </Text>
              </View>
            )}
            <View style={styles.actions_container}>
              <HeyloButtonRegular label="LOGIN" onPress={loginUser} />
            </View>
            <View style={styles.secondary_action}>
              <Pressable onPress={() => navigation.navigate("Register")}>
                <Text style={styles.secondary_action_text}>
                  Don’t have an account?{" "}
                  <Text style={styles.secondary_action_text_cta}> Sign up</Text>{" "}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = LoginRegisterStyles;
