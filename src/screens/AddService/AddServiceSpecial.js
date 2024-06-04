import { Platform, SafeAreaView } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ProgressBar } from "react-native-paper";
import { MAIN_COLOR } from "../../constant";
import Constants from "expo-constants";
import MainContext from "../../contexts/MainContext";
import Step1Special from "./Step1Special";
import Step2Special from "./Step2Special";
import PublicSelection from "./Step3/Special/PublicSelection";
import InternationalTrade from "./Step3/Special/InternationalTrade";
import ConsultingService from "./Step3/Special/ConsultingService";
import VocationalTraining from "./Step3/Special/VocationalTraining";
import LaboratoryMaterial from "./Step3/Special/LaboratoryMaterial";
import MakeBudget from "./Step3/Special/MakeBudget";

const AddServiceSpecial = (props) => {
	const state = useContext(MainContext);
	const totalStep = 3;

	useLayoutEffect(() => {
		// TabBar Hide хийх
		props.navigation?.getParent()?.setOptions({
			tabBarStyle: {
				display: "none"
			}
		});
		return () =>
			props.navigation?.getParent()?.setOptions({
				tabBarStyle: {
					position: "absolute",
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
					height: Platform.OS == "ios" ? 105 : 80,
					padding: 10
				}
			});
		// TabBar Hide хийх
	}, [props.navigation]);

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "#fff"
			}}
		>
			<ProgressBar
				progress={state.currentStep / totalStep}
				color={MAIN_COLOR}
				style={{ marginVertical: 20, marginHorizontal: 20 }}
			/>
			{state.currentStep == 1 && <Step1Special totalStep={totalStep} />}
			{state.currentStep == 2 && <Step2Special totalStep={totalStep} />}
			{state.currentStep == 3 && state.serviceData?.specialService == "PUBLIC_SELECTION" ? (
				<PublicSelection totalStep={totalStep} />
			) : null}
			{state.currentStep == 3 && state.serviceData?.specialService == "INTERNATIONAL_TRADE" ? (
				<InternationalTrade totalStep={totalStep} />
			) : null}
			{state.currentStep == 3 && state.serviceData?.specialService == "CONSULTING_SERVICE" ? (
				<ConsultingService totalStep={totalStep} />
			) : null}
			{state.currentStep == 3 && state.serviceData?.specialService == "VOCATIONAL_TRAINING" ? (
				<VocationalTraining totalStep={totalStep} />
			) : null}
			{state.currentStep == 3 && state.serviceData?.specialService == "LABORATORY_MATERIAL" ? (
				<LaboratoryMaterial totalStep={totalStep} />
			) : null}
			{state.currentStep == 3 && state.serviceData?.specialService == "MAKE_BUDGET" ? (
				<MakeBudget totalStep={totalStep} />
			) : null}
		</SafeAreaView>
	);
};

export default AddServiceSpecial;
