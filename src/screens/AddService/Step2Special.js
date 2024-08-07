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
import BottomSheet from "../../components/BottomSheet";
import { Icon } from "@rneui/base";
import LoanInput from "../../components/LoanInput";
import MainContext from "../../contexts/MainContext";
import axios from "axios";
import { i18n } from "../../refs/i18";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const Step2Special = (props) => {
	const state = useContext(MainContext);

	const tabBarHeight = useBottomTabBarHeight();

	const [provinces, setProvinces] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [khoroos, setKhoroos] = useState([]);

	const [data, setData] = useState(""); //BottomSheet рүү дамжуулах Дата
	const [uselessParam, setUselessParam] = useState(false); //BottomSheet -г дуудаж байгааг мэдэх гэж ашиглаж байгамоо
	const [fieldName, setFieldName] = useState(""); //Context -н аль утгыг OBJECT -с update хийхийг хадгалах
	const [displayName, setDisplayName] = useState(""); //LOOKUP -д харагдах утга (display value)
	const [actionKey, setActionKey] = useState(""); //Сонгогдсон OBJECT -с ямар key -р утга авах (Жнь: {object}.id)
	const [sheetTitle, setSheetTitle] = useState("");
	const [showFilter, setShowFilter] = useState(false);

	const setLookupData = (data, field, display, action_key, sheet_title, show_filter) => {
		// console.log("refRBSheet", refRBSheet);
		setData(data); //Lookup -д харагдах дата
		setFieldName(field); //Context -н object -н update хийх key
		setDisplayName(display); //Lookup -д харагдах датаны текст талбар
		setUselessParam(!uselessParam);
		setActionKey(action_key);
		setSheetTitle(sheet_title);
		setShowFilter(show_filter);
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
				// console.log("get Address", JSON.stringify(response.data.response));
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

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#fff",
				paddingBottom: tabBarHeight
			}}
		>
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
				<SafeAreaView
					style={{
						flex: 1,
						backgroundColor: "#fff"
					}}
				>
					<View style={{ flex: 1 }}>
						<ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
							<LoanInput
								label={i18n.t("adTitle")}
								value={state.serviceData?.title}
								onChangeText={(e) =>
									state.setServiceData((prevState) => ({
										...prevState,
										title: e
									}))
								}
							/>
							<View style={styles.touchableSelectContainer}>
								<Text style={styles.label}>{i18n.t("adProvince")}</Text>
								<TouchableOpacity
									style={styles.touchableSelect}
									onPress={() => {
										setLookupData(provinces, "provinceId", "name", "id", i18n.t("adTitle"), true);
									}}
								>
									<Text style={styles.selectedText} numberOfLines={1}>
										{state.serviceData?.provinceId
											? provinces?.map((el, index) => {
													if (el.id === state.serviceData?.provinceId) {
														return el.name;
													}
											  })
											: i18n.t("choose")}
									</Text>
									<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
								</TouchableOpacity>
							</View>
							<View style={styles.touchableSelectContainer}>
								<Text style={styles.label}>{i18n.t("adDistrict")}</Text>
								<TouchableOpacity
									style={styles.touchableSelect}
									onPress={() => {
										setLookupData(districts, "districtId", "name", "id", i18n.t("adDistrict"), true);
									}}
									disabled={districts?.length == 0}
								>
									<Text style={styles.selectedText} numberOfLines={1}>
										{state.serviceData?.districtId
											? districts?.map((el, index) => {
													if (el.id === state.serviceData?.districtId) {
														return el.name;
													}
											  })
											: i18n.t("choose")}
									</Text>
									<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
								</TouchableOpacity>
							</View>
							<View style={styles.touchableSelectContainer}>
								<Text style={styles.label}>{i18n.t("adKhoroo")}</Text>
								<TouchableOpacity
									style={styles.touchableSelect}
									onPress={() => {
										setLookupData(khoroos, "khorooId", "name", "id", i18n.t("adKhoroo"), true);
									}}
									disabled={khoroos?.length == 0}
								>
									<Text style={styles.selectedText} numberOfLines={1}>
										{state.serviceData?.khorooId
											? khoroos?.map((el, index) => {
													if (el.id === state.serviceData?.khorooId) {
														return el.name;
													}
											  })
											: i18n.t("choose")}
									</Text>
									<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
								</TouchableOpacity>
							</View>
							<LoanInput
								label={i18n.t("adAddress")}
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
							if (fieldName == "provinceId") {
								state.setServiceData((prevState) => ({
									...prevState,
									districtId: null,
									khorooId: null
								}));
							} else if (fieldName == "districtId") {
								state.setServiceData((prevState) => ({
									...prevState,
									khorooId: null
								}));
							}
						}}
						actionKey={actionKey}
						sheetTitle={sheetTitle}
						showFilter={showFilter}
					/>
				</SafeAreaView>
			</KeyboardAvoidingView>
		</View>
	);
};

export default Step2Special;

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
