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
import React, { useContext, useState } from "react";
import {
  GRAY_ICON_COLOR,
  MAIN_COLOR,
  MAIN_COLOR_GRAY,
} from "../../../constant";
import Constants from "expo-constants";
import CustomSnackbar from "../../../components/CustomSnackbar";
import BottomSheet from "../../../components/BottomSheet";
import { CheckBox, Icon } from "@rneui/base";
import GradientButton from "../../../components/GradientButton";
import LoanInput from "../../../components/LoanInput";
import MainContext from "../../../contexts/MainContext";

const Transportation = (props) => {
  const state = useContext(MainContext);
  const [data, setData] = useState(""); //BottomSheet рүү дамжуулах Дата
  const [uselessParam, setUselessParam] = useState(false); //BottomSheet -г дуудаж байгааг мэдэх гэж ашиглаж байгамоо
  const [fieldName, setFieldName] = useState(""); //Context -н аль утгыг OBJECT -с update хийхийг хадгалах
  const [displayName, setDisplayName] = useState(""); //LOOKUP -д харагдах утга (display value)

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

  const createAD = () => {
    if (state?.serviceData?.machineryTypeId == "") {
      onToggleSnackBar("Машин механизмийн төрөл сонгоно уу.");
    } else if (state?.serviceData?.markId == "") {
      onToggleSnackBar("Марк сонгоно уу.");
    } else if (state?.serviceData?.powerId == "") {
      onToggleSnackBar("Хүчин чадал сонгоно уу.");
    } else if (state?.serviceData?.unitAmount == "") {
      onToggleSnackBar("Нэгж үнэлгээ.цаг оруулна уу.");
    } else if (state?.serviceData?.packageAmount == "") {
      onToggleSnackBar("Багц үнэлгээ.өдөр оруулна уу.");
    } else if (state?.serviceData?.desciption == "") {
      onToggleSnackBar("Тайлбар оруулна уу.");
    } else if (state?.serviceData?.email == "") {
      onToggleSnackBar("И-мэйл оруулна уу.");
    } else if (state?.serviceData?.phone == "") {
      onToggleSnackBar("Утас оруулна уу.");
    } else {
      // state?.setCurrentStep(3);
    }
  };
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
          topPos={-Constants.statusBarHeight}
        />
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            bounces={false}
          >
            <Text>Transportation</Text>
            <View style={styles.touchableSelectContainer}>
              <Text style={styles.label}>Машин механизмийн төрөл</Text>
              <TouchableOpacity
                style={styles.touchableSelect}
                onPress={() => {
                  // setLookupData(UserTabData, "machineryTypeId", "name");
                }}
              >
                <Text style={styles.selectedText} numberOfLines={1}>
                  {state?.serviceData.machineryTypeId != ""
                    ? state?.serviceData.machineryTypeId?.name
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
              <Text style={styles.label}>Марк</Text>
              <TouchableOpacity
                style={styles.touchableSelect}
                onPress={() => {
                  // setLookupData(UserTabData, "markId", "name");
                }}
              >
                <Text style={styles.selectedText} numberOfLines={1}>
                  {state?.serviceData.markId != ""
                    ? state?.serviceData.markId?.name
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
              <Text style={styles.label}>Хүчин чадал</Text>
              <TouchableOpacity
                style={styles.touchableSelect}
                onPress={() => {
                  // setLookupData(UserTabData, "powerId", "name");
                }}
              >
                <Text style={styles.selectedText} numberOfLines={1}>
                  {state?.serviceData.powerId != ""
                    ? state?.serviceData.powerId?.name
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
              label="Нэгж үнэлгээ.цаг"
              keyboardType="number-pad"
              value={state?.serviceData?.unitAmount}
              onChangeText={(e) =>
                state?.setServiceData((prevState) => ({
                  ...prevState,
                  unitAmount: state.addCommas(state.removeNonNumeric(e)),
                }))
              }
            />
            <LoanInput
              label="Багц үнэлгээ.өдөр"
              keyboardType="number-pad"
              value={state?.serviceData?.packageAmount}
              onChangeText={(e) =>
                state?.setServiceData((prevState) => ({
                  ...prevState,
                  packageAmount: state.addCommas(state.removeNonNumeric(e)),
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
              value={state?.serviceData?.desciption}
              onChangeText={(e) =>
                state?.setServiceData((prevState) => ({
                  ...prevState,
                  desciption: e,
                }))
              }
              numberOfLines={3}
              multiline
            />
            <LoanInput
              label="И-мэйл"
              value={state?.serviceData?.email}
              onChangeText={(e) =>
                state?.setServiceData((prevState) => ({
                  ...prevState,
                  email: e,
                }))
              }
              keyboardType="email-address"
            />
            <LoanInput
              label="Утас"
              value={state?.serviceData?.phone}
              onChangeText={(e) =>
                state?.setServiceData((prevState) => ({
                  ...prevState,
                  phone: e,
                }))
              }
              keyboardType="number-pad"
            />
            <CheckBox
              containerStyle={{
                padding: 0,
                marginLeft: 0,
                marginTop: 10,
              }}
              textStyle={{
                fontWeight: "bold",
                marginLeft: 5,
              }}
              title="Мессэнжер нээх"
              checked={state?.serviceData?.isMessenger}
              onPress={() => {
                state?.setServiceData((prevState) => ({
                  ...prevState,
                  isMessenger: !state?.serviceData?.isMessenger,
                }));
              }}
              iconType="material-community"
              checkedIcon="checkbox-outline"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor={MAIN_COLOR}
              uncheckedColor={MAIN_COLOR}
            />
            <CheckBox
              containerStyle={{
                padding: 0,
                marginLeft: 0,
                marginTop: 10,
              }}
              textStyle={{
                fontWeight: "bold",
                marginLeft: 5,
              }}
              title="Үйлчилгээний нөхцөл зөвшөөрөх"
              checked={state?.serviceData?.isTermOfService}
              onPress={() => {
                state?.setServiceData((prevState) => ({
                  ...prevState,
                  isTermOfService: !state?.serviceData?.isTermOfService,
                }));
              }}
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
                  state?.setCurrentStep(2);
                }}
              >
                <Text style={styles.backBtnText}>Буцах</Text>
              </TouchableOpacity>
              <View style={{ width: "48%" }}>
                <GradientButton
                  text={`Хадгалах (${state?.currentStep}/${props.totalStep})`}
                  action={() => {
                    createAD();
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
            state?.setServiceData((prevState) => ({
              ...prevState,
              [fieldName]: e,
            }));
          }}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Transportation;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  label: {
    fontWeight: "bold",
    padding: 5,
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
    width: "90%",
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
