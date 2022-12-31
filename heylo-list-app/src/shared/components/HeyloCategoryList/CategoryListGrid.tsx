import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { APP_COLORS } from "../../../theme/colors";
import { ICategoryList } from "src/shared/models/ICategoryList";
import { isDataNotEmpty } from "../../util/CommonUtils";

interface CategoryListGridProps {
  data: ICategoryList[];
  itemsToDisplay?: number;
}

const CategoryListGrid = ({ data, itemsToDisplay }: CategoryListGridProps) => {
  const { width } = useWindowDimensions();

  const [dataToDisplay, setDataToDisplay] = useState(data);

  const gridWidth = width / 2 - 36;

  useEffect(() => {
    if (isDataNotEmpty(itemsToDisplay)) {
      setDataToDisplay(data.slice(0, itemsToDisplay));
    }
  }, [itemsToDisplay]);

  const COLORS = [
    APP_COLORS.CARD_COLOR_1,
    APP_COLORS.CARD_COLOR_2,
    APP_COLORS.CARD_COLOR_3,
    APP_COLORS.CARD_COLOR_4,
    APP_COLORS.CARD_COLOR_5,
  ];

  return (
    <FlatList
      style={{ flex: 1, marginTop: 24, marginBottom: 86 }}
      data={dataToDisplay}
      keyExtractor={(item) => item.id}
      numColumns={2}
      scrollEnabled={true}
      showsVerticalScrollIndicator
      renderItem={({ item, index }) => {
        let style = {
          backgroundColor: COLORS[0],
          marginTop: 0,
          height: gridWidth,
          margin: 8,
          borderRadius: 8,
          width: gridWidth,
        };

        if (index % 2 === 1) {
          style.marginTop = 20;
        }

        style.backgroundColor = COLORS[Math.round(index % 5)];

        return <View style={style} />;
      }}
    />
  );
};

export default CategoryListGrid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    alignItems: "stretch",
    flexDirection: "row",
    marginTop: 24,
  },

  category_item: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    display: "flex",
    backgroundColor: APP_COLORS.CARD_COLOR_1,
    marginHorizontal: 8,
  },
});
