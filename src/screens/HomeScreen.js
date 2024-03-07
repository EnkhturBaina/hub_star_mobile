import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Linking,
  Animated,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import MainContext from "../contexts/MainContext";
import Constants from "expo-constants";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import {
  GRADIENT_END,
  GRADIENT_START,
  GRAY_ICON_COLOR,
  MAIN_BORDER_RADIUS,
  MAIN_COLOR,
  MAIN_COLOR_GRAY,
  SERVER_URL,
} from "../constant";
import Carousel from "react-native-reanimated-carousel";
import featuresData from "../featuresData";

const HomeScreen = (props) => {
  const state = useContext(MainContext);
  const tabBarHeight = useBottomTabBarHeight();
  const [selectedType, setSelectedType] = useState(null);

  const ref = useRef();

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const H_MAX_HEIGHT = height * 0.2 + 30;
  const H_MIN_HEIGHT = 0;
  const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const headerScrollHeight = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [H_MAX_HEIGHT - 20, H_MIN_HEIGHT - 20],
    extrapolate: "clamp",
  });
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#fff",
        paddingBottom: tabBarHeight,
      }}
    >
      <StatusBar
        translucent
        barStyle={Platform.OS == "ios" ? "dark-content" : "default"}
      />
      <View style={styles.headerContainer}>
        <Image
          style={styles.headerLogo}
          source={require("../../assets/Logo.png")}
        />
        <View style={styles.headerIcons}>
          <Icon
            name="bell"
            type="feather"
            size={28}
            style={{ marginRight: 10 }}
            onPress={() => console.log("X")}
          />
          <Icon
            name="chatbox-ellipses-outline"
            type="ionicon"
            size={30}
            onPress={() => console.log("X")}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.searchContainer}
        activeOpacity={1}
        onPress={() => {
          // props.navigation.navigate("SearchScreen")
        }}
      >
        <View style={styles.searchInput}>
          <Icon
            name="search"
            type="feather"
            size={20}
            color={GRAY_ICON_COLOR}
          />
          <Text
            style={{
              color: GRAY_ICON_COLOR,
              marginLeft: 10,
            }}
          >
            Хайх
          </Text>
        </View>
        <Icon name="sliders" type="feather" size={20} color={GRAY_ICON_COLOR} />
      </TouchableOpacity>
      <View style={{ marginVertical: 10 }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {state.customerTypes?.map((el, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.typeContainer,
                  {
                    marginLeft: index == 0 ? 20 : 10,
                    backgroundColor:
                      index == selectedType ? MAIN_COLOR : "#fff",
                  },
                ]}
                onPress={() => setSelectedType(index)}
              >
                <Image
                  style={styles.typeLogo}
                  source={{ uri: SERVER_URL + "images/" + el.logo?.path }}
                />
                <Text
                  style={[
                    styles.typeText,
                    {
                      color: index == selectedType ? "#fff" : "#000",
                    },
                  ]}
                >
                  {el.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <Animated.View
        style={{
          height: headerScrollHeight,
          width: "100%",
          overflow: "hidden",
          zIndex: 999,
        }}
      >
        <View style={{ marginHorizontal: 20 }}>
          <Carousel
            width={width - 40}
            ref={ref}
            data={[...new Array(6).keys()]}
            pagingEnabled
            autoPlay
            autoPlayInterval={5000}
            style={{
              borderRadius: 8,
              height: height * 0.2,
            }}
            renderItem={({ item, index }) => (
              <Image
                source={{
                  uri: `https://dummyjson.com/image/400x200/282828?text=${index}!`,
                }}
                style={{
                  width: width - 24,
                  flex: 1,
                }}
                resizeMode="cover"
              />
            )}
            onSnapToItem={(e) => {}}
          />
        </View>
      </Animated.View>
      <Text style={{ fontWeight: 500, fontSize: 16, marginLeft: 20 }}>
        Онцгой үйлчилгээ
      </Text>
      <View style={styles.gridContainer}>
        {featuresData?.map((el, index) => {
          return (
            <View style={styles.gridItem} key={index}>
              <Image style={styles.featureIcon} source={el.icon} />
              <Text style={styles.featureText}>{el.title}</Text>
            </View>
          );
        })}
      </View>
      <Text
        style={{ fontWeight: 500, fontSize: 16, marginLeft: 20, marginTop: 10 }}
      >
        Үндсэн үйлчилгээ
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  headerLogo: {
    resizeMode: "contain",
    width: 120,
    height: 35,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: MAIN_COLOR_GRAY,
    borderRadius: MAIN_BORDER_RADIUS,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    marginHorizontal: 20,
  },
  searchInput: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  typeLogo: {
    resizeMode: "contain",
    width: 30,
    height: 30,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    backgroundColor: "#fff",
    marginVertical: 5,
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: MAIN_BORDER_RADIUS,
  },
  typeText: {
    marginLeft: 5,
    textTransform: "uppercase",
    fontWeight: 500,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginHorizontal: 20,
    gap: 2,
  },
  gridItem: {
    marginTop: 10,
    borderRadius: MAIN_BORDER_RADIUS,
    height: 70,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    backgroundColor: "#fff",
    width: "48%", // is 50% of container width
  },
  featureIcon: {
    resizeMode: "contain",
    width: 40,
    height: 40,
  },
  featureText: {
    flex: 1,
    marginLeft: 5,
    color: "#798585",
    fontWeight: 500,
    flexShrink: 1,
  },
});
