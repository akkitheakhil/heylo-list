import {
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
import {
  AUTH_ERRORS,
  DEFAULT_AUTH_ERROR,
  useSignInWithGoogle,
} from "src/firebase/FirebaseAuth";
import { useCreateUserWithEmailAndPassword } from "../../firebase/FirebaseAuth";
import { UserSchemaValidation } from "@shared/validations/UserSchemaValidations";
import { fromZodError } from "zod-validation-error";
import { z } from "zod";
import { APP_COLORS } from "src/theme/colors";
import { isDataNotEmpty } from "../../shared/util/CommonUtils";

const RegisterScreen = ({ navigation }) => {
  type UserSchema = z.infer<typeof UserSchemaValidation>;
  const headerHeight = useHeaderHeight() + 100;

  const [userForm, setUserForm] = useState<UserSchema>({
    email: "",
    password: "",
    displayName: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<UserSchema>>({});

  const { callSignInWithGoogle } = useSignInWithGoogle();
  const { user, loading, error, callCreateUserWithEmailPassword } =
    useCreateUserWithEmailAndPassword();

  const registerUser = () => {
    let isFormValid = true;
    try {
      UserSchemaValidation.parse(userForm);
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
    const { email, password, displayName } = userForm;
    callCreateUserWithEmailPassword(email, password, displayName);
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
              <Text style={styles.header_text}>Register</Text>
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
              <HeyloInput
                readonly={false}
                type="Text"
                label="Display Name"
                placeholder="John Doe"
                onTextChange={(text) => handleInput(text, "displayName")}
                validationError={formErrors.displayName}
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
              <HeyloButtonRegular label="REGISTER" onPress={registerUser} />
            </View>
            <View style={styles.secondary_action}>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={styles.secondary_action_text}>
                  Already have an account?{" "}
                  <Text style={styles.secondary_action_text_cta}> Login</Text>{" "}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = LoginRegisterStyles;
