import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  GRAY_ICON_COLOR,
  MAIN_COLOR_GRAY,
  SERVER_URL,
  X_API_KEY,
} from "../../constant";
import Constants from "expo-constants";
import CustomSnackbar from "../../components/CustomSnackbar";
import BottomSheet from "../../components/BottomSheet";
import { Icon } from "@rneui/base";
import GradientButton from "../../components/GradientButton";
import { useNavigation } from "@react-navigation/native";
import MainContext from "../../contexts/MainContext";
import SpecialServiceData from "../../refs/SpecialServiceData";
import axios from "axios";

const Step1Special = (props) => {
  const state = useContext(MainContext);
  const navigation = useNavigation();
  const [data, setData] = useState(""); //BottomSheet рүү дамжуулах Дата
  const [uselessParam, setUselessParam] = useState(false); //BottomSheet -г дуудаж байгааг мэдэх гэж ашиглаж байгамоо
  const [fieldName, setFieldName] = useState(""); //Context -н аль утгыг OBJECT -с update хийхийг хадгалах
  const [displayName, setDisplayName] = useState(""); //LOOKUP -д харагдах утга (display value)

  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const [directions, setDirections] = useState([]);
  const [subDirections, setSubDirections] = useState([]);

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
    console.log("state?.serviceData", state?.serviceData);
  }, []);

  useEffect(() => {
    state?.setServiceData((prevState) => ({
      ...prevState,
      directionId: "",
      subDirectionId: "",
    }));
    state?.serviceData?.specialService && getDirections();
  }, [state?.serviceData?.specialService]);

  useEffect(() => {
    console.log(
      "state?.serviceData?.directionId",
      state?.serviceData?.directionId
    );
    state?.setServiceData((prevState) => ({
      ...prevState,
      subDirectionId: "",
    }));
    state?.serviceData?.directionId && getSubDirections();
  }, [state?.serviceData?.directionId]);

  const getDirections = async () => {
    setDirections([]);
    await axios
      .get(`${SERVER_URL}reference/direction`, {
        params: {
          specialService: state?.serviceData?.specialService?.type,
        },
        headers: {
          "X-API-KEY": X_API_KEY,
        },
      })
      .then((response) => {
        // console.log(
        //   "get Directions response",
        //   JSON.stringify(response.data.response)
        // );
        setDirections(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching STEP1 get Directions:", error);
        if (error.response.status == "401") {
          state.setIsLoggedIn(false);
          state.setErrorMsg(
            "Токены хүчинтэй хугацаа дууссан байна. Дахин нэвтэрнэ үү"
          );
        }
      });
  };

  const getSubDirections = async () => {
    setSubDirections([]);
    await axios
      .get(`${SERVER_URL}reference/sub-direction`, {
        params: {
          directionId: state?.serviceData?.directionId?.id,
        },
        headers: {
          "X-API-KEY": X_API_KEY,
        },
      })
      .then((response) => {
        console.log(
          "get SubDirections response",
          JSON.stringify(response.data.response)
        );
        setSubDirections(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching STEP1 get Directions:", error);
        if (error.response.status == "401") {
          state.setIsLoggedIn(false);
          state.setErrorMsg(
            "Токены хүчинтэй хугацаа дууссан байна. Дахин нэвтэрнэ үү"
          );
        }
      });
  };

  const goNext = () => {
    // if (state?.serviceData?.specialService == "") {
    //   onToggleSnackBar("Онцгой үйлчилгээ сонгоно уу.");
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
            <Text style={styles.label}>Онцгой үйлчилгээ</Text>
            <TouchableOpacity
              style={styles.touchableSelect}
              onPress={() => {
                setLookupData(SpecialServiceData, "specialService", "title");
              }}
            >
              <Text style={styles.selectedText} numberOfLines={1}>
                {state?.serviceData.specialService != ""
                  ? state?.serviceData.specialService?.title
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
                setLookupData(directions, "directionId", "name");
              }}
              disabled={
                state?.serviceData?.specialService == "" ||
                directions?.length == 0
              }
            >
              <Text style={styles.selectedText} numberOfLines={1}>
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
                setLookupData(subDirections, "subDirectionId", "name");
              }}
              disabled={
                state?.serviceData?.directionId == "" ||
                subDirections?.length == 0
              }
            >
              <Text style={styles.selectedText} numberOfLines={1}>
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

export default Step1Special;

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
