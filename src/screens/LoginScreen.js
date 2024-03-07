import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import { Icon, CheckBox } from "@rneui/themed";
import MainContext from "../contexts/MainContext";
import CustomSnackbar from "../components/CustomSnackbar";
// import talent_logo from "../../assets/talent_logo.png";
import splash_logo from "../../assets/splash_logo.png";
import {
  GRAY_ICON_COLOR,
  MAIN_BG_GRAY,
  MAIN_COLOR,
  MAIN_COLOR_GRAY,
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

  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");

  const onToggleSnackBar = (msg) => {
    setVisibleSnack(!visibleSnack);
    setSnackBarMsg(msg);
  };

  const onDismissSnackBar = () => setVisibleSnack(false);

  const checkHandle = () => {
    state.setRemember(!state.remember);
  };

  const hideShowPassword = () => {
    setHidePassword(!hidePassword);
  };

  const login = () => {
    // if (state.mobileNumber == "") {
    //   onToggleSnackBar("Утасны дугаар оруулна уу.");
    // } else if (password == "") {
    //   onToggleSnackBar("Нууц үгээ оруулна уу?");
    // } else {
    //   state.login(state.mobileNumber, password, state.remember);
    // }
    state.setIsLoggedIn(true);
    state.setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : ""}
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: MAIN_BG_GRAY,
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
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{ justifyContent: "flex-start", flexDirection: "row" }}
      >
        <Icon
          name="arrow-left"
          type="feather"
          size={30}
          style={{ paddingTop: 60, paddingLeft: 20 }}
        />
      </TouchableOpacity>
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
          <TouchableOpacity
            onPress={() => props.navigation.navigate("ResetPassword")}
          >
            <Text className="text-blue-500">Нууц үг мартсан</Text>
          </TouchableOpacity>
        </View>
        <View className="w-full mt-2">
          <GradientButton text="Нэвтрэх" action={login} />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Divider style={{ width: "33%" }} />
          <Text
            className="text-gray-300 font-medium text-xl text-center"
            style={{ width: "33%" }}
          >
            Эсвэл
          </Text>
          <Divider style={{ width: "33%" }} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View style={styles.socialBtn}>
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
          <View style={styles.socialBtn}>
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
            <Text className="text-blue-500 ml-2">Бүртгүүлэх</Text>
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
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  stackSection: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  generalInput: {
    width: "80%",
    height: 50,
  },
  stackSection2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  imageStyle: {
    position: "absolute",
    zIndex: 999,
    right: 0,
    alignSelf: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
  },
  sectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: MAIN_DISABLED_BG,
    height: 50,
    margin: 10,
    width: "100%",
    borderRadius: 8,
  },
  inputIcon: {
    marginLeft: 15,
    marginHorizontal: 10,
  },
  socialBtn: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 4,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: MAIN_COLOR_GRAY,
    width: "48%",
    height: 50,
  },
});
