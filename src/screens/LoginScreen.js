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
  TextInput,
  StatusBar,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Icon, CheckBox, Button } from "@rneui/themed";
import MainContext from "../contexts/MainContext";
import CustomSnackbar from "../components/CustomSnackbar";
// import talent_logo from "../../assets/talent_logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import splash_logo from "../../assets/splash_logo.png";
import fb_logo from "../../assets/fb.png";
import google_logo from "../../assets/google.png";
import { MAIN_BG_GRAY, MAIN_COLOR, MAIN_DISABLED_BG } from "../constant";
import { Divider } from "@rneui/base";
import GradientButton from "../components/GradientButton";

const LoginScreen = (props) => {
  const state = useContext(MainContext);
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");

  const regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const [loadingAction, setLoadingAction] = useState(false);
  const [loadingActionReset, setLoadingActionReset] = useState(false);

  const onToggleSnackBar = (msg) => {
    setVisibleSnack(!visibleSnack);
    setSnackBarMsg(msg);
  };

  const onDismissSnackBar = () => setVisibleSnack(false);

  const checkHandle = () => {
    state.setRemember(!state.remember);
  };

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
      <StatusBar
        translucent
        barStyle={Platform.OS == "ios" ? "dark-content" : "default"}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <CustomSnackbar
          visible={visibleSnack}
          dismiss={onDismissSnackBar}
          text={snackBarMsg}
        />
        <Image
          style={{
            resizeMode: "contain",
            width: "40%",
            height: "50%",
            zIndex: 999,
          }}
          source={splash_logo}
        />
        <Text className="font-bold text-2xl mb-4">Нэвртэх хэсэг</Text>
        <View style={styles.stackSection}>
          {/* <Text style={{ color: "red" }}>{state.loginMsg}</Text> */}
          <TextInput
            style={styles.generalInput}
            value={state.mobileNumber}
            onChangeText={(e) => {
              // state.setMobileNumber(e);
            }}
            placeholder="Утасны дугаар"
            placeholderTextColor={"black"}
            keyboardType="number-pad"
            returnKeyType="done"
            maxLength={8}
          />
          <View style={styles.sectionStyle}>
            <Icon
              name="key"
              type="ionicon"
              size={20}
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Нууц үг"
              value={password}
              onChangeText={setPassword}
              style={styles.generalInput}
              returnKeyType="done"
              secureTextEntry={hidePassword}
              onFocus={() => onFocus("password")}
              onBlur={() => onBlur("password")}
            />
            <TouchableOpacity
              style={styles.imageStyle}
              onPress={() => hideShowPassword()}
            >
              <Icon name={hidePassword ? "eye" : "eye-closed"} type="octicon" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.stackSection2}>
          <CheckBox
            containerStyle={{
              padding: 0,
              margin: 0,
              marginLeft: 0,
              alignItems: "center",
            }}
            textStyle={{
              fontWeight: "normal",
              marginLeft: 5,
            }}
            title="Утасны дугаар сануулах"
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon="checkbox-blank-outline"
            checked={state.remember}
            onPress={checkHandle}
            checkedColor={MAIN_COLOR}
            uncheckedColor={MAIN_COLOR}
          />
          <Text className="text-blue-500">Нууц үг мартсан</Text>
        </View>
        <View className="w-11/12">
          <GradientButton
            text="Нэвртэх"
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

export default LoginScreen;

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
    height: 50,
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
    right: "5%",
  },
  customCheckBox: {
    padding: 0,
    margin: 0,
    marginLeft: 0,
    alignItems: "center",
  },
  sectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    height: 50,
    margin: 10,
    marginRight: "auto",
    marginLeft: "auto",
    width: "80%",
  },
  inputIcon: {
    marginLeft: 15,
    marginHorizontal: 10,
  },
});
