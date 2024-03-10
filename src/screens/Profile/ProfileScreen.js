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

const ProfileScreen = (props) => {
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

  const menuList = [
    {
      id: 1,
      name: "Профайл засах",
      icon: <Icon name="user-circle-o" type="font-awesome" size={30} />,
      nav: "",
    },
    {
      id: 2,
      name: "Мэдэгдэл",
      icon: <Icon name="chatbox-ellipses-outline" type="ionicon" size={30} />,

      nav: "",
    },
    {
      id: 3,
      name: "Дансны мэдээлэл",
      icon: <Icon name="chatbox-ellipses-outline" type="ionicon" size={30} />,
      nav: "",
    },
    {
      id: 4,
      name: "Баталгаажуулалт",
      icon: <Icon name="chatbox-ellipses-outline" type="ionicon" size={30} />,

      nav: "",
    },
    {
      id: 5,
      name: "Нууцлал",
      icon: <Icon name="chatbox-ellipses-outline" type="ionicon" size={30} />,

      nav: "",
    },
    {
      id: 6,
      name: "Хэл солих",
      icon: <Icon name="chatbox-ellipses-outline" type="ionicon" size={30} />,

      nav: "",
    },
    {
      id: 7,
      name: "Түгээмэл асуулт хариулт",
      icon: <Icon name="chatbox-ellipses-outline" type="ionicon" size={30} />,

      nav: "",
    },
    {
      id: 8,
      name: "Найзуудаа урих",
      icon: <Icon name="chatbox-ellipses-outline" type="ionicon" size={30} />,

      nav: "",
    },
  ];
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
      >
        <StatusBar
          translucent
          barStyle={Platform.OS == "ios" ? "dark-content" : "default"}
        />
        <Image
          style={styles.headerBg}
          source={require("../../../assets/splash_bg_1.jpg")}
        />
        <View
          style={{
            height: 120,
            flexDirection: "row",
            top: -50,
            paddingHorizontal: 20,
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderBottomColor: MAIN_COLOR_GRAY,
          }}
        >
          <Image
            style={styles.userIcon}
            source={require("../../../assets/PersonCircle.png")}
          />
          <View
            style={{
              flexDirection: "column",
              top: 60,
              marginLeft: 20,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              С.Түвшинбилэг
            </Text>
            <Text style={{ color: GRAY_ICON_COLOR }}>
              “МЕТА СТАРТ” ХХК Захирал
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "column" }}>
          {menuList.map((el, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                {el.icon}
                <Text>{el.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default ProfileScreen;

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
});
