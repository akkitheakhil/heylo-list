//import liraries
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { APP_COLORS } from "@theme/colors";
import { APP_FONTS } from "@theme/fonts";
import { ICategoryList } from "@shared/models/ICategoryList";
import { CategoryListGrid } from "src/shared/components/HeyloCategoryList";

const DashboardCategoryItems = () => {
  const data: ICategoryList[] = [
    {
      id: "13123",
      name: "Daily task",
      category_tasks: [],
    },
    {
      id: "13124",
      name: "Daily task 2",
      category_tasks: [],
    },
    {
      id: "13126",
      name: "Daily task 3",
      category_tasks: [],
    },
    {
      id: "131267",
      name: "Daily task 4",
      category_tasks: [],
    },
  ];

  return (
    <View style={styles.category_items}>
      <View style={styles.category_items_header}>
        <Text style={styles.category_items_header_text}>Categories</Text>
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.6 : 1,
            },
          ]}
        >
          <Text style={styles.category_items_header_action_text}>View all</Text>
        </Pressable>
      </View>
      <CategoryListGrid data={data} itemsToDisplay={2} />
    </View>
  );
};

const styles = StyleSheet.create({
  category_items: {
    flex: 1,
    flexDirection: "column",
    marginTop: 24,
  },
  category_items_header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  category_items_header_text: {
    fontFamily: APP_FONTS.FONT_FAMILY_BOLD,
    fontSize: APP_FONTS.FONT_SIZE_LARGE,
    color: APP_COLORS.COLOR_WHITE,
  },
  category_items_header_action_text: {
    fontFamily: APP_FONTS.FONT_FAMILY_MEDIUM,
    fontSize: APP_FONTS.FONT_SIZE_REGULAR,
    color: APP_COLORS.TEXT_COLOR_LIGHT,
  },
});

export default DashboardCategoryItems;
