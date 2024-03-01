import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Avatar, Icon, CheckBox, Divider } from "@rneui/themed";
import PersonCircle from "../../../assets/PersonCircle.png";
import {
  GRAY_ICON_COLOR,
  MAIN_BG_GRAY,
  MAIN_COLOR,
  MAIN_COLOR_GRAY,
  MAIN_DISABLED_BG,
} from "../../constant";
import GradientButton from "../../components/GradientButton";
import fb_logo from "../../../assets/fb.png";
import google_logo from "../../../assets/google.png";

const RegisterScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNmber, setMobileNumber] = useState("");
  const [termCheck, setTermCheck] = useState(false);
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          console.log("X");
        }}
        style={{ alignItems: "center", marginVertical: 20 }}
      >
        <Avatar
          size={150}
          rounded
          source={PersonCircle}
          title="Bj"
          containerStyle={{ backgroundColor: "grey" }}
        >
          <Avatar.Accessory
            size={28}
            onPress={() => {
              console.log("X");
            }}
            color="#fff"
            style={{ backgroundColor: MAIN_COLOR }}
          />
        </Avatar>
      </TouchableOpacity>
      <Text className="font-bold text-2xl mb-4 text-center">Нэвтрэх хэсэг</Text>
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
          value={name}
          placeholder="Нэр"
          keyboardType="number-pad"
          returnKeyType="done"
          maxLength={8}
          onChangeText={setName}
        />
      </View>
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
          name="mobile"
          type="fontisto"
          size={20}
          style={styles.inputIcon}
          color={GRAY_ICON_COLOR}
        />
        <TextInput
          style={styles.generalInput}
          value={mobileNmber}
          placeholder="Утасны дугаар"
          keyboardType="number-pad"
          returnKeyType="done"
          maxLength={8}
          onChangeText={setMobileNumber}
        />
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
          onPress={() => {}}
          checkedColor={MAIN_COLOR}
          uncheckedColor={MAIN_COLOR}
        />
      </View>
      <View className="mt-2">
        <GradientButton
          text="Бүртгүүлэх"
          action={() => props.navigation.navigate("ConfirmScreen")}
        />
      </View>
      <Text className="font-medium text-base my-2 text-center">
        Та бүртгэлтэй юу?
        <TouchableOpacity
          onPress={() => props.navigation.navigate("LoginScreen")}
        >
          <Text className="text-blue-500 ml-2">Нэвтрэх</Text>
        </TouchableOpacity>
      </Text>
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
    </ScrollView>
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
});
