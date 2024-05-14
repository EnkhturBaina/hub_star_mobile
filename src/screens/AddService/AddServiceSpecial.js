import { SafeAreaView } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ProgressBar } from "react-native-paper";
import { MAIN_COLOR } from "../../constant";
import Constants from "expo-constants";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import MainContext from "../../contexts/MainContext";

const AddServiceSpecial = (props) => {
  const state = useContext(MainContext);
  const totalStep = 3;

  useLayoutEffect(() => {
    // TabBar Hide хийх
    props.navigation?.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      props.navigation?.getParent()?.setOptions({
        tabBarStyle: {
          position: "absolute",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 105,
          padding: 10,
        },
      });
    // TabBar Hide хийх
  }, [props.navigation]);
  useEffect(() => {
    console.log(" =========> ", props?.route?.params);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#fff",
      }}
    >
      <ProgressBar
        progress={state?.currentStep / totalStep}
        color={MAIN_COLOR}
        style={{ marginVertical: 20, marginHorizontal: 20 }}
      />
      {state?.currentStep == 1 && <Step1 totalStep={totalStep} />}
      {state?.currentStep == 2 && <Step2 totalStep={totalStep} />}
      {state?.currentStep == 3 && <Step3 totalStep={totalStep} />}
    </SafeAreaView>
  );
};

export default AddServiceSpecial;
