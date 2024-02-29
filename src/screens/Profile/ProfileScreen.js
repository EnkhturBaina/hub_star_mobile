import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { Icon } from "@rneui/base";
import MainContext from "../../contexts/MainContext";
import CustomSnackbar from "../../components/CustomSnackbar";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const ProfileScreen = (props) => {
  const state = useContext(MainContext);

  const tabBarHeight = useBottomTabBarHeight();
  const onToggleSwitch = () => {
    onToggleSnackBar("Ирц бүртгэл сануулах тохиргоо хийгдлээ");
  };

  const [visibleDialog, setVisibleDialog] = useState(false); //Dialog харуулах
  const [dialogType, setDialogType] = useState("warning"); //Dialog харуулах төрөл
  const [dialogText, setDialogText] = useState("Апп -с гарах уу?"); //Dialog -н текст

  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");

  //Snacbkbar харуулах
  const onToggleSnackBar = (msg) => {
    setVisibleSnack(!visibleSnack);
    setSnackBarMsg(msg);
  };

  //Snacbkbar хаах
  const onDismissSnackBar = () => setVisibleSnack(false);

  return (
    <View
      style={{
        flex: 1,
      }}
    ></View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
