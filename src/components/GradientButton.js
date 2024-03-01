import { StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { GRADIENT_END, GRADIENT_START } from "../constant";
import { LinearGradient } from "expo-linear-gradient";

const GradientButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={props.action}
      disabled={props.disabled}
    >
      <LinearGradient
        colors={[GRADIENT_START, GRADIENT_END]}
        style={{
          borderRadius: 8,
          height: 45,
          opacity: props.disabled ? 0.6 : 1,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.btnText}>{props.text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 45,
    justifyContent: "center",
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
    paddingHorizontal: 8,
    height: 45,
    paddingVertical: Platform.OS == "ios" ? 12 : 0,
  },
});
