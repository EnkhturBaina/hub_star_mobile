import { StyleSheet, Text, Image, View } from "react-native";
import React from "react";
import {
  // BUTTON_BORDER_RADIUS,
  // FONT_FAMILY_BOLD,
  MAIN_COLOR,
} from "../constant";
import { Dialog } from "@rneui/themed";
import GradientButton from "./GradientButton";

export default function ({
  visible,
  confirmFunction,
  declineFunction,
  text,
  confirmBtnText,
  DeclineBtnText,
  type,
}) {
  var imageType = null;
  if (type == "warning") {
    imageType = require("../../assets/empty.png");
  } else if (type == "error") {
    imageType = require("../../assets/empty.png");
  } else {
    imageType = require("../../assets/empty.png");
  }

  return (
    <Dialog
      isVisible={visible}
      overlayStyle={{
        padding: 10,
        backgroundColor: "#fff",
        // borderRadius: BUTTON_BORDER_RADIUS,
        alignItems: "center",
      }}
    >
      <Image source={imageType} style={{ width: 200, height: 200 }} />
      <Text
        style={{
          // fontFamily: FONT_FAMILY_BOLD,
          textAlign: "center",
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      >
        {text}
      </Text>

      <Dialog.Actions>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
          }}
        >
          <View style={{ marginHorizontal: 50 }}>
            <GradientButton
              text={confirmBtnText}
              action={() => confirmFunction()}
            />
          </View>
          {DeclineBtnText != "" ? (
            <Dialog.Button
              title={DeclineBtnText}
              onPress={() => declineFunction()}
              containerStyle={styles.dialogDeclineBtn}
              // radius={BUTTON_BORDER_RADIUS}
              titleStyle={{
                // fontFamily: FONT_FAMILY_BOLD,
                color: "#000",
              }}
            />
          ) : null}
        </View>
      </Dialog.Actions>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  dialogBtn: {
    marginBottom: 10,
    marginHorizontal: 50,
    backgroundColor: MAIN_COLOR,
  },
  dialogDeclineBtn: {
    marginHorizontal: 50,
    marginVertical: 5,
  },
});
