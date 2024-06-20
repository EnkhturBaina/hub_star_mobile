import { Platform, SafeAreaView, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ProgressBar } from "react-native-paper";
import { GRAY_ICON_COLOR, MAIN_COLOR, SERVER_URL, X_API_KEY } from "../../constant";
import Step1 from "./Step1";
import Step2 from "./Step2";
import MainContext from "../../contexts/MainContext";
import Subscriber from "./Step3/Subscriber";
import Executor from "./Step3/Executor";
import Supplier from "./Step3/Supplier";
import Transportation from "./Step3/Transportation";
import Machinery from "./Step3/Machinery";
import GradientButton from "../../components/GradientButton";
import CustomSnackbar from "../../components/CustomSnackbar";
import { useNavigation } from "@react-navigation/native";
import CustomDialog from "../../components/CustomDialog";
import axios from "axios";
import { i18n } from "../../refs/i18";

const AddService = (props) => {
	const state = useContext(MainContext);
	const navigation = useNavigation();
	const totalStep = 3;

	const [machineryType, setMachineryType] = useState([]);
	const [markData, setMarkData] = useState([]);
	const [powerData, setPowerData] = useState([]);
	const [modelData, setModelData] = useState([]);
	const [materials, setMaterials] = useState([]);

	const [visibleSnack, setVisibleSnack] = useState(false);
	const [snackBarMsg, setSnackBarMsg] = useState("");

	const [visibleDialog, setVisibleDialog] = useState(false); //Dialog харуулах
	const [dialogType, setDialogType] = useState("success"); //Dialog харуулах төрөл
	const [dialogText, setDialogText] = useState(""); //Dialog -н текст

	const [tempPrice, setTempPrice] = useState(null);
	const [tempUnitAmount, setTempUnitAmount] = useState(null);
	const [tempPackageAmount, setTempPackageAmount] = useState(null);
	//Snacbkbar харуулах
	const onToggleSnackBar = (msg) => {
		setVisibleSnack(!visibleSnack);
		setSnackBarMsg(msg);
	};

	//Snacbkbar хаах
	const onDismissSnackBar = () => setVisibleSnack(false);

	useEffect(() => {
		// Үйлчилгээ засах үед зурагнууд SET хийх
		if (props.route?.params?.images) {
			state.setServiceData((prevState) => ({
				...prevState,
				imageIds: props.route?.params?.images?.map((item) => item.id)
			}));
		}
	}, []);

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

	const getMachinery = async (params) => {
		console.log("RUN getMachinery");
		await axios
			.get(`${SERVER_URL}reference/machinery`, {
				params,
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				// console.log("get getMachinery", JSON.stringify(response.data.response));
				params.type == "MACHINERY_TYPE" && setMachineryType(response.data?.response);
				params.type == "MARK" && setMarkData(response.data?.response);
				params.type == "POWER" && setPowerData(response.data?.response);
				params.type == "MODEL" && setModelData(response.data?.response);
				params.type == "MATERIAL" && setMaterials(response.data?.response);
			})
			.catch(function (error) {
				if (error.response) {
					// console.log("error getIntro Data status", error.response.status);
					// console.log("error getIntro Data data", error.response.data);
				}
				if (error.response.status == "401") {
					state.Handle_401();
				}
			});
	};
	const createAdverstment = () => {
		state
			.createAd()
			.then((res) => {
				if (res.data.statusCode == 200) {
					setDialogText(i18n.t("successAdCreate"));
					setVisibleDialog(true);
				}
			})
			.catch((err) => {
				// console.log("err", err);
			});
	};
	const checkValid = () => {
		if (state.currentStep == 1) {
			if (state.serviceData?.userType == null) {
				onToggleSnackBar(`${i18n.t("userType")} ${i18n.t("pleaseChoose")}`);
			} else if (state.serviceData?.mainDirectionId == null) {
				onToggleSnackBar(`${i18n.t("mainDir")} ${i18n.t("pleaseChoose")}`);
			} else if (state.serviceData?.directionId == null) {
				onToggleSnackBar(`${i18n.t("dir")} ${i18n.t("pleaseChoose")}`);
			} else if (state.serviceData?.subDirectionId == null) {
				onToggleSnackBar(`${i18n.t("subDir")} ${i18n.t("pleaseChoose")}`);
			} else {
				state.setCurrentStep(2);
			}
		} else if (state.currentStep == 2) {
			if (state.serviceData?.title == null) {
				onToggleSnackBar(`${i18n.t("adTitle")} ${i18n.t("pleaseEnter")}`);
			} else if ((state.serviceData?.userType === "SUBSCRIBER" && tempPrice == null) || tempPrice == "") {
				onToggleSnackBar(`${i18n.t("price")} ${i18n.t("pleaseEnter")}`);
			} else if (state.serviceData?.provinceId == null) {
				onToggleSnackBar(`${i18n.t("adProvince")} ${i18n.t("pleaseChoose")}`);
			} else if (state.serviceData?.districtId == null) {
				onToggleSnackBar(`${i18n.t("adDistrict")} ${i18n.t("pleaseChoose")}`);
			} else if (state.serviceData?.khorooId == null) {
				onToggleSnackBar(`${i18n.t("adKhoroo")} ${i18n.t("pleaseChoose")}`);
			} else if (state.serviceData?.address == null) {
				onToggleSnackBar(`${i18n.t("adAddress")} ${i18n.t("pleaseEnter")}`);
			} else {
				state.setCurrentStep(3);
			}
		} else if (state.currentStep == 3) {
			if (state.serviceData?.userType === "SUBSCRIBER") {
				if (state.serviceData?.measurement == null) {
					onToggleSnackBar(`${i18n.t("measurement")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.counter == null) {
					onToggleSnackBar(`${i18n.t("counter")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.imageIds?.length == 0) {
					onToggleSnackBar(`${i18n.t("image")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.desciption == null) {
					onToggleSnackBar(`${i18n.t("desciption")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.email == null) {
					onToggleSnackBar(`${i18n.t("email")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.phone == null) {
					onToggleSnackBar(`${i18n.t("phoneNumber")} ${i18n.t("pleaseEnter")}`);
				} else {
					createAdverstment();
				}
			} else if (state.serviceData?.userType === "EXECUTOR") {
				if (state.serviceData?.workerCount == null) {
					onToggleSnackBar(`${i18n.t("workerCount")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.counter == null) {
					onToggleSnackBar(`${i18n.t("counter")} ${i18n.t("pleaseEnter")}`);
				} else if (tempPrice == null || tempPrice == "") {
					onToggleSnackBar(`${i18n.t("price")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.imageIds?.length == 0) {
					onToggleSnackBar(`${i18n.t("image")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.desciption == null) {
					onToggleSnackBar(`${i18n.t("desciptionAndExperience")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.email == null) {
					onToggleSnackBar(`${i18n.t("email")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.phone == null) {
					onToggleSnackBar(`${i18n.t("phoneNumber")} ${i18n.t("pleaseEnter")}`);
				} else {
					createAdverstment();
				}
			} else if (state.serviceData?.userType === "SUPPLIER") {
				if (state.serviceData?.productName == null) {
					onToggleSnackBar(`${i18n.t("productName")} ${i18n.t("pleaseEnter")}`);
				} else if (tempUnitAmount == null || tempUnitAmount == "") {
					onToggleSnackBar(`${i18n.t("unitAmount")} ${i18n.t("pleaseEnter")}`);
				} else if (tempPackageAmount == null || tempPackageAmount == "") {
					onToggleSnackBar(`${i18n.t("packageAmount")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.imageIds?.length == 0) {
					onToggleSnackBar(`${i18n.t("image")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.desciption == null) {
					onToggleSnackBar(`${i18n.t("productDescription")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.email == null) {
					onToggleSnackBar(`${i18n.t("email")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.phone == null) {
					onToggleSnackBar(`${i18n.t("phoneNumber")} ${i18n.t("pleaseEnter")}`);
				} else {
					createAdverstment();
				}
			} else if (state.serviceData?.userType === "TRANSPORTATION") {
				if (state.serviceData?.machineryTypeId == null) {
					onToggleSnackBar(`${i18n.t("machineryType")} ${i18n.t("pleaseChoose")}`);
				} else if (state.serviceData?.markId == null) {
					onToggleSnackBar(`${i18n.t("mark")} ${i18n.t("pleaseChoose")}`);
				} else if (state.serviceData?.powerId == null) {
					onToggleSnackBar(`${i18n.t("power")} ${i18n.t("pleaseChoose")}`);
				} else if (tempUnitAmount == null || tempUnitAmount == "") {
					onToggleSnackBar(`${i18n.t("unitAmountHour")} ${i18n.t("pleaseEnter")}`);
				} else if (tempPackageAmount == null || tempPackageAmount == "") {
					onToggleSnackBar(`${i18n.t("packageAmountDay")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.imageIds?.length == 0) {
					onToggleSnackBar(`${i18n.t("image")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.desciption == null) {
					onToggleSnackBar(`${i18n.t("desciption")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.email == null) {
					onToggleSnackBar(`${i18n.t("email")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.phone == null) {
					onToggleSnackBar(`${i18n.t("phoneNumber")} ${i18n.t("pleaseEnter")}`);
				} else {
					createAdverstment();
				}
			} else if (state.serviceData?.userType === "MACHINERY") {
				if (state.serviceData?.machineryTypeId == null) {
					onToggleSnackBar(`${i18n.t("machineryType")} ${i18n.t("pleaseChoose")}`);
				} else if (state.serviceData?.markId == null) {
					onToggleSnackBar(`${i18n.t("mark")} ${i18n.t("pleaseChoose")}`);
				} else if (state.serviceData?.modelId == null) {
					onToggleSnackBar(`${i18n.t("model")} ${i18n.t("pleaseChoose")}`);
				} else if (state.serviceData?.powerData == null) {
					onToggleSnackBar(`${i18n.t("power")} ${i18n.t("pleaseChoose")}`);
				} else if (tempUnitAmount == null || tempUnitAmount == "") {
					onToggleSnackBar(`${i18n.t("unitAmountHour")} ${i18n.t("pleaseEnter")}`);
				} else if (tempPackageAmount == null || tempPackageAmount == "") {
					onToggleSnackBar(`${i18n.t("packageAmountDay")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.fromAddress == null) {
					onToggleSnackBar(`${i18n.t("fromAddress")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.toAddress == null) {
					onToggleSnackBar(`${i18n.t("toAddress")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.desciption == null) {
					onToggleSnackBar(`${i18n.t("desciption")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.email == null) {
					onToggleSnackBar(`${i18n.t("email")} ${i18n.t("pleaseEnter")}`);
				} else if (state.serviceData?.phone == null) {
					onToggleSnackBar(`${i18n.t("phoneNumber")} ${i18n.t("pleaseEnter")}`);
				} else {
					createAdverstment();
				}
			}
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
			{state.currentStep == 1 && <Step1 totalStep={totalStep} />}
			{state.currentStep == 2 && <Step2 totalStep={totalStep} tempPrice={tempPrice} setTempPrice={setTempPrice} />}
			{state.currentStep == 3 && state.serviceData?.userType == "SUBSCRIBER" ? (
				<Subscriber totalStep={totalStep} />
			) : null}
			{state.currentStep == 3 && state.serviceData?.userType == "EXECUTOR" ? (
				<Executor totalStep={totalStep} tempPrice={tempPrice} setTempPrice={setTempPrice} />
			) : null}
			{state.currentStep == 3 && state.serviceData?.userType == "SUPPLIER" ? (
				<Supplier
					totalStep={totalStep}
					tempUnitAmount={tempUnitAmount}
					setTempUnitAmount={setTempUnitAmount}
					tempPackageAmount={tempPackageAmount}
					setTempPackageAmount={setTempPackageAmount}
				/>
			) : null}
			{state.currentStep == 3 && state.serviceData?.userType == "TRANSPORTATION" ? (
				<Transportation
					totalStep={totalStep}
					tempUnitAmount={tempUnitAmount}
					setTempUnitAmount={setTempUnitAmount}
					tempPackageAmount={tempPackageAmount}
					setTempPackageAmount={setTempPackageAmount}
					getMachinery={getMachinery}
					machineryType={machineryType}
					powerData={powerData}
					markData={markData}
				/>
			) : null}
			{state.currentStep == 3 && state.serviceData?.userType == "MACHINERY" ? (
				<Machinery
					totalStep={totalStep}
					tempUnitAmount={tempUnitAmount}
					setTempUnitAmount={setTempUnitAmount}
					tempPackageAmount={tempPackageAmount}
					setTempPackageAmount={setTempPackageAmount}
					getMachinery={getMachinery}
					machineryType={machineryType}
					powerData={powerData}
					markData={markData}
					modelData={modelData}
				/>
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
						text={`${i18n.t("save")} (${state.currentStep}/${totalStep})`}
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
					navigation.navigate("HomeScreen");
					// dialogType == "success" && props.navigation.goBack();
				}}
				declineFunction={() => {}}
				text={dialogText}
				confirmBtnText={i18n.t("close")}
				DeclineBtnText=""
				type={dialogType}
			/>
		</SafeAreaView>
	);
};

export default AddService;

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
