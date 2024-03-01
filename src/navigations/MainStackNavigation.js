import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import MainContext from "../contexts/MainContext";

import LoginOrRegisterScreen from "../screens/LoginOrRegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import CategoryScreen from "../screens/Category/CategoryScreen";
import ChatScreen from "../screens/Chat/ChatScreen";
import IntroSliderScreen from "../screens/IntroSliderScreen";
import RegisterScreen from "../screens/Register/RegisterScreen";
import ConfirmScreen from "../screens/Register/ConfirmScreen";
import OTPScreen from "../screens/Register/OTPScreen";
import BioScreen from "../screens/Register/BioScreen";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();
const width = Dimensions.get("screen").width;

const LoginStackNavigator = (props) => {
  const navigation = useNavigation();
  const state = useContext(MainContext);
  console.log("state.isLoggedIn", state.isLoggedIn);
  return (
    <Stack.Navigator
      initialRouteName={
        !state.isLoggedIn && !state.isIntroShow
          ? "IntroSlider"
          : "LoginOrRegisterTab"
      }
      screenOptions={{
        headerStyle: {
          shadowColor: "transparent",
          elevation: 0,
        },
      }}
    >
      <Stack.Screen
        name="IntroSlider"
        component={IntroSliderScreen}
        options={{
          title: "",
          headerShown: false,
          headerTitleStyle: {},
          headerLeft: () => <></>,
        }}
      />
      <Stack.Screen
        name="LoginOrRegisterTab"
        component={LoginOrRegisterScreen}
        options={{
          title: "",
          headerShown: false,
          headerTitleStyle: {},
          headerLeft: () => <></>,
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: "",
          headerShown: false,
          headerTitleStyle: {},
          headerLeft: () => <></>,
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: "Бүртгүүлэх",
          headerTitleStyle: {
            fontWeight: 800,
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("LoginScreen");
              }}
            >
              <Icon
                type="material-icons"
                name="keyboard-arrow-left"
                size={30}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ConfirmScreen"
        component={ConfirmScreen}
        options={{
          title: "Бүртгүүлэх",
          headerTitleStyle: {
            fontWeight: 800,
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("RegisterScreen");
              }}
            >
              <Icon
                type="material-icons"
                name="keyboard-arrow-left"
                size={30}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{
          title: "Бүртгүүлэх",
          headerTitleStyle: {
            fontWeight: 800,
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("ConfirmScreen");
              }}
            >
              <Icon
                type="material-icons"
                name="keyboard-arrow-left"
                size={30}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="BioScreen"
        component={BioScreen}
        options={{
          title: "Бүртгүүлэх",
          headerTitleStyle: {
            fontWeight: 800,
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("OTPScreen");
              }}
            >
              <Icon
                type="material-icons"
                name="keyboard-arrow-left"
                size={30}
              />
            </TouchableOpacity>
          ),
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
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
});
