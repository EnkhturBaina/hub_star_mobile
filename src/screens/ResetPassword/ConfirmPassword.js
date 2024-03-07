import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { MAIN_BG_GRAY, MAIN_COLOR } from "../../constant";
import { Button } from "@rneui/base";
import { useHeaderHeight } from "@react-navigation/elements";
import confirm from "../../../assets/password/confirm.png";

const CELL_COUNT = 4;

const ConfirmPassword = (props) => {
  const headerHeight = useHeaderHeight();
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(true);
  const [value, setValue] = useState("");
  const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {}, []);
  useEffect(() => {
    //Баталгаажуулах код оруулсан button Идэвхтэй болгох
    setConfirmButtonDisabled(value.length == 4 ? false : true);
  }, [value]);
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight}
      behavior={Platform.OS == "ios" ? "padding" : ""}
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        keyboardShouldPersistTaps="always" // INPUT -с гадна дарахад keep keyboard open
        bounces={false}
        contentContainerStyle={styles.mainContainer}
      >
        <Text style={{ fontWeight: 500 }}>
          Бид (+976) 86****57 дугаар луу баталгаажуулах код илгээлээ.
        </Text>

        <Image
          source={confirm}
          resizeMode="contain"
          style={{ width: "100%", height: 150 }}
        />
        <CodeField
          ref={ref}
          {...propss}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          autoFocus={true}
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
        <TouchableOpacity>
          <Text
            style={{
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            Дахин илгээх үү? 00:30
          </Text>
        </TouchableOpacity>
        <Button
          containerStyle={{ marginTop: 10 }}
          title="Баталгаажуулах"
          color={MAIN_COLOR}
          radius={12}
          onPress={() => {
            props.navigation.navigate("ChangePassword");
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

export default ConfirmPassword;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-around",
  },
  codeFieldRoot: {
    width: 230,
    marginLeft: "auto",
    marginRight: "auto",
  },
  cellRoot: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: MAIN_BG_GRAY,
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
