import { SafeAreaView } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ProgressBar } from "react-native-paper";
import { MAIN_COLOR } from "../../constant";
import Constants from "expo-constants";
import MainContext from "../../contexts/MainContext";
import Step1Special from "./Step1Special";
import Step2Special from "./Step2Special";
import Machinery from "./Step3/Machinery";
import Transportation from "./Step3/Transportation";
import Supplier from "./Step3/Supplier";
import Executor from "./Step3/Executor";
import Subscriber from "./Step3/Subscriber";

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
      {state?.currentStep == 1 && <Step1Special totalStep={totalStep} />}
      {state?.currentStep == 2 && <Step2Special totalStep={totalStep} />}
      {state?.currentStep == 3 && state.userType?.type == "SUBSCRIBER" ? (
        <Subscriber totalStep={totalStep} />
      ) : null}
      {state?.currentStep == 3 && state.userType?.type == "EXECUTOR" ? (
        <Executor totalStep={totalStep} />
      ) : null}
      {state?.currentStep == 3 && state.userType?.type == "SUPPLIER" ? (
        <Supplier totalStep={totalStep} />
      ) : null}
      {state?.currentStep == 3 && state.userType?.type == "TRANSPORTATION" ? (
        <Transportation totalStep={totalStep} />
      ) : null}
      {state?.currentStep == 3 && state.userType?.type == "MACHINERY" ? (
        <Machinery totalStep={totalStep} />
      ) : null}
    </SafeAreaView>
  );
};

export default AddServiceSpecial;
