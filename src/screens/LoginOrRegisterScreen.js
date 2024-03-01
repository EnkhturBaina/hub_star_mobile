import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Linking,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Icon, CheckBox, Button } from "@rneui/themed";
import MainContext from "../contexts/MainContext";
import CustomSnackbar from "../components/CustomSnackbar";
// import talent_logo from "../../assets/talent_logo.png";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import splash_logo from "../../assets/splash_logo.png";
import fb_logo from "../../assets/fb.png";
import google_logo from "../../assets/google.png";
import { MAIN_BG_GRAY } from "../constant";
import { Divider } from "@rneui/base";
import GradientButton from "../components/GradientButton";

const LoginOrRegisterScreen = (props) => {
  const state = useContext(MainContext);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");

  const regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const [loadingAction, setLoadingAction] = useState(false);
  const [loadingActionReset, setLoadingActionReset] = useState(false);

  //Snacbkbar харуулах
  const onToggleSnackBar = (msg) => {
    setVisibleSnack(!visibleSnack);
    setSnackBarMsg(msg);
  };

  //Snacbkbar хаах
  const onDismissSnackBar = () => setVisibleSnack(false);

  const checkHandleUseBiometric = () => {
    state.setIsUseBiometric(!state.isUseBiometric);
  };

  const hideShowPassword = () => {
    setHidePassword(!hidePassword);
  };

  // var tempUUID = uuidv4();

  const login = async () => {};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : ""}
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Image
          style={{
            resizeMode: "contain",
            width: "40%",
            height: "60%",
            zIndex: 999,
          }}
          source={splash_logo}
        />
        <Text className="font-bold text-2xl mb-4">Нэвтрэх хэсэг</Text>
        <View className="mb-2 flex-row rounded-lg items-center py-4 bg-white w-11/12 justify-center border border-gray-300 mx-4">
          <Image
            style={{
              resizeMode: "contain",
              width: 24,
              height: 24,
              marginRight: 10,
            }}
            source={fb_logo}
          />
          <Text className="font-medium text-base">
            Facebook хаягаар нэвтрэх
          </Text>
        </View>
        <View className="flex-row rounded-lg items-center py-4 bg-white w-11/12 justify-center border border-gray-300 mx-4">
          <Image
            style={{
              resizeMode: "contain",
              width: 24,
              height: 24,
              marginRight: 10,
            }}
            source={google_logo}
          />
          <Text className="font-medium text-base">Google хаягаар нэвтрэх</Text>
        </View>
        <View className="flex-row items-center my-4">
          <Divider style={{ width: "33%" }} />
          <Text className="text-gray-300 font-medium text-xl mx-5">Эсвэл</Text>
          <Divider style={{ width: "33%" }} />
        </View>
        <View className="w-11/12">
          <GradientButton
            text="Нэвтрэх"
            action={() => {
              props.navigation.navigate("LoginScreen");
            }}
          />
        </View>
        <Text className="font-medium text-base my-2">
          Та бүртгэл үүсэгсэн үү?{" "}
          <Text className="text-blue-500">Бүртгүүлэх</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginOrRegisterScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: MAIN_BG_GRAY,
    alignItems: "center",
  },
  loginImageContainer: {
    alignItems: "center",
  },
  stackSection: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loginImg: {
    width: 250,
    height: 200,
    resizeMode: "contain",
    marginTop: "30%",
  },
  generalInput: {
    width: "80%",
    // height: 40,
    backgroundColor: "#fff",
    marginTop: 10,
    padding: 0,
  },
  stackSection2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    width: "80%",
    marginRight: "auto",
    marginLeft: "auto",
  },
  stackSection3: {
    width: "80%",
    alignItems: "center",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 10,
  },
  imageStyle: {
    position: "absolute",
    zIndex: 999,
    right: "15%",
    top: "45%",
  },
  customCheckBox: {
    padding: 0,
    margin: 0,
    marginLeft: 0,
    alignItems: "center",
  },
});
