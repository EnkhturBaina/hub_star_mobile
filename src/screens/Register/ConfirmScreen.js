import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import {
  GRAY_ICON_COLOR,
  MAIN_BG_GRAY,
  MAIN_DISABLED_BG,
} from "../../constant";
import { Divider, Icon } from "@rneui/base";
import GradientButton from "../../components/GradientButton";

const ConfirmScreen = (props) => {
  const [email, setEmail] = useState("");
  const [mobileNmber, setMobileNumber] = useState("");
  return (
    <View
      style={{ backgroundColor: MAIN_BG_GRAY, flex: 1, paddingHorizontal: 20 }}
    >
      <Text className="font-bold mb-5">
        Таньд баталгаажуулах код ирэх тул утасны дугаар эсвэл И-мэйл ээ бичиж
        оруулна уу?
      </Text>
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
          value={mobileNmber}
          placeholder="Утасны дугаар"
          keyboardType="number-pad"
          returnKeyType="done"
          maxLength={8}
          onChangeText={setMobileNumber}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 20,
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
          value={email}
          placeholder="Имэйл"
          keyboardType="number-pad"
          returnKeyType="done"
          maxLength={8}
          onChangeText={setEmail}
        />
      </View>
      <View className="mt-5 ">
        <GradientButton
          text="Код илгээх"
          action={() => props.navigation.navigate("OTPScreen")}
        />
      </View>
    </View>
  );
};

export default ConfirmScreen;

const styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: MAIN_DISABLED_BG,
    height: 50,
    borderRadius: 12,
    width: "100%",
  },
  inputIcon: {
    marginLeft: 15,
    marginHorizontal: 10,
  },
});
