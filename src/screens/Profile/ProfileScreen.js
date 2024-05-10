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
  Dimensions,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import { Icon } from "@rneui/base";
import MainContext from "../../contexts/MainContext";
import CustomSnackbar from "../../components/CustomSnackbar";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import bg from "../../../assets/splash_bg.png";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { GRAY_ICON_COLOR, MAIN_BG_GRAY, MAIN_COLOR_GRAY } from "../../constant";
import { Divider } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import GradientButton from "../../components/GradientButton";

const ProfileScreen = (props) => {
  const state = useContext(MainContext);
  const sheetRef = useRef(); //*****Bottomsheet
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

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
      icon: (
        <Icon
          name="account-circle-outline"
          type="material-community"
          size={25}
          color={GRAY_ICON_COLOR}
        />
      ),
      nav: "EditProfile",
    },
    {
      id: 2,
      name: "Мэдэгдэл",
      icon: (
        <Icon
          name="options-outline"
          type="ionicon"
          size={25}
          color={GRAY_ICON_COLOR}
        />
      ),

      nav: "Notification",
    },
    {
      id: 3,
      name: "Дансны мэдээлэл",
      icon: (
        <Icon
          name="credit-card-edit-outline"
          type="material-community"
          size={25}
          color={GRAY_ICON_COLOR}
        />
      ),
      nav: "Account",
    },
    {
      id: 4,
      name: "Баталгаажуулалт",
      icon: (
        <Icon
          name="shield-lock"
          type="octicon"
          size={25}
          color={GRAY_ICON_COLOR}
        />
      ),

      nav: "Confirmation",
    },
    {
      id: 5,
      name: "Нууцлал",
      icon: (
        <Icon
          name="shield-lock"
          type="octicon"
          size={25}
          color={GRAY_ICON_COLOR}
        />
      ),

      nav: "Security",
    },
    {
      id: 6,
      name: "Хэл солих",
      icon: (
        <Icon name="flag" type="feather" size={25} color={GRAY_ICON_COLOR} />
      ),

      nav: "Language",
    },
    {
      id: 7,
      name: "Түгээмэл асуулт хариулт",
      icon: (
        <Icon
          name="file-document-outline"
          type="material-community"
          size={25}
          color={GRAY_ICON_COLOR}
        />
      ),

      nav: "QAs",
    },
    {
      id: 8,
      name: "Найзуудаа урих",
      icon: (
        <Icon
          name="account-multiple-outline"
          type="material-community"
          size={25}
          color={GRAY_ICON_COLOR}
        />
      ),

      nav: "Invite",
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
        bounces={false}
      >
        <StatusBar
          translucent
          barStyle={Platform.OS == "ios" ? "dark-content" : "default"}
        />
        <View style={{ position: "relative" }}>
          <Image
            style={styles.headerBg}
            source={require("../../../assets/splash_bg_1.jpg")}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              backgroundColor: "rgba(255,255,255, 0.7)",
              padding: 8,
              borderRadius: 100,
            }}
            onPress={() => {
              console.log("X");
            }}
            activeOpacity={0.7}
          >
            <Icon name="camera" type="feather" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.profileCircle}>
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
              {state.lastName && state.firstName ? (
                <Text style={{ fontWeight: "500" }}>
                  {state.lastName?.substr(0, 1)}. {state.firstName}
                </Text>
              ) : (
                <Text style={styles.generalText}>Хэрэглэгч</Text>
              )}
            </Text>
            <Text style={{ color: GRAY_ICON_COLOR }}>
              “МЕТА СТАРТ” ХХК Захирал
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            marginTop: 110,
          }}
        >
          {menuList.map((el, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.gridMenus}
                onPress={() => props.navigation.navigate(el.nav)}
              >
                {el.icon}
                <Text style={styles.menuText}>{el.name}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={styles.gridMenus}
            onPress={() => {
              sheetRef.current.open();
            }}
          >
            <Icon name="log-out" type="feather" size={25} color="red" />
            <Text style={styles.lastText}>Системээс гарах</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <RBSheet
        ref={sheetRef}
        height={200}
        closeOnDragDown={true} //*****sheet -г доош чирж хаах
        closeOnPressMask={true} //*****sheet -н гадна дарж хаах
        dragFromTopOnly={true}
        customStyles={{
          container: {
            backgroundColor: MAIN_BG_GRAY,
            flexDirection: "column",
            borderTopEndRadius: 16,
            borderTopStartRadius: 16,
          },
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              color: "red",
              fontSize: 22,
              textAlign: "center",
            }}
          >
            Системээс гарах
          </Text>
          <Divider style={{ marginVertical: 20 }} />
          <Text
            style={{
              fontWeight: "500",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Та системээс гарах гэж байна.
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: "48%",
                borderWidth: 2,
                borderRadius: 8,
                borderColor: "#aeaeae",
                height: 40,
              }}
              onPress={() => {
                sheetRef.current.close();
              }}
            >
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  paddingVertical: Platform.OS == "ios" ? 8 : 0,
                  fontSize: 18,
                  fontWeight: "500",
                  color: "#aeaeae",
                }}
              >
                Буцах
              </Text>
            </TouchableOpacity>
            <View style={{ width: "48%" }}>
              <GradientButton
                text="Гарах"
                action={() => {
                  state.logout();
                }}
                height={40}
                radius={6}
              />
            </View>
          </View>
        </View>
      </RBSheet>
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
  gridMenus: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  lastText: {
    color: "red",
    fontWeight: "500",
    marginLeft: 20,
  },
  menuText: {
    color: GRAY_ICON_COLOR,
    fontWeight: "500",
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
