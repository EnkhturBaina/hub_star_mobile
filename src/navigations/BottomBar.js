import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { Icon } from "@rneui/base";
import {
  CategoryStackNavigator,
  ChatStackNavigator,
  HomeScreenStackNavigator,
  ProfileStackNavigator,
} from "./MainStackNavigation";
import { MAIN_COLOR } from "../constant";

const DummyTabScene = () => {
  return (
    <View>
      <Text>DummyTabScene</Text>
    </View>
  );
};

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
    component: DummyTabScene,
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

// We're showing an indicator image in place of the label
const tabBarLabel = ({ focused }) => (
  <Image
    style={{ width: 14, height: 5, opacity: focused ? 1 : 0 }}
    source={require("../../assets/icon.png")}
  />
);

const BottomTab = createBottomTabNavigator();

const BottomBar = () => (
  // <NavigationContainer>
  <BottomTab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        position: "absolute",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "rgb(47, 64, 85)",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      tabBarBackground: () => (
        <BlurView
          // tint="light"
          // control the intensity of the blur effect
          intensity={80}
          style={{
            ...StyleSheet.absoluteFillObject,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: "hidden",
            backgroundColor: "transparent",
          }}
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
  // </NavigationContainer>
);

export default BottomBar;
