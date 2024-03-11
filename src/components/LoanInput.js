import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { MAIN_COLOR_GRAY } from "../constant";

const LoanInput = (props) => {
  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        style={[styles.generalInput, { height: props.multiline ? 80 : "" }]}
        editable={!props.disabled}
        selectTextOnFocus={false}
        placeholder={props?.multiline ? "" : props.label}
      />
    </View>
  );
};

export default LoanInput;

const styles = StyleSheet.create({
  generalInput: {
    paddingLeft: 15,
    paddingRight: 10,
    backgroundColor: MAIN_COLOR_GRAY,
    marginBottom: 5,
    minHeight: 45,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: MAIN_COLOR_GRAY,
    color: "#000",
  },
  label: {
    fontWeight: "bold",
    padding: 5,
  },
});
