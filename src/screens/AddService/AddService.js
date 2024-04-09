import { SafeAreaView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { ProgressBar } from "react-native-paper";
import { MAIN_COLOR } from "../../constant";
import Constants from "expo-constants";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const AddService = (props) => {
  console.log("PROPS", props);
  const totalStep = 3;
  const [currentStep, setCurrentStep] = useState(1);

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
        },
      });
    // TabBar Hide хийх
  }, [props.navigation]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#fff",
      }}
    >
      <ProgressBar
        progress={currentStep / totalStep}
        color={MAIN_COLOR}
        style={{ marginVertical: 20, marginHorizontal: 20 }}
      />
      {currentStep == 1 && (
        <Step1
          currentStep={currentStep}
          goNext={() => setCurrentStep(2)}
          totalStep={totalStep}
        />
      )}
      {currentStep == 2 && (
        <Step2
          currentStep={currentStep}
          goNext={() => setCurrentStep(3)}
          goBack={() => setCurrentStep(1)}
          totalStep={totalStep}
        />
      )}
      {currentStep == 3 && (
        <Step3
          currentStep={currentStep}
          goBack={() => setCurrentStep(2)}
          totalStep={totalStep}
        />
      )}
    </SafeAreaView>
  );
};

export default AddService;
