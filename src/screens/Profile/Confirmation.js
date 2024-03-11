import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import React, { useContext, useState } from "react";
import { Icon } from "@rneui/base";
import MainContext from "../../contexts/MainContext";
import CustomSnackbar from "../../components/CustomSnackbar";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import bg from "../../../assets/splash_bg.png";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { GRAY_ICON_COLOR, MAIN_COLOR_GRAY } from "../../constant";
import { Divider } from "react-native-paper";

const Confirmation = (props) => {
  const state = useContext(MainContext);

  const tabBarHeight = useBottomTabBarHeight();
  const onToggleSwitch = () => {
    onToggleSnackBar("Ирц бүртгэл сануулах тохиргоо хийгдлээ");
  };

  const [visibleDialog, setVisibleDialog] = useState(false); //Dialog харуулах
  const [dialogType, setDialogType] = useState("warning"); //Dialog харуулах төрөл
  const [dialogText, setDialogText] = useState("Апп -с гарах уу?"); //Dialog -н текст

  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");

  //Snacbkbar харуулах
  const onToggleSnackBar = (msg) => {
    setVisibleSnack(!visibleSnack);
    setSnackBarMsg(msg);
  };

  //Snacbkbar хаах
  const onDismissSnackBar = () => setVisibleSnack(false);

  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#fff",
        paddingBottom: tabBarHeight,
      }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <StatusBar
          translucent
          barStyle={Platform.OS == "ios" ? "dark-content" : "default"}
        />
        <Text>Confirmation</Text>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  headerBg: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  userIcon: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderWidth: 4,
    borderRadius: 120,
    borderColor: "#fff",
  },
  gridMenus: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  lastText: {
    color: "red",
    fontWeight: 500,
    marginLeft: 20,
  },
  menuText: {
    color: GRAY_ICON_COLOR,
    fontWeight: 500,
    marginLeft: 20,
  },
  profileCircle: {
    position: "absolute",
    flexDirection: "row",
    top: 100,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: MAIN_COLOR_GRAY,
  },
});
