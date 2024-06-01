import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GRAY_ICON_COLOR, MAIN_COLOR_GRAY, SERVER_URL, X_API_KEY } from "../../constant";
import Constants from "expo-constants";
import CustomSnackbar from "../../components/CustomSnackbar";
import BottomSheet from "../../components/BottomSheet";
import { Icon } from "@rneui/base";
import GradientButton from "../../components/GradientButton";
import { useNavigation } from "@react-navigation/native";
import MainContext from "../../contexts/MainContext";
import UserTabData from "../../refs/UserTabData";
import axios from "axios";

const Step1 = (props) => {
	const state = useContext(MainContext);
	const navigation = useNavigation();
	const [data, setData] = useState(""); //BottomSheet рүү дамжуулах Дата
	const [uselessParam, setUselessParam] = useState(false); //BottomSheet -г дуудаж байгааг мэдэх гэж ашиглаж байгамоо
	const [fieldName, setFieldName] = useState(""); //Context -н аль утгыг OBJECT -с update хийхийг хадгалах
	const [displayName, setDisplayName] = useState(""); //LOOKUP -д харагдах утга (display value)
	const [actionKey, setActionKey] = useState(""); //Сонгогдсон OBJECT -с ямар key -р утга авах (Жнь: {object}.id)

	const [visibleSnack, setVisibleSnack] = useState(false);
	const [snackBarMsg, setSnackBarMsg] = useState("");

	const [directions, setDirections] = useState([]);
	const [subDirections, setSubDirections] = useState([]);

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

	useEffect(() => {
		state.setServiceData((prevState) => ({
			...prevState,
			directionId: null,
			subDirectionId: null
		}));

		state.serviceData?.mainDirectionId && getDirections();
	}, [state.serviceData?.mainDirectionId]);

	useEffect(() => {
		state.setServiceData((prevState) => ({
			...prevState,
			subDirectionId: null
		}));
		state.serviceData?.directionId && getSubDirections();
	}, [state.serviceData?.directionId]);

	const getDirections = async () => {
		console.log("RUN getDirections");
		setDirections([]);
		await axios
			.get(`${SERVER_URL}reference/direction`, {
				params: {
					mainDirectionId: state.serviceData?.mainDirectionId,
					userType: state.serviceData?.userType
				},
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				console.log("get Directions response", JSON.stringify(response.data.response));
				setDirections(response.data.response);
			})
			.catch((error) => {
				console.error("Error fetching STEP1 get Directions:", error);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			});
	};

	const getSubDirections = async () => {
		setSubDirections([]);
		await axios
			.get(`${SERVER_URL}reference/sub-direction`, {
				params: {
					directionId: state.serviceData?.directionId,
					userType: state.serviceData?.userType
				},
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				// console.log(
				//   "get SubDirections response",
				//   JSON.stringify(response.data.response)
				// );
				setSubDirections(response.data.response);
			})
			.catch((error) => {
				console.error("Error fetching STEP1 get Directions:", error);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			});
	};

	const goNext = () => {
		if (state.serviceData?.userType == null) {
			onToggleSnackBar("Хэрэглэгчийн төрөл сонгоно уу.");
		} else if (state.serviceData?.mainDirectionId == null) {
			onToggleSnackBar("Үйл ажиллагааны үндсэн чиглэл сонгоно уу.");
		} else if (state.serviceData?.directionId == null) {
			onToggleSnackBar("Үйл ажилллагааны чиглэл сонгоно уу.");
		} else if (state.serviceData?.subDirectionId == null) {
			onToggleSnackBar("Үйл ажиллагааны нэр сонгоно уу.");
		} else {
			state.setCurrentStep(2);
		}
		// state.setCurrentStep(2);
	};

	return (
		<SafeAreaView
			style={{
				flex: 1,
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
					<View style={styles.touchableSelectContainer}>
						<Text style={styles.label}>Хэрэглэгчийн төрөл</Text>
						<TouchableOpacity
							style={styles.touchableSelect}
							onPress={() => {
								setLookupData(UserTabData, "userType", "title", "type");
							}}
						>
							<Text style={styles.selectedText} numberOfLines={1}>
								{state.serviceData?.userType
									? UserTabData?.map((el, index) => {
											if (el.type === state.serviceData?.userType) {
												return el.title;
											}
									  })
									: "Сонгох"}
							</Text>
							<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
						</TouchableOpacity>
					</View>
					<View style={styles.touchableSelectContainer}>
						<Text style={styles.label}>Үйл ажиллагааны үндсэн чиглэл</Text>
						<TouchableOpacity
							style={styles.touchableSelect}
							onPress={() => {
								setLookupData(state.mainDirection, "mainDirectionId", "name", "id");
							}}
						>
							<Text style={styles.selectedText} numberOfLines={1}>
								{state.serviceData?.mainDirectionId
									? state.mainDirection?.map((el, index) => {
											if (el.id === state.serviceData?.mainDirectionId) {
												return el.name;
											}
									  })
									: "Сонгох"}
							</Text>
							<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
						</TouchableOpacity>
					</View>
					<View style={styles.touchableSelectContainer}>
						<Text style={styles.label}>Үйл ажилллагааны чиглэл</Text>
						<TouchableOpacity
							style={styles.touchableSelect}
							onPress={() => {
								setLookupData(directions, "directionId", "name", "id");
							}}
							disabled={state.serviceData?.mainDirectionId == null}
						>
							<Text style={styles.selectedText} numberOfLines={1}>
								{state.serviceData?.directionId
									? directions?.map((el, index) => {
											if (el.id === state.serviceData?.directionId) {
												return el.name;
											}
									  })
									: "Сонгох"}
							</Text>
							<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
						</TouchableOpacity>
					</View>
					<View style={styles.touchableSelectContainer}>
						<Text style={styles.label}>Үйл ажиллагааны нэр</Text>
						<TouchableOpacity
							style={styles.touchableSelect}
							onPress={() => {
								setLookupData(subDirections, "subDirectionId", "name", "id");
							}}
							disabled={state.serviceData?.directionId == null}
						>
							<Text style={styles.selectedText} numberOfLines={1}>
								{state.serviceData?.subDirectionId
									? subDirections?.map((el, index) => {
											if (el.id === state.serviceData?.subDirectionId) {
												return el.name;
											}
									  })
									: "Сонгох"}
							</Text>
							<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
						</TouchableOpacity>
					</View>
					<View style={styles.btmButtonContainer}>
						<TouchableOpacity
							style={styles.backBtn}
							onPress={() => {
								navigation.goBack();
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
	);
};

export default Step1;

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
