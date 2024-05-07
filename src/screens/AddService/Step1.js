import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GRAY_ICON_COLOR, MAIN_COLOR_GRAY } from "../../constant";
import Constants from "expo-constants";
import CustomSnackbar from "../../components/CustomSnackbar";
import BottomSheet from "../../components/BottomSheet";
import { Icon } from "@rneui/base";
import GradientButton from "../../components/GradientButton";
import { useNavigation } from "@react-navigation/native";
import MainContext from "../../contexts/MainContext";
import UserTabData from "../../refs/UserTabData";

const Step1 = (props) => {
  const state = useContext(MainContext);
  const navigation = useNavigation();
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

  useEffect(() => {
    state?.setServiceData((prevState) => ({
      ...prevState,
      directionId: "",
      subDirectionId: "",
    }));
  }, [state?.serviceData?.mainDirectionId]);

  useEffect(() => {
    state?.setServiceData((prevState) => ({
      ...prevState,
      subDirectionId: "",
    }));
  }, [state?.serviceData?.directionId]);

  const goNext = () => {
    // if (state?.serviceData?.categoryId == "") {
    //   onToggleSnackBar("Хэрэглэгчийн төрөл сонгоно уу.");
    // } else if (state?.serviceData?.mainDirectionId == "") {
    //   onToggleSnackBar("Үйл ажиллагааны үндсэн чиглэл сонгоно уу.");
    // } else if (state?.serviceData?.directionId == "") {
    //   onToggleSnackBar("Үйл ажилллагааны чиглэл сонгоно уу.");
    // } else if (state?.serviceData?.subDirectionId == "") {
    //   onToggleSnackBar("Үйл ажиллагааны нэр сонгоно уу.");
    // } else {
    //   state?.setCurrentStep(2);
    // }
    state?.setCurrentStep(2);
  };

  return (
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
            <Text style={styles.label}>Хэрэглэгчийн төрөл</Text>
            <TouchableOpacity
              style={styles.touchableSelect}
              onPress={() => {
                setLookupData(UserTabData, "categoryId", "title");
              }}
            >
              <Text style={styles.selectedText}>
                {state?.serviceData.categoryId != ""
                  ? state?.serviceData.categoryId?.name
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
            <Text style={styles.label}>Үйл ажиллагааны үндсэн чиглэл</Text>
            <TouchableOpacity
              style={styles.touchableSelect}
              onPress={() => {
                setLookupData(state?.mainDirection, "mainDirectionId", "name");
              }}
            >
              <Text style={styles.selectedText}>
                {state?.serviceData.mainDirectionId != ""
                  ? state?.serviceData.mainDirectionId?.name
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
            <Text style={styles.label}>Үйл ажилллагааны чиглэл</Text>
            <TouchableOpacity
              style={styles.touchableSelect}
              onPress={() => {
                setLookupData(
                  state?.serviceData?.mainDirectionId?.children,
                  "directionId",
                  "name"
                );
              }}
              disabled={
                state?.serviceData?.mainDirectionId == "" ||
                (state?.serviceData?.mainDirectionId.hasOwnProperty(
                  "children"
                ) &&
                  state?.serviceData?.mainDirectionId?.children?.length == 0)
              }
            >
              <Text style={styles.selectedText}>
                {state?.serviceData.directionId != ""
                  ? state?.serviceData.directionId?.name
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
            <Text style={styles.label}>Үйл ажиллагааны нэр</Text>
            <TouchableOpacity
              style={styles.touchableSelect}
              onPress={() => {
                setLookupData(
                  state?.serviceData?.directionId?.sub_children,
                  "subDirectionId",
                  "name"
                );
              }}
              disabled={
                state?.serviceData?.directionId == "" ||
                (state?.serviceData?.directionId.hasOwnProperty(
                  "sub_children"
                ) &&
                  state?.serviceData?.directionId?.sub_children?.length == 0)
              }
            >
              <Text style={styles.selectedText}>
                {state?.serviceData.subDirectionId != ""
                  ? state?.serviceData.subDirectionId?.name
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
          <View style={styles.btmButtonContainer}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.backBtnText}>Буцах</Text>
            </TouchableOpacity>
            <View style={{ width: "48%" }}>
              <GradientButton
                text={`Хадгалах (${state?.currentStep}/${props.totalStep})`}
                action={() => {
                  goNext();
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
  );
};

export default Step1;

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
