import React, { useContext } from "react";
import { Image, View, StyleSheet, Text, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { Icon } from "@rneui/base";
import {
  AddServiceStackNavigator,
  CategoryStackNavigator,
  ChatStackNavigator,
  HomeScreenStackNavigator,
  LoginStackNavigator,
  ProfileStackNavigator,
} from "./MainStackNavigation";
import { MAIN_COLOR } from "../constant";
import MainContext from "../contexts/MainContext";
import SplashScreen from "../screens/SplashScreen";

const TABS = [
  {
    name: "HomeTab",
    title: "Нүүр",
    icon: "home-outline",
    iconActive: "home",
    iconType: "ionicon",
    component: HomeScreenStackNavigator,
  },
  {
    name: "CatTab",
    title: "Ангилал",
    icon: "document-text-outline",
    iconActive: "document-text",
    iconType: "ionicon",
    component: CategoryStackNavigator,
  },
  {
    name: "AddTab",
    title: "Нэмэх",
    icon: "add-circle-outline",
    iconActive: "add-circle",
    iconType: "ionicon",
    component: AddServiceStackNavigator,
  },
  {
    name: "ChatTab",
    title: "Чат",
    icon: "chatbubbles-outline",
    iconActive: "chatbubbles",
    iconType: "ionicon",
    component: ChatStackNavigator,
  },
  {
    name: "ProfileTab",
    title: "Профайл",
    icon: "person-circle-outline",
    iconActive: "person-circle",
    iconType: "ionicon",
    component: ProfileStackNavigator,
  },
];

const BottomTab = createBottomTabNavigator();

const BottomBar = () => {
  const state = useContext(MainContext);
  if (state.isLoading) {
    // Апп ачааллах бүрт SplashScreen харуулах
    return <SplashScreen />;
  } else if (!state.isLoading && !state.isLoggedIn) {
    // Нэвтрээгүй үед
    return <LoginStackNavigator />;
  } else {
    return (
      <BottomTab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          tabBarBackground: () => (
            <BlurView
              intensity={Platform.OS == "ios" ? 50 : 20}
              style={{
                ...StyleSheet.absoluteFillObject,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                overflow: "hidden",
                backgroundColor: "transparent",
              }}
              experimentalBlurMethod="dimezisBlurView"
              tint="light"
            />
          ),
        }}
      >
        {TABS.map((tab, index) => (
          <BottomTab.Screen
            key={`${tab.title}_${index}`}
            name={tab.title}
            component={tab.component}
            options={{
              tabBarIcon: ({ focused }) => (
                <Icon
                  name={focused ? tab.iconActive : tab.icon}
                  type={tab.iconType}
                  size={25}
                  color={focused ? MAIN_COLOR : "#000"}
                />
              ),
              tabBarLabel: ({ focused }) => (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 13,
                    color: focused ? MAIN_COLOR : "#000",
                  }}
                >
                  {tab.title}
                </Text>
              ),
              tabBarLabelPosition: "below-icon",
            }}
          />
        ))}
      </BottomTab.Navigator>
    );
  }
};
// <NavigationContainer>

// </NavigationContainer>

export default BottomBar;
