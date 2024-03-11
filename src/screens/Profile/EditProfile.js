import {
  StyleSheet,
  View,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { MAIN_COLOR_GRAY } from "../../constant";
import MainContext from "../../contexts/MainContext";
import LoanInput from "../../components/LoanInput";
import CustomDialog from "../../components/CustomDialog";
import axios from "axios";
import Loader from "../../components/Loader";
import CustomSnackbar from "../../components/CustomSnackbar";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import GradientButton from "../../components/GradientButton";

const EditProfile = (props) => {
  const state = useContext(MainContext);

  const tabBarHeight = useBottomTabBarHeight();

  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  const [visibleDialog, setVisibleDialog] = useState(false); //Dialog харуулах
  const [dialogType, setDialogType] = useState("warning"); //Dialog харуулах төрөл
  const [dialogText, setDialogText] = useState(""); //Dialog -н текст

  const [profileData, setProfileData] = useState("");
  const [editableData, setEditableData] = useState({
    FirstName: "",
    LastName: "",
    position: "",
    BirthDate: "",
    CitizenshipNumber: "",
    ERPGenderTemplateId: "",
    Mobile: "",
    email: "",
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

  useEffect(() => {}, []);

  const saveProfileData = async () => {
    if (!editableData.LastName) {
      onToggleSnackBar("Овог оруулна уу.");
    } else if (!editableData.FirstName) {
      onToggleSnackBar("Нэр оруулна уу.");
    } else if (!editableData.jobPosition) {
      onToggleSnackBar("Албан тушаал оруулна уу.");
    } else if (!editableData.mobileNumber) {
      onToggleSnackBar("Утасны дугаар оруулна уу.");
    } else if (!editableData.Address) {
      onToggleSnackBar("Хаяг оруулна уу.");
    } else {
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingBottom: tabBarHeight,
      }}
    >
      <CustomSnackbar
        visible={visibleSnack}
        dismiss={onDismissSnackBar}
        text={snackBarMsg}
        topPos={30}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* <HeaderUser /> */}

        {loading ? (
          <Loader />
        ) : (
          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              bounces={false}
            >
              <LoanInput
                label="Овог"
                value={editableData.LastName}
                onChangeText={(e) =>
                  setEditableData((prevState) => ({
                    ...prevState,
                    LastName: e,
                  }))
                }
              />
              <LoanInput
                label="Нэр"
                value={editableData.FirstName}
                onChangeText={(e) =>
                  setEditableData((prevState) => ({
                    ...prevState,
                    FirstName: e,
                  }))
                }
              />
              <LoanInput
                label="Албан тушаал"
                value={profileData?.jobPosition}
                onChangeText={(e) =>
                  setEditableData((prevState) => ({
                    ...prevState,
                    jobPosition: e,
                  }))
                }
              />
              <LoanInput
                label="Утасны дугаар"
                value={profileData?.MobileNumber}
                onChangeText={(e) =>
                  setEditableData((prevState) => ({
                    ...prevState,
                    MobileNumber: e,
                  }))
                }
              />
              <LoanInput
                label="Хаяг"
                value={profileData?.Address}
                onChangeText={(e) =>
                  setEditableData((prevState) => ({
                    ...prevState,
                    Address: e,
                  }))
                }
                multiline={true}
                textAlignVertical="top"
              />
              <View className="w-full mt-2">
                <GradientButton text="Хадгалах" action={() => {}} />
              </View>
            </ScrollView>
          </View>
        )}
        <CustomDialog
          visible={visibleDialog}
          confirmFunction={() => {
            setVisibleDialog(false);
            // dialogType == "success" && props.navigation.goBack();
          }}
          declineFunction={() => {}}
          text={dialogText}
          confirmBtnText="Хаах"
          DeclineBtnText=""
          type={dialogType}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditProfile;

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
  touchableSelectContainer: {
    marginBottom: 5,
  },
  touchableSelect: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: MAIN_COLOR_GRAY,
    height: 40,
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 10,
  },
});
