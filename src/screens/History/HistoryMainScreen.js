import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Dimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import MainContext from "../../contexts/MainContext";
import Constants from "expo-constants";
import {
  GRAY_ICON_COLOR,
  MAIN_BORDER_RADIUS,
  MAIN_COLOR,
  MAIN_COLOR_GRAY,
} from "../../constant";
import { Icon } from "@rneui/base";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PostedScreen from "./screens/PostedScreen";
import DoingScreen from "./screens/DoingScreen";
import SavedScreen from "./screens/SavedScreen";
import HistoryScreen from "./screens/HistoryScreen";
import AdviceScreen from "./screens/AdviceScreen";

const Tab = createMaterialTopTabNavigator();
const HistoryMainScreen = (props) => {
  const state = useContext(MainContext);
  const totalWidth = Dimensions.get("screen").width;
  const tabBarHeight = useBottomTabBarHeight();
  const [selectedType, setSelectedType] = useState(null);

  const menu = [
    {
      id: 1,
      name: "Байршуулсан үйлчилгээ",
    },
    {
      id: 2,
      name: "Хийгдэж буй ажил",
    },
    {
      id: 3,
      name: "Хадгалсан  үйлчилгээнүүд",
    },
    {
      id: 4,
      name: "Үйлчилгээний түүх",
    },
    {
      id: 5,
      name: "Зөвлөмжүүд",
    },
  ];
  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingBottom: tabBarHeight,
      }}
    >
      <StatusBar
        translucent
        barStyle={Platform.OS == "ios" ? "dark-content" : "default"}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarAndroidRipple: {
            color: "transparent",
          },
          tabBarLabelStyle: {
            width: "100%",
            textTransform: "none",
          },
          tabBarItemStyle: {
            width: "auto",
            marginRight: 10,
          },
          tabBarStyle: {
            backgroundColor: "#fff",
          },
          tabBarIndicatorStyle: {
            backgroundColor: MAIN_COLOR,
            height: 5,
            // width: 50,
          },
          tabBarScrollEnabled: true,
        }}
      >
        <Tab.Screen name="Байршуулсан үйлчилгээ" component={PostedScreen} />
        <Tab.Screen name="Хийгдэж буй ажил" component={DoingScreen} />
        <Tab.Screen name="Хадгалсан үйлчилгээнүүд" component={SavedScreen} />
        <Tab.Screen name="Үйлчилгээний түүх" component={HistoryScreen} />
        <Tab.Screen name="Зөвлөмжүүд" component={AdviceScreen} />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default HistoryMainScreen;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: MAIN_COLOR_GRAY,
    borderRadius: MAIN_BORDER_RADIUS,
    height: 50,
    paddingLeft: 20,
    paddingRight: 10,
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  searchInput: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
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
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: MAIN_BORDER_RADIUS,
  },
  filterText: {
    color: GRAY_ICON_COLOR,
    marginLeft: 10,
  },
  filterBtn: {
    height: "100%",
    justifyContent: "center",
    width: 40,
  },
});
