import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import MainContext from "../contexts/MainContext";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import CategoryScreen from "../screens/Category/CategoryScreen";
import ChatScreen from "../screens/Chat/ChatScreen";

const Stack = createStackNavigator();
const width = Dimensions.get("screen").width;

const LoginStackNavigator = (props) => {
  const state = useContext(MainContext);
  return (
    <Stack.Navigator
      initialRouteName="LoginTab"
      screenOptions={{
        headerStyle: {
          shadowColor: "transparent",
          elevation: 0,
        },
      }}
    >
      <Stack.Screen
        name="LoginTab"
        component={LoginScreen}
        options={{
          title: "",
          headerShown: false,
          headerTitleStyle: {},
          headerLeft: () => <></>,
        }}
      />
    </Stack.Navigator>
  );
};

const HomeScreenStackNavigator = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        // headerShown: false,
        headerStyle: {
          shadowColor: "transparent",
          elevation: 0,
        },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: "",
          headerTitleStyle: {},
          headerLeft: () => <></>,
        }}
      />
    </Stack.Navigator>
  );
};

const CategoryStackNavigator = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="CategoryScreen"
      screenOptions={{
        // headerShown: false,
        headerStyle: {
          shadowColor: "transparent",
          elevation: 0,
        },
      }}
    >
      <Stack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{
          headerShown: false,
          title: "",
          headerTitleStyle: {},
          headerLeft: () => <></>,
        }}
      />
    </Stack.Navigator>
  );
};

const ChatStackNavigator = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="ChatScreen"
      screenOptions={{
        // headerShown: false,
        headerStyle: {
          shadowColor: "transparent",
          elevation: 0,
        },
      }}
    >
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerShown: false,
          title: "",
          headerTitleStyle: {},
          headerLeft: () => <></>,
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerStyle: {
          shadowColor: "transparent",
          elevation: 0,
        },
      }}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "",
          headerShown: false,
          headerLeft: () => <></>,
        }}
      />
    </Stack.Navigator>
  );
};

export {
  LoginStackNavigator,
  HomeScreenStackNavigator,
  CategoryStackNavigator,
  ChatStackNavigator,
  ProfileStackNavigator,
};

const styles = StyleSheet.create({
  headerLeftContainer: {
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    width: width - 20,
  },
  headerLeftText: {
    marginLeft: 5,
    fontSize: 18,
  },
});
