import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { APP_COLORS } from "src/theme/colors";
import { AuthenticatedUserContext } from "../../context/AuthContext";
import { APP_FONTS } from "../../theme/fonts";
import { CategoryListGrid } from "../../shared/components/HeyloCategoryList";
import DashboardCategoryItems from "./components/DashboardCategoryItems";

const DashboardScreen = () => {
  const { user } = useContext(AuthenticatedUserContext);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_COLORS.BACKGROUND_COLOR,
        paddingHorizontal: 18,
        paddingVertical: 12,
      }}
    >
      <Text style={styles.welcome_text}>
        Hey,
        <Text style={styles.welcome_text_name} numberOfLines={1}>
          {" "}
          {user?.displayName}
        </Text>
      </Text>
      <DashboardCategoryItems />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  welcome_text: {
    fontFamily: APP_FONTS.FONT_FAMILY_SEMI_BOLD,
    color: APP_COLORS.COLOR_WHITE,
    fontSize: APP_FONTS.FONT_SIZE_EXTRA_LARGE,
  },
  welcome_text_name: {
    color: APP_COLORS.SECONDARY,
  },
});
