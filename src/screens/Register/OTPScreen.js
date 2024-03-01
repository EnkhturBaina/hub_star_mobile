import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { MAIN_BG_GRAY, MAIN_COLOR, MAIN_COLOR_GRAY } from "../../constant";
import GradientButton from "../../components/GradientButton";

const CELL_COUNT = 4;

const OTPScreen = (props) => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <View
      style={{ backgroundColor: MAIN_BG_GRAY, flex: 1, paddingHorizontal: 20 }}
    >
      <Text className="font-bold mb-5">
        Бид (+976) 8050 1010 дугаар луу баталгаажуулах код илгээлээ.
      </Text>
      <CodeField
        ref={ref}
        {...propss}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}
          >
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      <Text className="font-bold mb-5 text-center mt-5">
        Дахин илгээх үү? 00:30
      </Text>
      <View className="">
        <GradientButton
          text="Баталгаажуулах"
          action={() => props.navigation.navigate("BioScreen")}
        />
      </View>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20,
    width: 230,
    marginLeft: "auto",
    marginRight: "auto",
  },
  cellRoot: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: MAIN_COLOR_GRAY,
    borderWidth: 1,
    borderRadius: 8,
  },
  cellText: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  focusCell: {
    borderColor: MAIN_COLOR,
    borderWidth: 2,
  },
});
