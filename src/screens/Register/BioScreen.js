import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { MAIN_BG_GRAY, MAIN_COLOR } from "../../constant";
import finger from "../../../assets/finger.png";
import { Button } from "@rneui/themed";
import GradientButton from "../../components/GradientButton";

const BioScreen = (props) => {
  return (
    <View
      style={{
        backgroundColor: MAIN_BG_GRAY,
        flex: 1,
        paddingHorizontal: 20,
        alignItems: "center",
      }}
    >
      <Text className="font-bold mb-5">
        Цаашид энэ төхөөрөмж дээр хурууны хээгээ таниулж нэвтрэх үү.
      </Text>
      <Image
        style={{
          resizeMode: "contain",
          width: "60%",
          height: "60%",
          zIndex: 999,
          marginTop: 30,
        }}
        source={finger}
      />
      <Text className="font-bold mb-5">Та хурууны хээгээ таниулна уу?</Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          containerStyle={{
            width: "48%",
            borderRadius: 8,
            borderColor: MAIN_COLOR,
            borderWidth: 2,
            alignItems: "center",
          }}
          title="Алгасах"
          type="clear"
          titleStyle={{
            color: "black",
            fontSize: 16,
            alignItems: "center",
            fontWeight: "bold",
            color: MAIN_COLOR,
            marginTop: 3,
          }}
          onPress={() => {}}
        />
        <View style={{ width: "48%" }}>
          <GradientButton text="Үргэлжлүүлэх" action={() => {}} />
        </View>
      </View>
    </View>
  );
};

export default BioScreen;

const styles = StyleSheet.create({});
