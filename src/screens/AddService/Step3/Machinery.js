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
import React, { useContext, useState, useEffect } from "react";
import { GRAY_ICON_COLOR, MAIN_COLOR, MAIN_COLOR_GRAY } from "../../../constant";
import { CheckBox, Icon } from "@rneui/base";
import LoanInput from "../../../components/LoanInput";
import MainContext from "../../../contexts/MainContext";
import BottomSheet from "../../../components/BottomSheet";
import ImageModal from "../../../components/ImageModal";
import { i18n } from "../../../refs/i18";

const Machinery = (props) => {
	const state = useContext(MainContext);

	const [data, setData] = useState(""); //BottomSheet рүү дамжуулах Дата
	const [uselessParam, setUselessParam] = useState(false); //BottomSheet -г дуудаж байгааг мэдэх гэж ашиглаж байгамоо
	const [fieldName, setFieldName] = useState(""); //Context -н аль утгыг OBJECT -с update хийхийг хадгалах
	const [displayName, setDisplayName] = useState(""); //LOOKUP -д харагдах утга (display value)
	const [actionKey, setActionKey] = useState(""); //Сонгогдсон OBJECT -с ямар key -р утга авах (Жнь: {object}.id)

	const setLookupData = (data, field, display, action_key) => {
		// console.log("refRBSheet", refRBSheet);
		setData(data); //Lookup -д харагдах дата
		setFieldName(field); //Context -н object -н update хийх key
		setDisplayName(display); //Lookup -д харагдах датаны текст талбар
		setUselessParam(!uselessParam);
		setActionKey(action_key);
	};

	useEffect(() => {
		props.machineryType?.length == 0 && props.getMachinery({ type: "MACHINERY_TYPE" });
		props.markData?.length == 0 && props.getMachinery({ type: "MARK" });
		props.powerData?.length == 0 && props.getMachinery({ type: "POWER" });
	}, []);

	useEffect(() => {
		if (state.serviceData.markId) {
			props.getMachinery({ type: "MODEL", parentId: state.serviceData.markId });
		}
	}, [state.serviceData.markId]);

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
						<Text>Machinery</Text>
						<View style={styles.touchableSelectContainer}>
							<Text style={styles.label}>{i18n.t("machineryType")}</Text>
							<TouchableOpacity
								style={styles.touchableSelect}
								onPress={() => {
									setLookupData(props.machineryType, "machineryTypeId", "name", "id");
								}}
							>
								<Text style={styles.selectedText} numberOfLines={1}>
									{state.serviceData?.machineryTypeId
										? props.machineryType?.map((el, index) => {
												if (el.id === state.serviceData?.machineryTypeId) {
													return el.name;
												}
										  })
										: i18n.t("choose")}
								</Text>
								<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
							</TouchableOpacity>
						</View>
						<View style={styles.touchableSelectContainer}>
							<Text style={styles.label}>{i18n.t("mark")}</Text>
							<TouchableOpacity
								style={styles.touchableSelect}
								onPress={() => {
									setLookupData(props.markData, "markId", "name", "id");
								}}
							>
								<Text style={styles.selectedText} numberOfLines={1}>
									{state.serviceData?.markId
										? props.markData?.map((el, index) => {
												if (el.id === state.serviceData?.markId) {
													return el.name;
												}
										  })
										: i18n.t("choose")}
								</Text>
								<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
							</TouchableOpacity>
						</View>
						<View style={styles.touchableSelectContainer}>
							<Text style={styles.label}>{i18n.t("model")}</Text>
							<TouchableOpacity
								style={styles.touchableSelect}
								onPress={() => {
									setLookupData(props.modelData, "modelId", "name", "id");
								}}
								disabled={props.modelData?.length == 0}
							>
								<Text style={styles.selectedText} numberOfLines={1}>
									{state.serviceData?.modelId
										? props.modelData?.map((el, index) => {
												if (el.id === state.serviceData?.modelId) {
													return el.name;
												}
										  })
										: i18n.t("choose")}
								</Text>
								<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
							</TouchableOpacity>
						</View>
						<View style={styles.touchableSelectContainer}>
							<Text style={styles.label}>{i18n.t("power")}</Text>
							<TouchableOpacity
								style={styles.touchableSelect}
								onPress={() => {
									setLookupData(props.powerData, "powerId", "name", "id");
								}}
							>
								<Text style={styles.selectedText} numberOfLines={1}>
									{state.serviceData?.powerId
										? props.powerData?.map((el, index) => {
												if (el.id === state.serviceData?.powerId) {
													return el.name;
												}
										  })
										: i18n.t("choose")}
								</Text>
								<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
							</TouchableOpacity>
						</View>
						<LoanInput
							label={i18n.t("unitAmountHour")}
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
							label={i18n.t("packageAmountDay")}
							keyboardType="number-pad"
							value={props.tempPackageAmount}
							onChangeText={(e) => {
								props.setTempPackageAmount(state.addCommas(state.removeNonNumeric(e)));
								// state.setServiceData((prevState) => ({
								// 	...prevState,
								// 	unitAmount: state.addCommas(state.removeNonNumeric(e))
								// }))
							}}
						/>
						<LoanInput
							label={i18n.t("from")}
							value={state.serviceData?.fromAddress}
							onChangeText={(e) =>
								state.setServiceData((prevState) => ({
									...prevState,
									fromAddress: e
								}))
							}
						/>
						<LoanInput
							label={i18n.t("to")}
							value={state.serviceData?.toAddress}
							onChangeText={(e) =>
								state.setServiceData((prevState) => ({
									...prevState,
									toAddress: e
								}))
							}
						/>
						<Text style={styles.label}>{i18n.t("uploadImage")}</Text>
						<ImageModal />
						<LoanInput
							label={i18n.t("desciption")}
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
							label={i18n.t("openMessenger")}
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
							label={i18n.t("confirmTerm")}
							checked={state.serviceData?.isTermOfService}
							onPress={() => {
								state.setServiceData((prevState) => ({
									...prevState,
									isTermOfService: !state.serviceData?.isTermOfService
								}));
							}}
							iconType="material-community"
							checkedIcon="checkbox-outline"
							uncheckedIcon="checkbox-blank-outline"
							checkedColor={MAIN_COLOR}
							uncheckedColor={MAIN_COLOR}
						/>
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

						if (fieldName == "markId") {
							state.setServiceData((prevState) => ({
								...prevState,
								modelId: null
							}));
						}
					}}
					actionKey={actionKey}
				/>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default Machinery;

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		backgroundColor: "#fff",
		paddingHorizontal: 20,
		paddingTop: 10
	},
	label: {
		fontWeight: "bold",
		padding: 5
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
