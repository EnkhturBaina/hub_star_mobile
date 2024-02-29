import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreenStackNavigator,
  LoginStackNavigator,
  NewsScreenStackNavigator,
  ProfileStackNavigator,
} from "./MainStackNavigation";
import MainContext from "../contexts/MainContext";
import SplashScreen from "../screens/SplashScreen";
import { Icon } from "@rneui/base";
import { MAIN_COLOR } from "../constant";

const Tab = createBottomTabNavigator();

const tabData = [
  {
    name: "HomeTab",
    icon: <Icon name="home" type="feather" size={25} />,
    label: "Нүүр",
  },
  {
    name: "CatTab",
    icon: <Icon name="file-text" type="feather" size={25} />,
    label: "Ангилал",
  },
  {
    name: "AddTab",
    icon: <Icon name="plus-square" type="feather" size={25} />,
    label: "Нэмэх",
  },
  {
    name: "ChatTab",
    icon: <Icon name="message-circle" type="feather" size={25} />,
    label: "Чат",
  },
  {
    name: "ProfileTab",
    icon: <Icon name="user" type="feather" size={25} />,
    label: "Профайл",
  },
];

const renderTabIconLabel = (name) => {
  return tabData.map((el, index) => {
    if (el.name === name) {
      return (
        <View
          key={index}
          style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
        >
          {el.icon}
          <Text
            style={{
              textAlign: "center",
              fontSize: 13,
              color: el.name === name ? "red" : "green",
            }}
          >
            {el.label}
          </Text>
        </View>
      );
    }
  });
};
function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        borderTopStartRadius: 25,
        borderTopEndRadius: 25,
        paddingTop: 5,
        height: 90,
        paddingBottom: 10,
        justifyContent: "space-between",
        backgroundColor: "red",
      }}
      key={state.index}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              backgroundColor: isFocused ? MAIN_COLOR : "transparent",
              borderRadius: isFocused ? "100%" : 0,
            }}
          >
            {renderTabIconLabel(route.name)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const HomeScreenTabNavigation = () => {
  const state = useContext(MainContext);
  console.log("AA", state.isLoading);
  if (state.isLoading) {
    // Апп ачааллах бүрт SplashScreen харуулах
    return <SplashScreen />;
  } else if (!state.isLoading && !state.isLoggedIn) {
    // Нэвтрээгүй үед
    return <LoginStackNavigator />;
  } else {
    return (
      <Tab.Navigator
        tabBar={(props) => <MyTabBar {...props} />}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "red",
          },
        }}
        style={{ backgroundColor: "red" }}
      >
        <Tab.Screen name="HomeTab" component={HomeScreenStackNavigator} />
        <Tab.Screen name="CatTab" component={HomeScreenStackNavigator} />
        <Tab.Screen name="AddTab" component={HomeScreenStackNavigator} />
        <Tab.Screen name="ChatTab" component={HomeScreenStackNavigator} />
        <Tab.Screen name="ProfileTab" component={ProfileStackNavigator} />
      </Tab.Navigator>
    );
  }
};

export default HomeScreenTabNavigation;

const styles = StyleSheet.create({});
