import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { Button } from "@rneui/base";
import GradientButton from "./GradientButton";

const BottomSheet = ({
  sheetRef,
  title,
  bodyText, //sheet -н text
  sheetheight, //sheet -н өндөр
  topBtnText, //дээд товчны text
  btmBtnText, //доод товчны text
  topBtnFunction, //дээд товчны FUNCTION
  type, // type ['reg','']
  setDataFunction, //Регистрийн дугаарын үсэг хадгалах FUNCTION
  dragDown, //sheet -г доош чирж хаах
  backClick, //sheet -н гадна дарж хаах
  displayName,
}) => {
  return (
    <RBSheet
      ref={sheetRef}
      height={400}
      closeOnDragDown={dragDown} //sheet -г доош чирж хаах
      closeOnPressMask={backClick} //sheet -н гадна дарж хаах
      customStyles={{
        container: {
          backgroundColor: "#fff",
          flexDirection: "column",
          borderTopEndRadius: 16,
          borderTopStartRadius: 16,
        },
        draggableIcon: {
          backgroundColor: "#000",
        },
      }}
    >
      <View style={styles.bottomSheetContainer}>
        <Text>XAAAAAAAAAAA</Text>
      </View>
    </RBSheet>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  lookupcontainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    paddingBottom: 15,
    paddingTop: 10,
  },
  bottomSheetTitle: {
    // color: MAIN_COLOR,
    // fontFamily: FONT_FAMILY_BOLD,
    fontSize: 22,
    marginTop: 10,
    textAlign: "center",
  },
  bottomSheetBody: {
    margin: 10,
    textAlign: "center",
    // fontFamily: FONT_FAMILY_LIGHT,
    fontSize: 18,
  },
  bottomSheetBodyReg: {
    marginRight: 15,
    marginBottom: 15,
    // fontFamily: FONT_FAMILY_BOLD,
    fontSize: 18,
    borderRadius: 4,
    // borderColor: MAIN_COLOR_GRAY,
    padding: 5,
    textAlign: "center",
    alignItems: "center",
    width: 40,
    height: 30,
    // color: TEXT_COLOR_GRAY,
  },
  bottomSheetBodyLookup: {
    // fontFamily: FONT_FAMILY_BOLD,
    fontSize: 18,
    padding: 10,
    // color: TEXT_COLOR_GRAY,
  },
});
