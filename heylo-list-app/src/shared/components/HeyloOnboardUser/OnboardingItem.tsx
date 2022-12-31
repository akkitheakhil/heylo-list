import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";

import { APP_COLORS } from "src/theme/colors";
import { APP_FONTS } from "src/theme/fonts";
import Illustrations from "src/shared/icons/Illustrations";

export interface OnboardScreenItemsProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

const OnboardingItem = ({
  onboardItem,
}: {
  onboardItem: OnboardScreenItemsProps;
}) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <View style={[styles.image, { width }]}>
        <Illustrations icon={onboardItem.image} />
      </View>
      <View style={{ flex: 0.3, padding: 4 }}>
        <Text style={styles.title_text}> {onboardItem.title}</Text>
        <Text style={styles.description_text}> {onboardItem.description}</Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },

  title_text: {
    fontSize: APP_FONTS.FONT_SIZE_XXL,
    color: APP_COLORS.PRIMARY_COLOR,
    fontFamily: APP_FONTS.FONT_FAMILY_SEMI_BOLD,
    textAlign: "center",
  },

  description_text: {
    color: APP_COLORS.COLOR_WHITE,
    fontFamily: APP_FONTS.FONT_FAMILY_REGULAR,
    textAlign: "center",
    fontSize: APP_FONTS.FONT_SIZE_MEDIUM,
  },
});
