import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	KeyboardAvoidingView,
	ScrollView,
	TouchableOpacity,
	Platform
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GRAY_ICON_COLOR, MAIN_COLOR, MAIN_COLOR_GRAY, SERVER_URL, X_API_KEY } from "../../../constant";
import { CheckBox, Icon } from "@rneui/base";
import LoanInput from "../../../components/LoanInput";
import MainContext from "../../../contexts/MainContext";
import ImageModal from "../../../components/ImageModal";
import { i18n } from "../../../refs/i18";
import TermCheckbox from "../../../components/TermCheckbox";
import axios from "axios";
import BottomSheet from "../../../components/BottomSheet";

const Supplier = (props) => {
	const state = useContext(MainContext);

	const [materials, setMaterials] = useState([]);
	const [data, setData] = useState(""); //BottomSheet рүү дамжуулах Дата
	const [uselessParam, setUselessParam] = useState(false); //BottomSheet -г дуудаж байгааг мэдэх гэж ашиглаж байгамоо
	const [fieldName, setFieldName] = useState(""); //Context -н аль утгыг OBJECT -с update хийхийг хадгалах
	const [displayName, setDisplayName] = useState(""); //LOOKUP -д харагдах утга (display value)
	const [actionKey, setActionKey] = useState(""); //Сонгогдсон OBJECT -с ямар key -р утга авах (Жнь: {object}.id)
	const [sheetTitle, setSheetTitle] = useState("");

	const setLookupData = (data, field, display, action_key, sheet_title) => {
		// console.log("refRBSheet", refRBSheet);
		setData(data); //Lookup -д харагдах дата
		setFieldName(field); //Context -н object -н update хийх key
		setDisplayName(display); //Lookup -д харагдах датаны текст талбар
		setUselessParam(!uselessParam);
		setActionKey(action_key);
		setSheetTitle(sheet_title);
	};

	const getMaterials = async (params) => {
		await axios
			.get(`${SERVER_URL}reference/machinery`, {
				params,
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				console.log("get Address", JSON.stringify(response.data.response));
				setMaterials(response?.data?.response);
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
		getMaterials({ type: "MATERIAL" });
	}, []);

	useEffect(() => {
		if (props.tempUnitAmount != null || props.tempPackageAmount != null) {
			state.setServiceData((prevState) => ({
				...prevState,
				unitAmount: parseInt(props.tempUnitAmount?.replaceAll(",", "")),
				packageAmount: parseInt(props.tempPackageAmount?.replaceAll(",", ""))
			}));
		}
		//үйлчилгээ засах үед үнэ SET хийх
		if (state.serviceData?.unitAmount && props.tempUnitAmount == null) {
			props.setTempUnitAmount(state.addCommas(state.removeNonNumeric(state.serviceData?.unitAmount)));
		}
		if (state.serviceData?.packageAmount && props.tempPackageAmount == null) {
			props.setTempPackageAmount(state.addCommas(state.removeNonNumeric(state.serviceData?.packageAmount)));
		}
	}, [props.tempUnitAmount, props.tempPackageAmount]);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
			keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
		>
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: "#fff"
				}}
			>
				<View style={{ flex: 1 }}>
					<ScrollView
						contentContainerStyle={styles.scrollContainer}
						bounces={false}
						automaticallyAdjustKeyboardInsets={true}
					>
						<Text
							style={{
								fontWeight: "bold",
								marginLeft: 5,
								fontSize: 16,
								alignSelf: "flex-end"
							}}
						>
							{i18n.t("supplier")}
						</Text>
						<View style={styles.touchableSelectContainer}>
							<Text style={styles.label}>{i18n.t("productType")}</Text>
							<TouchableOpacity
								style={styles.touchableSelect}
								onPress={() => {
									setLookupData(materials, "materialId", "name", "id", i18n.t("productType"));
								}}
							>
								<Text style={styles.selectedText} numberOfLines={1}>
									{state.serviceData?.materialId
										? materials?.map((el, index) => {
												if (el.id === state.serviceData?.materialId) {
													return el.name;
												}
										  })
										: i18n.t("choose")}
								</Text>
								<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
							</TouchableOpacity>
						</View>
						<LoanInput
							label={i18n.t("productName")}
							value={state.serviceData?.productName}
							onChangeText={(e) =>
								state.setServiceData((prevState) => ({
									...prevState,
									productName: e
								}))
							}
						/>
						<LoanInput
							label={i18n.t("unitAmount")}
							keyboardType="number-pad"
							value={props.tempUnitAmount}
							onChangeText={(e) => {
								props.setTempUnitAmount(state.addCommas(state.removeNonNumeric(e)));
								// state.setServiceData((prevState) => ({
								// 	...prevState,
								// 	unitAmount: state.addCommas(state.removeNonNumeric(e))
								// }))
							}}
						/>
						<LoanInput
							label={i18n.t("packageAmount")}
							keyboardType="number-pad"
							value={props.tempPackageAmount}
							onChangeText={(e) => {
								props.setTempPackageAmount(state.addCommas(state.removeNonNumeric(e)));
								// state.setServiceData((prevState) => ({
								// 	...prevState,
								// 	packageAmount: state.addCommas(state.removeNonNumeric(e))
								// }))
							}}
						/>
						<Text style={styles.label}>{i18n.t("uploadImage")}</Text>
						<ImageModal />
						<LoanInput
							label={i18n.t("productDescription")}
							value={state.serviceData?.desciption}
							onChangeText={(e) =>
								state.setServiceData((prevState) => ({
									...prevState,
									desciption: e
								}))
							}
							numberOfLines={3}
							multiline
						/>
						<LoanInput
							label={i18n.t("email")}
							value={state.serviceData?.email}
							onChangeText={(e) =>
								state.setServiceData((prevState) => ({
									...prevState,
									email: e
								}))
							}
							keyboardType="email-address"
						/>
						<LoanInput
							label={i18n.t("phoneNumber")}
							value={state.serviceData?.phone}
							onChangeText={(e) =>
								state.setServiceData((prevState) => ({
									...prevState,
									phone: e
								}))
							}
							keyboardType="number-pad"
							maxLength={8}
						/>
						<CheckBox
							containerStyle={{
								padding: 0,
								marginLeft: 0,
								marginTop: 10
							}}
							textStyle={{
								fontWeight: "bold",
								marginLeft: 5
							}}
							title={i18n.t("openMessenger")}
							checked={state.serviceData?.isMessenger}
							onPress={() => {
								state.setServiceData((prevState) => ({
									...prevState,
									isMessenger: !state.serviceData?.isMessenger
								}));
							}}
							iconType="material-community"
							checkedIcon="checkbox-outline"
							uncheckedIcon="checkbox-blank-outline"
							checkedColor={MAIN_COLOR}
							uncheckedColor={MAIN_COLOR}
						/>
						<TermCheckbox />
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
					sheetTitle={sheetTitle}
				/>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default Supplier;

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
		width: "90%"
	}
});
