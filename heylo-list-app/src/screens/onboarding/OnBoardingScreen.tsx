import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Pressable,
} from "react-native";
import React, { useState, useRef, useContext, RefObject } from "react";
import { AuthenticatedUserContext } from "../../context/AuthContext";
import { APP_COLORS } from "@theme/colors";
import HeyloSwiperNextButton from "@components/HeyloOnboardUser/HeyloSwiperNextButton";
import OnboardingItem from "@components/HeyloOnboardUser/OnboardingItem";
import OnboardSliderPaginator from "@components/HeyloOnboardUser/OnboardSliderPaginator";
import HeyloSwiperAnimatedBackground from "src/shared/components/HeyloOnboardUser/HeyloSwiperAnimatedBackground";
import { TouchableOpacity } from "react-native-gesture-handler";

export interface BoardingScreenData {
  id: string;
  title: string;
  description: string;
  image: string;
}

const OnBoardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const slidesRef = useRef<any>(null);

  const { setFirstTimeUser } = useContext(AuthenticatedUserContext);

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const onboardingScreens: BoardingScreenData[] = [
    {
      id: "1",
      title: "Lost online?",
      description: `Heylo list help you remember things you wanted to do, when you get lost online with custom reminders`,
      image: "lostOnline",
    },
    {
      id: "2",
      title: "Daily list",
      description: `Heylo list shows all the incomplete list at a glance, so you don't forget them later.`,
      image: "checkList",
    },
    {
      id: "3",
      title: "Shop with ease",
      description: `Heylo list help you add custom shopping lists, so you don't forget what you want to buy while you shop`,
      image: "completedList",
    },
    {
      id: "4",
      title: "Get Started",
      description: `Try 'Heylo List' today and never forget the important things in your life, ever!`,
      image: "getStarted",
    },
  ];
  const scrollTo = () => {
    if (currentIndex < onboardingScreens.length - 1) {
      slidesRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
        duration: 5000,
      });
    } else {
      setFirstTimeUser(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeyloSwiperAnimatedBackground scrollX={scrollX} />
      <View
        style={{
          position: "absolute",
          top: 48,
          right: 24,
          paddingVertical: 4,
          paddingHorizontal: 8,
          zIndex: 99,
        }}
      >
        <Pressable
          onPress={() => {
            slidesRef.current.scrollToIndex({
              index: 3,
              animated: true,
            });
          }}
          style={({ pressed }) => [
            {
              borderRadius: 16,
              backgroundColor: APP_COLORS.SECONDARY,
              paddingVertical: 4,
              paddingHorizontal: 8,
              zIndex: 99,
            },
            pressed
              ? {
                  opacity: 0.6,
                }
              : {
                  opacity: 1,
                },
          ]}
        >
          <Text style={{ color: APP_COLORS.COLOR_WHITE }}>SKIP</Text>
        </Pressable>
      </View>
      <View style={{ flex: 3 }}>
        <FlatList
          data={onboardingScreens}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          renderItem={({ item }) => <OnboardingItem onboardItem={item} />}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}
        />
      </View>
      <OnboardSliderPaginator data={onboardingScreens} scrollX={scrollX} />
      <HeyloSwiperNextButton
        percentage={(currentIndex + 1) * (100 / onboardingScreens.length)}
        scrollTo={scrollTo}
      />
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.BACKGROUND_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
});
