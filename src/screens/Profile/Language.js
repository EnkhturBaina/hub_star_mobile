import { StyleSheet, View, StatusBar, Platform } from "react-native";
import React, { useContext, useState } from "react";
import MainContext from "../../contexts/MainContext";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RadioButton } from "react-native-paper";
import GradientButton from "../../components/GradientButton";
import { MAIN_COLOR } from "../../constant";

const Language = (props) => {
  const state = useContext(MainContext);

  const tabBarHeight = useBottomTabBarHeight();
  const [value, setValue] = React.useState("first");
  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingBottom: tabBarHeight,
      }}
    >
      <StatusBar
        translucent
        barStyle={Platform.OS == "ios" ? "dark-content" : "default"}
      />
      <View style={{ marginHorizontal: 10 }}>
        <RadioButton.Group
          onValueChange={(newValue) => setValue(newValue)}
          value={value}
        >
          <RadioButton.Item
            value="first"
            mode="android"
            label="Монгол (MN)"
            color={MAIN_COLOR}
          />
          <RadioButton.Item
            value="second"
            mode="android"
            label="English (EN)"
            color={MAIN_COLOR}
          />
        </RadioButton.Group>
      </View>
      <View className="w-full mt-2 px-5">
        <GradientButton text="Хадгалах" action={() => {}} />
      </View>
    </SafeAreaProvider>
  );
};

export default Language;

const styles = StyleSheet.create({});
