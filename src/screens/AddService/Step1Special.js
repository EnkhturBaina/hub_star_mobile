import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GRAY_ICON_COLOR, MAIN_COLOR_GRAY, SERVER_URL, X_API_KEY } from "../../constant";
import BottomSheet from "../../components/BottomSheet";
import { Icon } from "@rneui/base";
import MainContext from "../../contexts/MainContext";
import SpecialServiceData from "../../refs/SpecialServiceData";
import axios from "axios";
import { i18n } from "../../refs/i18";

const Step1Special = (props) => {
	const state = useContext(MainContext);
	const [data, setData] = useState(""); //BottomSheet рүү дамжуулах Дата
	const [uselessParam, setUselessParam] = useState(false); //BottomSheet -г дуудаж байгааг мэдэх гэж ашиглаж байгамоо
	const [fieldName, setFieldName] = useState(""); //Context -н аль утгыг OBJECT -с update хийхийг хадгалах
	const [displayName, setDisplayName] = useState(""); //LOOKUP -д харагдах утга (display value)
	const [actionKey, setActionKey] = useState(""); //Сонгогдсон OBJECT -с ямар key -р утга авах (Жнь: {object}.id)
	const [isLang, setIsLang] = useState(false);

	const [directions, setDirections] = useState([]);
	const [subDirections, setSubDirections] = useState([]);

	const setLookupData = (data, field, display, action_key, is_lang) => {
		// console.log("refRBSheet", refRBSheet);
		setData(data); //Lookup -д харагдах дата
		setFieldName(field); //Context -н object -н update хийх key
		setDisplayName(display); //Lookup -д харагдах датаны текст талбар
		setUselessParam(!uselessParam);
		setActionKey(action_key);
		setIsLang(is_lang);
	};

	useEffect(() => {
		state.serviceData?.specialService && getDirections();
	}, [state.serviceData?.specialService]);

	useEffect(() => {
		state.serviceData?.directionId && getSubDirections();
	}, [state.serviceData?.directionId]);

	const getDirections = async () => {
		setDirections([]);
		await axios
			.get(`${SERVER_URL}reference/direction`, {
				params: {
					specialService: state.serviceData?.specialService
				},
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				// console.log(
				//   "get Directions response",
				//   JSON.stringify(response.data.response)
				// );
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
					directionId: state.serviceData?.directionId
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

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "#fff"
			}}
		>
			<View style={{ flex: 1 }}>
				<ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
					<View style={styles.touchableSelectContainer}>
						<Text style={styles.label}>{i18n.t("specialService")}</Text>
						<TouchableOpacity
							style={styles.touchableSelect}
							onPress={() => {
								setLookupData(SpecialServiceData, "specialService", "title", "type", true);
							}}
						>
							<Text style={styles.selectedText} numberOfLines={1}>
								{state.serviceData?.specialService
									? SpecialServiceData?.map((el, index) => {
											if (el.type === state.serviceData?.specialService) {
												return i18n.t(el.title);
											}
									  })
									: i18n.t("choose")}
							</Text>
							<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
						</TouchableOpacity>
					</View>
					<View style={styles.touchableSelectContainer}>
						<Text style={styles.label}>{i18n.t("dir")}</Text>
						<TouchableOpacity
							style={styles.touchableSelect}
							onPress={() => {
								setLookupData(directions, "directionId", "name", "id");
							}}
							disabled={state.serviceData?.specialService == null}
						>
							<Text style={styles.selectedText} numberOfLines={1}>
								{state.serviceData?.directionId
									? directions?.map((el, index) => {
											if (el.id === state.serviceData?.directionId) {
												return el.name;
											}
									  })
									: i18n.t("choose")}
							</Text>
							<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
						</TouchableOpacity>
					</View>
					<View style={styles.touchableSelectContainer}>
						<Text style={styles.label}>{i18n.t("subDir")}</Text>
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
									: i18n.t("choose")}
							</Text>
							<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
						</TouchableOpacity>
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

					if (fieldName == "mainDirectionId") {
						state.setServiceData((prevState) => ({
							...prevState,
							directionId: null,
							subDirectionId: null
						}));
					} else if (fieldName == "directionId") {
						state.setServiceData((prevState) => ({
							...prevState,
							subDirectionId: null
						}));
					}
				}}
				actionKey={actionKey}
				isLang={isLang}
			/>
		</SafeAreaView>
	);
};

export default Step1Special;

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
