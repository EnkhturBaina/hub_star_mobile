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
import ResetPassword from "../screens/ResetPassword/ResetPassword";
import ConfirmPassword from "../screens/ResetPassword/ConfirmPassword";
import ChangePassword from "../screens/ResetPassword/ChangePassword";
import EditProfile from "../screens/Profile/EditProfile";
import Notification from "../screens/Profile/Notification";
import Account from "../screens/Profile/Account";
import Confirmation from "../screens/Profile/Confirmation";
import Security from "../screens/Profile/Security";
import Language from "../screens/Profile/Language";
import QAs from "../screens/Profile/QAs";
import Invite from "../screens/Profile/Invite";
import ServiceListScreen from "../screens/ServiceListScreen";
import ServiceListScreenByType from "../screens/ServiceListScreenByType";
import SliderDTLScreen from "../screens/SliderDTLScreen";
import NotificationScreen from "../screens/NotificationScreen";
import NotificationDTLScreen from "../screens/NotificationDTLScreen";
import HistoryMainScreen from "../screens/History/HistoryMainScreen";
import ServiceDTLScreen from "../screens/ServiceDTLScreen";

import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import AddService from "../screens/AddService/AddService";
import SpecialServiceScreen from "../screens/SpecialService/SpecialServiceScreen";
import UserTypeServiceScreen from "../screens/UserTypeService/UserTypeServiceScreen";
import SingleSpecialScreen from "../screens/SpecialService/SingleSpecialScreen";
import SingleServiceScreen from "../screens/History/SingleServiceScreen";
import MainAdviceScreen from "../screens/Advice/MainAdviceScreen";
import SingleUserTypeServiceScreen from "../screens/UserTypeService/SingleUserTypeServiceScreen";
import MainDirServiceScreen from "../screens/MainServices/MainDirServiceScreen";
import SingleMainDirServiceScreen from "../screens/MainServices/SingleMainDirServiceScreen";

const Stack = createStackNavigator();
const width = Dimensions.get("screen").width;

const LoginStackNavigator = (props) => {
  const navigation = useNavigation();
  const state = useContext(MainContext);

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
            fontWeight: "800",
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
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.goBack();
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
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.goBack();
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
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.goBack();
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
        name="ResetPassword"
        component={ResetPassword}
        options={{
          title: "Нууц үг мартсан",
          headerTitleStyle: {
            fontWeight: "800",
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
        name="ConfirmPassword"
        component={ConfirmPassword}
        options={{
          title: "Баталгаажуулалт",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("ResetPassword");
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
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: "Нууц үг мартсан",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("ConfirmPassword");
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
  const navigation = useNavigation();
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
      <Stack.Screen
        name="ServiceListScreen"
        component={ServiceListScreen}
        options={{
          title: "Үйлчилгээ",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("HomeScreen");
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
        name="ServiceListScreenByType"
        component={ServiceListScreenByType}
        options={{
          title: "Үйлчилгээ",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("HomeScreen");
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
        name="SliderDTLScreen"
        component={SliderDTLScreen}
        options={{
          title: "",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("HomeScreen");
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
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          title: "Мэдэгдэл",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("HomeScreen");
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
        name="NotificationDTLScreen"
        component={NotificationDTLScreen}
        options={{
          title: "Мэдэгдэл",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("NotificationScreen");
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
        name="HistoryMainScreen"
        component={HistoryMainScreen}
        options={{
          title: "Үйлчилгээнүүд",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("HomeScreen");
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
        name="SingleServiceScreen"
        component={SingleServiceScreen}
        options={{
          title: "",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("HistoryMainScreen");
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
        name="ServiceDTLScreen"
        component={ServiceDTLScreen}
        options={{
          title: "",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.goBack();
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
        name="SpecialServiceScreen"
        component={SpecialServiceScreen}
        options={{
          title: "Онцгой үйлчилгээ",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("HomeScreen");
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
        name="UserTypeServiceScreen"
        component={UserTypeServiceScreen}
        options={{
          title: "",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("HomeScreen");
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
        name="SingleSpecialScreen"
        component={SingleSpecialScreen}
        options={{
          title: "",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("SpecialServiceScreen");
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
        name="MainAdviceScreen"
        component={MainAdviceScreen}
        options={{
          title: "Зөвлөмжүүд",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("HomeScreen");
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
        name="SingleUserTypeServiceScreen"
        component={SingleUserTypeServiceScreen}
        options={{
          title: "",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("UserTypeServiceScreen");
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
        name="MainDirServiceScreen"
        component={MainDirServiceScreen}
        options={{
          title: "",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("HomeScreen");
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
        name="SingleMainDirServiceScreen"
        component={SingleMainDirServiceScreen}
        options={{
          title: "",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("MainDirServiceScreen");
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

const CategoryStackNavigator = (props) => {
  const navigation = useNavigation();
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
      <Stack.Screen
        name="CAT_MainDirServiceScreen"
        component={MainDirServiceScreen}
        options={{
          title: "",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("CategoryScreen");
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
        name="CAT_SingleMainDirServiceScreen"
        component={SingleMainDirServiceScreen}
        options={{
          title: "",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("CAT_MainDirServiceScreen");
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

const AddServiceStackNavigator = (props) => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="AddService"
      screenOptions={{
        // headerShown: false,
        headerStyle: {
          shadowColor: "transparent",
          elevation: 0,
        },
      }}
    >
      <Stack.Screen
        name="AddService"
        component={AddService}
        options={{
          title: "Үйлчилгээ нэмэх",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.goBack();
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
  const navigation = useNavigation();
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
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: "Профайл засах",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("ProfileScreen");
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
        name="Notification"
        component={Notification}
        options={{
          title: "Мэдэгдэл",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("ProfileScreen");
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
        name="Account"
        component={Account}
        options={{
          title: "Дансны мэдээлэл",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("ProfileScreen");
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
        name="Confirmation"
        component={Confirmation}
        options={{
          title: "Баталгаажуулалт",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("ProfileScreen");
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
        name="Security"
        component={Security}
        options={{
          title: "Нууцлал",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("ProfileScreen");
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
        name="Language"
        component={Language}
        options={{
          title: "Хэл солих",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("ProfileScreen");
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
        name="QAs"
        component={QAs}
        options={{
          title: "Түгээмэл асуулт",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("ProfileScreen");
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
        name="Invite"
        component={Invite}
        options={{
          title: "Найзаа урих",
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.navigate("ProfileScreen");
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

export {
  LoginStackNavigator,
  HomeScreenStackNavigator,
  CategoryStackNavigator,
  AddServiceStackNavigator,
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
