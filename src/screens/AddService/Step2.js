import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	KeyboardAvoidingView,
	ScrollView,
	Platform,
	TouchableOpacity
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GRAY_ICON_COLOR, MAIN_COLOR_GRAY, SERVER_URL, X_API_KEY } from "../../constant";
import Constants from "expo-constants";
import CustomSnackbar from "../../components/CustomSnackbar";
import BottomSheet from "../../components/BottomSheet";
import { Icon } from "@rneui/base";
import GradientButton from "../../components/GradientButton";
import LoanInput from "../../components/LoanInput";
import MainContext from "../../contexts/MainContext";
import axios from "axios";

const Step2 = (props) => {
	const state = useContext(MainContext);

	const [provinces, setProvinces] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [khoroos, setKhoroos] = useState([]);

	const [data, setData] = useState(""); //BottomSheet рүү дамжуулах Дата
	const [uselessParam, setUselessParam] = useState(false); //BottomSheet -г дуудаж байгааг мэдэх гэж ашиглаж байгамоо
	const [fieldName, setFieldName] = useState(""); //Context -н аль утгыг OBJECT -с update хийхийг хадгалах
	const [displayName, setDisplayName] = useState(""); //LOOKUP -д харагдах утга (display value)
	const [actionKey, setActionKey] = useState(""); //Сонгогдсон OBJECT -с ямар key -р утга авах (Жнь: {object}.id)

	const [visibleSnack, setVisibleSnack] = useState(false);
	const [snackBarMsg, setSnackBarMsg] = useState("");

	//Snacbkbar харуулах
	const onToggleSnackBar = (msg) => {
		setVisibleSnack(!visibleSnack);
		setSnackBarMsg(msg);
	};

	//Snacbkbar хаах
	const onDismissSnackBar = () => setVisibleSnack(false);

	const setLookupData = (data, field, display, action_key) => {
		// console.log("refRBSheet", refRBSheet);
		setData(data); //Lookup -д харагдах дата
		setFieldName(field); //Context -н object -н update хийх key
		setDisplayName(display); //Lookup -д харагдах датаны текст талбар
		setUselessParam(!uselessParam);
		setActionKey(action_key);
	};

	const getAddress = async (params) => {
		await axios
			.get(`${SERVER_URL}reference/address`, {
				params,
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				console.log("get Address", JSON.stringify(response.data.response));
				params.type == "PROVINCE" && setProvinces(response?.data?.response);
				params.type == "DISTRICT" && setDistricts(response?.data?.response);
				params.type == "KHOROO" && setKhoroos(response?.data?.response);
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

	useEffect(() => {
		getAddress({ type: "PROVINCE" });
	}, []);

	useEffect(() => {
		console.log("state.serviceData?.provinceId", state.serviceData?.provinceId);
		state.serviceData?.provinceId &&
			getAddress({
				type: "DISTRICT",
				parentId: state.serviceData?.provinceId
			});
	}, [state.serviceData?.provinceId]);

	useEffect(() => {
		state.serviceData?.districtId &&
			getAddress({
				type: "KHOROO",
				parentId: state.serviceData?.districtId
			});
	}, [state.serviceData?.districtId]);
	//generalData.loanAmount?.replace(/,/g, "")

	const goNext = () => {
		// if (state.serviceData?.title == "") {
		//   onToggleSnackBar("Зарын гарчиг оруулна уу.");
		// } else if (
		//   state.serviceData?.userType.type === "SUBSCRIBER" &&
		//   state.serviceData?.price == ""
		// ) {
		//   onToggleSnackBar("Үнэ оруулна уу.");
		// } else if (state.serviceData?.provinceId == "") {
		//   onToggleSnackBar("Аймаг, хот сонгоно уу.");
		// } else if (state.serviceData?.districtId == "") {
		//   onToggleSnackBar("Сум, дүүрэг сонгоно уу.");
		// } else if (state.serviceData?.khorooId == "") {
		//   onToggleSnackBar("Баг, хороо сонгоно уу.");
		// } else if (state.serviceData?.address == "") {
		//   onToggleSnackBar("Байршил оруулна уу.");
		// } else {
		//   state.setCurrentStep(3);
		// }
		state.setCurrentStep(3);
	};
	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
			<SafeAreaView
				style={{
					flex: 1,
					paddingTop: Constants.statusBarHeight,
					backgroundColor: "#fff"
				}}
			>
				<CustomSnackbar
					visible={visibleSnack}
					dismiss={onDismissSnackBar}
					text={snackBarMsg}
					topPos={-Constants.statusBarHeight}
				/>
				<View style={{ flex: 1 }}>
					<ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
						<LoanInput
							label="Зарын гарчиг"
							value={state.serviceData?.title}
							onChangeText={(e) =>
								state.setServiceData((prevState) => ({
									...prevState,
									title: e
								}))
							}
						/>
						{state.serviceData?.userType.type === "SUBSCRIBER" ? (
							<LoanInput
								label="Үнэ"
								keyboardType="number-pad"
								value={state.serviceData?.price}
								onChangeText={(e) =>
									state.setServiceData((prevState) => ({
										...prevState,
										price: state.addCommas(state.removeNonNumeric(e))
									}))
								}
							/>
						) : null}

						<View style={styles.touchableSelectContainer}>
							<Text style={styles.label}>Аймаг, хот</Text>
							<TouchableOpacity
								style={styles.touchableSelect}
								onPress={() => {
									setLookupData(provinces, "provinceId", "name", "id");
								}}
							>
								<Text style={styles.selectedText} numberOfLines={1}>
									{state?.serviceData?.provinceId
										? provinces?.map((el, index) => {
												if (el.id === state?.serviceData?.provinceId) {
													return el.name;
												}
										  })
										: "Сонгох"}
								</Text>
								<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
							</TouchableOpacity>
						</View>
						<View style={styles.touchableSelectContainer}>
							<Text style={styles.label}>Сум, дүүрэг</Text>
							<TouchableOpacity
								style={styles.touchableSelect}
								onPress={() => {
									setLookupData(districts, "districtId", "name", "id");
								}}
								disabled={districts?.length == 0}
							>
								<Text style={styles.selectedText} numberOfLines={1}>
									{state?.serviceData?.districtId
										? districts?.map((el, index) => {
												if (el.id === state?.serviceData?.districtId) {
													return el.name;
												}
										  })
										: "Сонгох"}
								</Text>
								<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
							</TouchableOpacity>
						</View>
						<View style={styles.touchableSelectContainer}>
							<Text style={styles.label}>Баг, хороо</Text>
							<TouchableOpacity
								style={styles.touchableSelect}
								onPress={() => {
									setLookupData(khoroos, "khorooId", "name", "id");
								}}
								disabled={khoroos?.length == 0}
							>
								<Text style={styles.selectedText} numberOfLines={1}>
									{state?.serviceData?.khorooId
										? khoroos?.map((el, index) => {
												if (el.id === state?.serviceData?.khorooId) {
													return el.name;
												}
										  })
										: "Сонгох"}
								</Text>
								<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
							</TouchableOpacity>
						</View>
						<LoanInput
							label="Байршил"
							value={state.serviceData?.address}
							onChangeText={(e) =>
								state.setServiceData((prevState) => ({
									...prevState,
									address: e
								}))
							}
							numberOfLines={3}
							multiline
						/>
						<View style={styles.btmButtonContainer}>
							<TouchableOpacity
								style={styles.backBtn}
								onPress={() => {
									state.setCurrentStep(1);
								}}
							>
								<Text style={styles.backBtnText}>Буцах</Text>
							</TouchableOpacity>
							<View style={{ width: "48%" }}>
								<GradientButton
									text={`Хадгалах (${state.currentStep}/${props.totalStep})`}
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
						state.setServiceData((prevState) => ({
							...prevState,
							[fieldName]: e
						}));
					}}
					actionKey={actionKey}
				/>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default Step2;

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		backgroundColor: "#fff",
		paddingHorizontal: 20,
		paddingTop: 10
	},
	touchableSelectContainer: {
		marginBottom: 10
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
		paddingRight: 10
	},
	label: {
		fontWeight: "bold",
		padding: 5
	},
	selectedText: {
		fontWeight: "500",
		color: GRAY_ICON_COLOR,
		width: "90%"
	},
	btmButtonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10
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
