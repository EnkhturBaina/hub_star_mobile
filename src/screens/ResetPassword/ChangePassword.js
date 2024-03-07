import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import change from "../../../assets/password/change.png";
import {
  MAIN_BORDER_RADIUS,
  MAIN_COLOR,
  MAIN_COLOR_GRAY,
} from "../../constant";
import { Button, Icon } from "@rneui/base";
import { Snackbar } from "react-native-paper";
import { useHeaderHeight } from "@react-navigation/elements";

const ChangePassword = (props) => {
  const headerHeight = useHeaderHeight();
  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [borderColor, setBorderColor] = useState("");
  const [selectedInput, setSelectedInput] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [errorNewPassword, setErrorNewPassword] = useState(false);
  const [errorRepeatPassword, setErrorRepeatPassword] = useState(false);

  const [hideNewPassword, setNewHidePassword] = useState(true);
  const [hideRepeatPassword, setRepeatHidePassword] = useState(true);

  const [passwordLengthValid, setPasswordLengthValid] = useState(false); //Нууц үг 8 болон түүнээс дээш тэмдэг
  const [passwordUpperValid, setPasswordUpperValid] = useState(false); //Нууц үг Багадаа 1 том үсэг
  const [passwordCharValid, setPasswordCharValid] = useState(false); //Нууц үг 1 тусгай тэмдэгт эсвэл 1 тоо (!@#$%^&*_)
  const [matchPassword, setMatchPassword] = useState(false); //Нууц үг таарч буй эсэх

  var regex = /^(?=.*[A-Z]).+$/; // Uppercase character pattern
  var regexChar = /^(?=.*[0-9_\W]).+$/; // Special character or number pattern

  const [visibleSnack, setVisibleSnack] = useState("");
  const onDismiss = () => setVisibleSnack(false);

  const onFocus = (type) => {
    setSelectedInput(
      type == "repeat_password" ? "repeat_password" : "new_password"
    );
    setBackgroundColor("#ECF5FF");
    setBorderColor(MAIN_COLOR);
  };
  const onBlur = (type) => {
    setSelectedInput("");
    setBackgroundColor("#fff");
    setBorderColor(MAIN_COLOR_GRAY);
  };

  const hideShowNewPassword = () => {
    setNewHidePassword(!hideNewPassword);
  };
  const hideShowRepeatPassword = () => {
    setRepeatHidePassword(!hideRepeatPassword);
  };

  //Нууц үг оруулахад Validation шалгах
  const handlePassword = (e) => {
    setNewPassword(e);
    e != repeatPassword ? setMatchPassword(false) : setMatchPassword(true);
    e.length >= 8
      ? setPasswordLengthValid(true)
      : setPasswordLengthValid(false);

    regex.test(e) ? setPasswordUpperValid(true) : setPasswordUpperValid(false);
    regexChar.test(e)
      ? setPasswordCharValid(true)
      : setPasswordCharValid(false);
  };
  //Нууц үг давтахад таарж буй эсэхийг шалгах
  const handleRepeatPassword = (e) => {
    setRepeatPassword(e);
    e != newPassword &&
    passwordLengthValid &&
    passwordCharValid &&
    passwordUpperValid
      ? setMatchPassword(false)
      : setMatchPassword(true);
  };
  useEffect(() => {
    //Баталгаажуулах код, Нууц үг Validation БҮГД таарсан үед ҮРГЭЛЖЛҮҮЛЭХ button Идэвхтэй болгох
    setConfirmButtonDisabled(
      repeatPassword &&
        matchPassword &&
        passwordLengthValid &&
        passwordCharValid &&
        passwordUpperValid
        ? false
        : true
    );
  }, [
    repeatPassword,
    matchPassword,
    passwordLengthValid,
    passwordCharValid,
    passwordUpperValid,
  ]);
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight}
      behavior={Platform.OS == "ios" ? "padding" : ""}
      style={{
        flex: 1,
      }}
    >
      <ScrollView bounces={false} contentContainerStyle={styles.mainContainer}>
        <Snackbar
          visible={visibleSnack}
          onDismiss={onDismiss}
          wrapperStyle={{ top: 0, zIndex: 999 }}
          duration={2000}
          style={{ backgroundColor: "#89898c" }}
        >
          Утасны дугаар оруулна уу.
        </Snackbar>
        <Image
          source={change}
          resizeMode="contain"
          style={{ width: "100%", height: 200 }}
        />
        <Text style={styles.topText}>Шинэ нууц үгээ оруулна уу?</Text>
        <View
          style={[
            styles.sectionStyle,
            {
              backgroundColor:
                selectedInput == "new_password" ? backgroundColor : "#fff",
              borderColor:
                selectedInput == "new_password" ? borderColor : MAIN_COLOR_GRAY,
            },
          ]}
        >
          <Icon
            name="key"
            type="ionicon"
            size={20}
            color={
              selectedInput == "new_password" ? MAIN_COLOR : MAIN_COLOR_GRAY
            }
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Нууц үг"
            value={newPassword}
            onChangeText={(e) => {
              handlePassword(e);
            }}
            style={styles.generalInput}
            returnKeyType="done"
            secureTextEntry={hideNewPassword}
            onFocus={() => onFocus("new_password")}
            onBlur={() => onBlur("new_password")}
          />
          <TouchableOpacity
            style={styles.imageStyle}
            onPress={() => hideShowNewPassword()}
          >
            <Icon
              name={hideNewPassword ? "eye" : "eye-closed"}
              type="octicon"
              color={
                selectedInput == "new_password" ? MAIN_COLOR : MAIN_COLOR_GRAY
              }
            />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.passwordValidText,
            {
              color: passwordLengthValid ? MAIN_COLOR_GRAY : "red",
            },
          ]}
        >
          • 8 болон түүнээс дээш тэмдэг
        </Text>
        <Text
          style={[
            styles.passwordValidText,
            { color: passwordUpperValid ? MAIN_COLOR_GRAY : "red" },
          ]}
        >
          • Багадаа 1 том үсэг
        </Text>
        <Text
          style={[
            styles.passwordValidText,
            { color: passwordCharValid ? MAIN_COLOR_GRAY : "red" },
          ]}
        >
          • 1 тусгай тэмдэгт эсвэл 1 тоо (!@#$%^&*_)
        </Text>
        <Text
          style={[
            styles.passwordValidText,
            { color: matchPassword ? MAIN_COLOR_GRAY : "red" },
          ]}
        >
          • Нууц үг таарахгүй байна.
        </Text>
        <View
          style={[
            styles.sectionStyle,
            {
              backgroundColor:
                selectedInput == "repeat_password" ? backgroundColor : "#fff",
              borderColor:
                selectedInput == "repeat_password"
                  ? borderColor
                  : MAIN_COLOR_GRAY,
            },
          ]}
        >
          <Icon
            name="key"
            type="ionicon"
            size={20}
            color={
              selectedInput == "repeat_password" ? MAIN_COLOR : MAIN_COLOR_GRAY
            }
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Нууц үг давтах"
            value={repeatPassword}
            onChangeText={(e) => {
              handleRepeatPassword(e);
            }}
            style={styles.generalInput}
            returnKeyType="done"
            secureTextEntry={hideRepeatPassword}
            onFocus={() => onFocus("repeat_password")}
            onBlur={() => onBlur("repeat_password")}
          />
          <TouchableOpacity
            style={styles.imageStyle}
            onPress={() => hideShowRepeatPassword()}
          >
            <Icon
              name={hideRepeatPassword ? "eye" : "eye-closed"}
              type="octicon"
              color={
                selectedInput == "repeat_password"
                  ? MAIN_COLOR
                  : MAIN_COLOR_GRAY
              }
            />
          </TouchableOpacity>
        </View>
        <Button
          containerStyle={styles.btnContainer}
          title="Баталгаажуулах"
          color={MAIN_COLOR}
          radius={12}
          onPress={() => {
            props.navigation.navigate("NewPasswordScreen");
          }}
          titleStyle={{
            fontWeight: "bold",
          }}
          buttonStyle={{ height: 45 }}
          disabled={confirmButtonDisabled}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  sectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: MAIN_COLOR_GRAY,
    height: 50,
    borderRadius: MAIN_BORDER_RADIUS,
    margin: 10,
    marginRight: "auto",
    marginLeft: "auto",
    width: "80%",
  },
  inputIcon: {
    marginLeft: 15,
    marginHorizontal: 10,
  },
  generalInput: {
    width: "80%",
    height: 50,
  },
  imageStyle: {
    position: "absolute",
    zIndex: 999,
    right: "5%",
  },
  passwordValidText: {
    fontWeight: "bold",
    fontSize: 14,
    width: "80%",
    marginRight: "auto",
    marginLeft: "auto",
  },
  topText: {
    fontWeight: "bold",
    width: "80%",
    marginTop: 50,
    marginRight: "auto",
    marginLeft: "auto",
  },
  btnContainer: {
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 10,
    width: "80%",
  },
  step1Text: {
    fontWeight: "bold",
    color: MAIN_COLOR_GRAY,
    marginVertical: 5,
  },
  step1ErrorText: {
    width: "80%",
    marginTop: 10,
    flexDirection: "column",
    marginRight: "auto",
    marginLeft: "auto",
  },
});
