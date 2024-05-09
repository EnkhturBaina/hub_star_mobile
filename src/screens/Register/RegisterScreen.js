import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import { Avatar, Icon, CheckBox, Divider, Button } from "@rneui/themed";
import PersonCircle from "../../../assets/PersonCircle.png";
import {
  GRAY_ICON_COLOR,
  MAIN_BG_GRAY,
  MAIN_COLOR,
  MAIN_COLOR_GRAY,
  MAIN_DISABLED_BG,
  SERVER_URL,
  X_API_KEY,
} from "../../constant";
import GradientButton from "../../components/GradientButton";
import fb_logo from "../../../assets/fb.png";
import google_logo from "../../../assets/google.png";
import CustomSnackbar from "../../components/CustomSnackbar";
import RBSheet from "react-native-raw-bottom-sheet";
import axios from "axios";

const RegisterScreen = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  // const [mobileNmber, setMobileNumber] = useState("");
  const [termCheck, setTermCheck] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);

  const refRBSheet = useRef();
  const screen = Dimensions.get("screen");

  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");

  //Snacbkbar харуулах
  const onToggleSnackBar = (msg) => {
    setVisibleSnack(!visibleSnack);
    setSnackBarMsg(msg);
  };
  //Snacbkbar хаах
  const onDismissSnackBar = () => setVisibleSnack(false);

  const hideShowPassword = () => {
    setHidePassword(!hidePassword);
  };

  const register = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (email == "") {
      onToggleSnackBar("И-мэйл хаягаа оруулна уу");
    } else if (reg.test(email) === false) {
      onToggleSnackBar("И-мэйл хаягаа зөв оруулна уу");
    } else if (lastName == "") {
      onToggleSnackBar("Овогоо оруулна уу");
    } else if (firstName == "") {
      onToggleSnackBar("Нэрээ оруулна уу");
    } else if (password == "") {
      onToggleSnackBar("Нууц үг оруулна уу");
    } else if (password.length < 8) {
      onToggleSnackBar("Нууц үг багадаа 8 тэмдэгт байна");
    } else if (!termCheck) {
      onToggleSnackBar("Үйлчилгээний нөхцөл зөвшөөрнө үү.");
    } else {
      setIsWaiting(true);
      try {
        await axios
          .post(`${SERVER_URL}authentication/register`, {
            headers: {
              "x-api-key": `${X_API_KEY}`,
            },
            data: {
              email: email?.toLowerCase(),
              password,
              firstName,
              lastName,
            },
          })
          .then(function (response) {
            console.log("response", response.data);
            if (response.data?.statusCode == 200) {
              props.navigation.navigate("OTPScreen", {
                details: response.data?.response?.details,
              });
            }
            setErrorMsg("");
          })
          .catch(function (error) {
            if (error.response) {
              setErrorMsg(error.response.data?.message);
              console.log("error register data", error.response.data);
              console.log("error register status", error.response.status);
            }
          })
          .finally(() => {
            setIsWaiting(false);
          });
      } catch (error) {
        console.log("err", error);
      }
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
        topPos={1}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        bounces={false}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {}}
          style={{ alignItems: "center", marginVertical: 20 }}
        >
          <Avatar
            size={100}
            rounded
            source={PersonCircle}
            title="Bj"
            containerStyle={{ backgroundColor: "grey" }}
          >
            <Avatar.Accessory
              size={28}
              onPress={() => {}}
              color="#fff"
              style={{ backgroundColor: MAIN_COLOR }}
            />
          </Avatar>
        </TouchableOpacity>
        <Text className="font-bold text-2xl mb-4 text-center">
          Нэвтрэх хэсэг
        </Text>
        {errorMsg ? (
          <Text
            className="font-bold text-base mb-4 text-center"
            style={{ color: "red" }}
          >
            {errorMsg}
          </Text>
        ) : null}

        <View style={styles.sectionStyle}>
          <Icon
            name="mail"
            type="ion-icon"
            size={20}
            style={styles.inputIcon}
            color={GRAY_ICON_COLOR}
          />
          <TextInput
            style={styles.generalInput}
            value={email}
            placeholder="Имэйл"
            keyboardType="email-address"
            returnKeyType="done"
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.sectionStyle}>
          <Icon
            name="user"
            type="font-awesome"
            size={20}
            style={styles.inputIcon}
            color={GRAY_ICON_COLOR}
          />
          <TextInput
            style={styles.generalInput}
            value={lastName}
            placeholder="Овог"
            returnKeyType="done"
            maxLength={8}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.sectionStyle}>
          <Icon
            name="user"
            type="font-awesome"
            size={20}
            style={styles.inputIcon}
            color={GRAY_ICON_COLOR}
          />
          <TextInput
            style={styles.generalInput}
            value={firstName}
            placeholder="Нэр"
            returnKeyType="done"
            maxLength={8}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.sectionStyle}>
          <Icon
            name="key"
            type="ionicon"
            size={20}
            color={GRAY_ICON_COLOR}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Нууц үг"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={hidePassword}
            style={styles.generalInput}
          />
          <TouchableOpacity
            style={styles.imageStyle}
            onPress={() => hideShowPassword()}
          >
            <Icon
              name={hidePassword ? "eye" : "eye-closed"}
              type="octicon"
              color={MAIN_COLOR}
            />
          </TouchableOpacity>
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
            title="Үйлчилгээний нөхцөл зөвшөөрөх"
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon="checkbox-blank-outline"
            checked={termCheck}
            onPress={() => refRBSheet.current.open()}
            checkedColor={MAIN_COLOR}
            uncheckedColor={MAIN_COLOR}
          />
        </View>
        <View className="mt-2">
          <GradientButton
            text="Бүртгүүлэх"
            action={() => register()}
            disabled={isWaiting ? true : false}
            isWaiting={isWaiting}
          />
        </View>

        <View className="flex flex-row items-center self-center">
          <Text className="font-medium text-base my-2">
            Та бүртгэл үүсэгсэн үү?
          </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("RegisterScreen")}
          >
            <Text className="text-blue-500 ml-2">Бүртгүүлэх</Text>
          </TouchableOpacity>
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
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          dragFromTopOnly={true}
          height={screen.height - 200}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(52, 52, 52, 0.8)",
            },
            container: {
              flexDirection: "column",
              borderTopStartRadius: 16,
              borderTopEndRadius: 16,
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
          }}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 40,
              marginHorizontal: 20,
            }}
          >
            {/* {conditionData != "" ? (
            <WebView
              originWhitelist={["*"]}
              source={{ html: conditionData }}
              style={{ flex: 1 }}
            />
          ) : (
            <Empty text="Үр дүн олдсонгүй." />
          )} */}
            <View
              style={{
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Button
                onPress={() => {
                  setTermCheck(true);
                  refRBSheet.current.close();
                }}
                title="Зөвшөөрөх"
                color={MAIN_COLOR}
                radius={12}
              />
            </View>
          </ScrollView>
        </RBSheet>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: MAIN_BG_GRAY,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: MAIN_DISABLED_BG,
    height: 50,
    marginBottom: 10,
    borderRadius: 12,
    width: "100%",
  },
  inputIcon: {
    marginLeft: 15,
    marginHorizontal: 10,
  },
  stackSection2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
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
  generalInput: {
    width: "85%",
    padding: 0,
    height: "100%",
  },
  imageStyle: {
    position: "absolute",
    zIndex: 999,
    right: "3%",
    height: "100%",
    width: 50,
    justifyContent: "center",
  },
});
