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
import {
  GRAY_ICON_COLOR,
  MAIN_BG_GRAY,
  MAIN_COLOR,
  MAIN_DISABLED_BG,
} from "../constant";
import { Divider } from "@rneui/base";
import GradientButton from "../components/GradientButton";
import fb_logo from "../../assets/fb.png";
import google_logo from "../../assets/google.png";

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

  const login = () => {
    if (state.mobileNumber == "") {
      onToggleSnackBar("Утасны дугаар оруулна уу.");
    } else if (password == "") {
      onToggleSnackBar("Нууц үгээ оруулна уу?");
    } else {
      state.login(state.mobileNumber, password, state.remember);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : ""}
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <CustomSnackbar
        visible={visibleSnack}
        dismiss={onDismissSnackBar}
        text={snackBarMsg}
      />
      <StatusBar
        translucent
        barStyle={Platform.OS == "ios" ? "dark-content" : "default"}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Image
          style={{
            resizeMode: "contain",
            width: "40%",
            height: "40%",
            zIndex: 999,
            marginTop: 30,
          }}
          source={splash_logo}
        />
        <Text className="font-bold text-2xl mb-4">Нэвтрэх хэсэг</Text>
        <View style={styles.stackSection}>
          {/* <Text style={{ color: "red" }}>{state.loginMsg}</Text> */}
          <View style={styles.sectionStyle}>
            <Icon
              name="mobile"
              type="fontisto"
              size={20}
              style={styles.inputIcon}
              color={GRAY_ICON_COLOR}
            />
            <TextInput
              style={styles.generalInput}
              value={state.mobileNumber}
              placeholder="Утасны дугаар"
              keyboardType="number-pad"
              returnKeyType="done"
              maxLength={8}
              onChangeText={(e) => {
                state.setMobileNumber(e);
              }}
            />
          </View>
          <View style={styles.sectionStyle}>
            <Icon
              name="lock"
              type="font-awesome"
              size={20}
              style={styles.inputIcon}
              color={GRAY_ICON_COLOR}
            />
            <TextInput
              placeholder="Нууц үг"
              value={password}
              onChangeText={setPassword}
              style={styles.generalInput}
              returnKeyType="done"
              secureTextEntry={hidePassword}
            />
            <TouchableOpacity
              style={styles.imageStyle}
              onPress={() => hideShowPassword()}
            >
              <Icon
                name={hidePassword ? "eye" : "eye-closed"}
                type="octicon"
                color={GRAY_ICON_COLOR}
              />
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
              backgroundColor: MAIN_BG_GRAY,
            }}
            textStyle={{
              fontWeight: "normal",
              marginLeft: 5,
            }}
            title="Сануулах"
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon="checkbox-blank-outline"
            checked={state.remember}
            onPress={checkHandle}
            checkedColor={MAIN_COLOR}
            uncheckedColor={MAIN_COLOR}
          />
          <TouchableOpacity>
            <Text className="text-blue-500">Нууц үг мартсан</Text>
          </TouchableOpacity>
        </View>
        <View className="w-11/12 mt-2">
          <GradientButton text="Нэвтрэх" action={login} />
        </View>
        <View className="flex-row items-center my-4">
          <Divider style={{ width: "33%" }} />
          <Text className="text-gray-300 font-medium text-xl mx-5">Эсвэл</Text>
          <Divider style={{ width: "33%" }} />
        </View>
        <View className="flex-row justify-evenly w-full">
          <View className="flex-row rounded-lg items-center py-4 bg-white w-5/12 justify-center border border-gray-300">
            <Image
              style={{
                resizeMode: "contain",
                width: 24,
                height: 24,
                marginRight: 10,
              }}
              source={fb_logo}
            />
            <Text className="font-medium text-base">Facebook</Text>
          </View>
          <View className="flex-row rounded-lg items-center py-4 bg-white w-5/12 justify-center border border-gray-300">
            <Image
              style={{
                resizeMode: "contain",
                width: 24,
                height: 24,
                marginRight: 10,
              }}
              source={google_logo}
            />
            <Text className="font-medium text-base">Google</Text>
          </View>
        </View>
        <Text className="font-medium text-base my-2">
          Та бүртгэл үүсэгсэн үү?
          <TouchableOpacity
            onPress={() => props.navigation.navigate("RegisterScreen")}
          >
            <Text className="text-blue-500">Бүртгүүлэх</Text>
          </TouchableOpacity>
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
    width: "90%",
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
    backgroundColor: MAIN_DISABLED_BG,
    height: 50,
    margin: 10,
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: 8,
  },
  inputIcon: {
    marginLeft: 15,
    marginHorizontal: 10,
  },
});
