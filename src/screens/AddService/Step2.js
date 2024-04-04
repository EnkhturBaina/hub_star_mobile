import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { ProgressBar } from "react-native-paper";
import { GRAY_ICON_COLOR, MAIN_COLOR, MAIN_COLOR_GRAY } from "../../constant";
import Constants from "expo-constants";
import CustomSnackbar from "../../components/CustomSnackbar";
import BottomSheet from "../../components/BottomSheet";
import { Icon } from "@rneui/base";
import GradientButton from "../../components/GradientButton";
import LoanInput from "../../components/LoanInput";

const Step2 = (props) => {
  const [data, setData] = useState(""); //BottomSheet рүү дамжуулах Дата
  const [uselessParam, setUselessParam] = useState(false); //BottomSheet -г дуудаж байгааг мэдэх гэж ашиглаж байгамоо
  const [fieldName, setFieldName] = useState(""); //Context -н аль утгыг OBJECT -с update хийхийг хадгалах
  const [displayName, setDisplayName] = useState(""); //LOOKUP -д харагдах утга (display value)

  const [serviceData, setServiceData] = useState({
    customerType: "",
  });

  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");

  //Snacbkbar харуулах
  const onToggleSnackBar = (msg) => {
    setVisibleSnack(!visibleSnack);
    setSnackBarMsg(msg);
  };

  //Snacbkbar хаах
  const onDismissSnackBar = () => setVisibleSnack(false);

  const setLookupData = (data, field, display) => {
    // console.log("refRBSheet", refRBSheet);
    setData(data); //Lookup -д харагдах дата
    setFieldName(field); //Context -н object -н update хийх key
    setDisplayName(display); //Lookup -д харагдах датаны текст талбар
    setUselessParam(!uselessParam);
  };

  const ZZZZZZZZZZZZ = [
    {
      id: 1,
      first_name: "Jeanette",
      last_name: "Penddreth",
    },
    {
      id: 2,
      first_name: "Giavani",
      last_name: "Frediani",
    },
    {
      id: 3,
      first_name: "Noell",
      last_name: "Bea",
    },
    {
      id: 4,
      first_name: "Willard",
      last_name: "Valek",
    },
  ];
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Constants.statusBarHeight,
          backgroundColor: "#fff",
        }}
      >
        <CustomSnackbar
          visible={visibleSnack}
          dismiss={onDismissSnackBar}
          text={snackBarMsg}
          topPos={1}
        />
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            bounces={false}
          >
            <LoanInput
              label="Зарын гарчиг"
              value={serviceData?.customerType}
              onChangeText={(e) =>
                setServiceData((prevState) => ({
                  ...prevState,
                  customerType: e,
                }))
              }
            />
            <View style={styles.touchableSelectContainer}>
              <Text style={styles.label}>Хэрэглэгчийн ангилал</Text>
              <TouchableOpacity
                style={styles.touchableSelect}
                onPress={() => {
                  setLookupData(ZZZZZZZZZZZZ, "customerType", "first_name");
                }}
              >
                <Text style={styles.selectedText}>
                  {serviceData.customerType != ""
                    ? serviceData.customerType?.first_name
                    : "Сонгох"}
                </Text>
                <Icon
                  name="keyboard-arrow-down"
                  type="material-icons"
                  size={30}
                  color={GRAY_ICON_COLOR}
                />
              </TouchableOpacity>
            </View>
            <LoanInput
              label="Үнэ"
              value={serviceData?.customerType}
              onChangeText={(e) =>
                setServiceData((prevState) => ({
                  ...prevState,
                  customerType: e,
                }))
              }
            />
            <View style={styles.touchableSelectContainer}>
              <Text style={styles.label}>Аймаг, хот</Text>
              <TouchableOpacity
                style={styles.touchableSelect}
                onPress={() => {
                  setLookupData(ZZZZZZZZZZZZ, "customerType", "first_name");
                }}
              >
                <Text style={styles.selectedText}>
                  {serviceData.customerType != ""
                    ? serviceData.customerType?.first_name
                    : "Сонгох"}
                </Text>
                <Icon
                  name="keyboard-arrow-down"
                  type="material-icons"
                  size={30}
                  color={GRAY_ICON_COLOR}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.touchableSelectContainer}>
              <Text style={styles.label}>Сум, дүүрэг</Text>
              <TouchableOpacity
                style={styles.touchableSelect}
                onPress={() => {
                  setLookupData(ZZZZZZZZZZZZ, "customerType", "first_name");
                }}
              >
                <Text style={styles.selectedText}>
                  {serviceData.customerType != ""
                    ? serviceData.customerType?.first_name
                    : "Сонгох"}
                </Text>
                <Icon
                  name="keyboard-arrow-down"
                  type="material-icons"
                  size={30}
                  color={GRAY_ICON_COLOR}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.touchableSelectContainer}>
              <Text style={styles.label}>Баг, хороо</Text>
              <TouchableOpacity
                style={styles.touchableSelect}
                onPress={() => {
                  setLookupData(ZZZZZZZZZZZZ, "customerType", "first_name");
                }}
              >
                <Text style={styles.selectedText}>
                  {serviceData.customerType != ""
                    ? serviceData.customerType?.first_name
                    : "Сонгох"}
                </Text>
                <Icon
                  name="keyboard-arrow-down"
                  type="material-icons"
                  size={30}
                  color={GRAY_ICON_COLOR}
                />
              </TouchableOpacity>
            </View>
            <LoanInput
              label="Байршил"
              value={serviceData?.customerType}
              onChangeText={(e) =>
                setServiceData((prevState) => ({
                  ...prevState,
                  customerType: e,
                }))
              }
              numberOfLines={3}
              multiline
            />
            <View style={styles.btmButtonContainer}>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => {
                  props.goBack();
                }}
              >
                <Text style={styles.backBtnText}>Буцах</Text>
              </TouchableOpacity>
              <View style={{ width: "48%" }}>
                <GradientButton
                  text={`Хадгалах (${props.currentStep}/${props.totalStep})`}
                  action={() => {
                    props.goNext();
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>

        <BottomSheet
          bodyText={data}
          dragDown={true}
          backClick={true}
          type="lookup"
          fieldName={fieldName}
          displayName={displayName}
          lookUpType="profile"
          handle={uselessParam}
          action={(e) => {
            setServiceData((prevState) => ({
              ...prevState,
              customerType: e,
            }));
          }}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Step2;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  touchableSelectContainer: {
    marginBottom: 10,
  },
  touchableSelect: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    borderRadius: 12,
    backgroundColor: MAIN_COLOR_GRAY,
    height: 48,
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 10,
  },
  label: {
    fontWeight: "bold",
    padding: 5,
  },
  selectedText: {
    fontWeight: "500",
    color: GRAY_ICON_COLOR,
  },
  btmButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  backBtn: {
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: GRAY_ICON_COLOR,
  },
  backBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: GRAY_ICON_COLOR,
  },
});
