import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { ProgressBar } from "react-native-paper";
import {
  GRAY_ICON_COLOR,
  MAIN_BG_GRAY,
  MAIN_BORDER_RADIUS,
  MAIN_COLOR,
  MAIN_COLOR_GRAY,
} from "../../constant";
import Constants from "expo-constants";
import CustomSnackbar from "../../components/CustomSnackbar";
import BottomSheet from "../../components/BottomSheet";
import { CheckBox, Icon } from "@rneui/base";
import GradientButton from "../../components/GradientButton";
import LoanInput from "../../components/LoanInput";

const Step3 = (props) => {
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
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
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
            <View style={styles.touchableSelectContainer}>
              <Text style={styles.label}>Хэмжих нэгж</Text>
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
              label="Ажлын тоо хэмжээ"
              value={serviceData?.customerType}
              onChangeText={(e) =>
                setServiceData((prevState) => ({
                  ...prevState,
                  customerType: e,
                }))
              }
            />
            <Text style={styles.label}>Зураг оруулах</Text>
            <View style={styles.gridContainer}>
              {[...Array(10)]?.map((el, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {}}
                    style={styles.gridItem}
                    key={index}
                  >
                    <Text style={styles.featureText}>Зураг нэмэх</Text>
                    <Icon
                      name="image"
                      type="feather"
                      size={20}
                      color={GRAY_ICON_COLOR}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            <LoanInput
              label="Тайлбар"
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
            <LoanInput
              label="И-мэйл"
              value={serviceData?.customerType}
              onChangeText={(e) =>
                setServiceData((prevState) => ({
                  ...prevState,
                  customerType: e,
                }))
              }
              keyboardType="email-address"
            />
            <LoanInput
              label="Утас"
              value={serviceData?.customerType}
              onChangeText={(e) =>
                setServiceData((prevState) => ({
                  ...prevState,
                  customerType: e,
                }))
              }
              keyboardType="number-pad"
            />
            <CheckBox
              containerStyle={{
                padding: 0,
                margin: 0,
                marginLeft: 0,
                backgroundColor: MAIN_BG_GRAY,
                marginTop: 10,
              }}
              textStyle={{
                fontWeight: "bold",
                marginLeft: 5,
              }}
              title="Мессэнжер нээх"
              checked={1}
              onPress={() => {}}
              iconType="material-community"
              checkedIcon="checkbox-outline"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor={MAIN_COLOR}
              uncheckedColor={MAIN_COLOR}
            />
            <CheckBox
              containerStyle={{
                padding: 0,
                margin: 0,
                marginLeft: 0,
                backgroundColor: MAIN_BG_GRAY,
                marginTop: 10,
              }}
              textStyle={{
                fontWeight: "bold",
                marginLeft: 5,
              }}
              title="Үйлчилгээний нөхцөл зөвшөөрөх"
              checked={1}
              onPress={() => {}}
              iconType="material-community"
              checkedIcon="checkbox-outline"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor={MAIN_COLOR}
              uncheckedColor={MAIN_COLOR}
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
                  action={() => {}}
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

export default Step3;

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
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  gridItem: {
    marginBottom: 10,
    borderRadius: 4,
    height: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: MAIN_COLOR_GRAY,
    width: "48%", // is 50% of container width
  },
  featureIcon: {
    resizeMode: "contain",
    width: 40,
    height: 40,
  },
  featureText: {
    color: "#798585",
    marginRight: 5,
    fontSize: 12,
  },
});
