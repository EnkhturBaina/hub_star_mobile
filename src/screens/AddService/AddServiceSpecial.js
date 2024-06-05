import { Platform, SafeAreaView, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ProgressBar } from "react-native-paper";
import { GRAY_ICON_COLOR, MAIN_COLOR } from "../../constant";
import Step1Special from "./Step1Special";
import Step2Special from "./Step2Special";
import MainContext from "../../contexts/MainContext";
import PublicSelection from "./Step3/Special/PublicSelection";
import InternationalTrade from "./Step3/Special/InternationalTrade";
import ConsultingService from "./Step3/Special/ConsultingService";
import VocationalTraining from "./Step3/Special/VocationalTraining";
import LaboratoryMaterial from "./Step3/Special/LaboratoryMaterial";
import MakeBudget from "./Step3/Special/MakeBudget";
import GradientButton from "../../components/GradientButton";
import CustomSnackbar from "../../components/CustomSnackbar";
import { useNavigation } from "@react-navigation/native";
import CustomDialog from "../../components/CustomDialog";

const AddServiceSpecial = (props) => {
	const state = useContext(MainContext);
	const navigation = useNavigation();
	const totalStep = 3;

	const [visibleSnack, setVisibleSnack] = useState(false);
	const [snackBarMsg, setSnackBarMsg] = useState("");

	const [visibleDialog, setVisibleDialog] = useState(false); //Dialog харуулах
	const [dialogType, setDialogType] = useState("success"); //Dialog харуулах төрөл
	const [dialogText, setDialogText] = useState(""); //Dialog -н текст

	const [tempUnitAmount, setTempUnitAmount] = useState(null);
	//Snacbkbar харуулах
	const onToggleSnackBar = (msg) => {
		setVisibleSnack(!visibleSnack);
		setSnackBarMsg(msg);
	};

	//Snacbkbar хаах
	const onDismissSnackBar = () => setVisibleSnack(false);

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

	const createAdverstment = () => {
		state
			.createAd()
			.then((res) => {
				if (res.data.statusCode == 200) {
					setDialogText("Таны зар амжилттай нийтлэгдлээ.");
					setVisibleDialog(true);
				}
			})
			.catch((err) => {
				// console.log("err", err);
			});
	};

	const checkValid = () => {
		if (state.currentStep == 1) {
			if (state.serviceData?.specialService == null) {
				onToggleSnackBar("Онцгой үйлчилгээ сонгоно уу.");
			} else if (state.serviceData?.directionId == null) {
				onToggleSnackBar("Үйл ажилллагааны чиглэл сонгоно уу.");
			} else if (state.serviceData?.subDirectionId == null) {
				onToggleSnackBar("Үйл ажиллагааны нэр сонгоно уу.");
			} else {
				state.setCurrentStep(2);
			}
		} else if (state.currentStep == 2) {
			if (state.serviceData?.title == null) {
				onToggleSnackBar("Зарын гарчиг оруулна уу.");
			} else if (state.serviceData?.provinceId == null) {
				onToggleSnackBar("Аймаг, хот сонгоно уу.");
			} else if (state.serviceData?.districtId == null) {
				onToggleSnackBar("Сум, дүүрэг сонгоно уу.");
			} else if (state.serviceData?.khorooId == null) {
				onToggleSnackBar("Баг, хороо сонгоно уу.");
			} else if (state.serviceData?.address == null) {
				onToggleSnackBar("Байршил оруулна уу.");
			} else {
				state.setCurrentStep(3);
			}
		} else if (state.currentStep == 3) {
		}
	};
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "#fff"
			}}
		>
			<CustomSnackbar visible={visibleSnack} dismiss={onDismissSnackBar} text={snackBarMsg} topPos={-10} />
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
			<View style={styles.btmButtonContainer}>
				<TouchableOpacity
					style={styles.backBtn}
					onPress={() => {
						// navigation.goBack();
						if (state.currentStep == 1) {
							navigation.goBack();
						} else {
							state.setCurrentStep(state.currentStep - 1);
						}
					}}
				>
					<Text style={styles.backBtnText}>Буцах</Text>
				</TouchableOpacity>
				<View style={{ width: "48%" }}>
					<GradientButton
						text={`Хадгалах (${state.currentStep}/${totalStep})`}
						action={() => {
							checkValid();
						}}
					/>
				</View>
			</View>
			<CustomDialog
				visible={visibleDialog}
				confirmFunction={() => {
					setVisibleDialog(false);
					state.setCurrentStep(1);
					state.clearServiceData();
					navigation.navigate("AddServiceFirst");
					// dialogType == "success" && props.navigation.goBack();
				}}
				declineFunction={() => {}}
				text={dialogText}
				confirmBtnText="Хаах"
				DeclineBtnText=""
				type={dialogType}
			/>
		</SafeAreaView>
	);
};

export default AddServiceSpecial;

const styles = StyleSheet.create({
	btmButtonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
		marginHorizontal: 20
	},
	backBtn: {
		width: "48%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12,
		borderWidth: 1.5,
		borderColor: GRAY_ICON_COLOR
	},
	backBtnText: {
		fontSize: 16,
		fontWeight: "bold",
		color: GRAY_ICON_COLOR
	}
});
