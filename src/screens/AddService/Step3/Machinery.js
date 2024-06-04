import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	KeyboardAvoidingView,
	ScrollView,
	Platform,
	TouchableOpacity,
	Image,
	Modal
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { GRAY_ICON_COLOR, MAIN_COLOR, MAIN_COLOR_GRAY, IMG_URL } from "../../../constant";
import { CheckBox, Icon } from "@rneui/base";
import GradientButton from "../../../components/GradientButton";
import LoanInput from "../../../components/LoanInput";
import MainContext from "../../../contexts/MainContext";
import * as ImagePicker from "expo-image-picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";

const Machinery = (props) => {
	const state = useContext(MainContext);

	const [images, setImages] = useState([]);

	const [visible1, setVisible1] = useState(false);
	const [zoomImgURL, setZoomImgURL] = useState(null);

	const uploadImageAsBinary = async (imgId) => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== "granted") {
			// console.log("Permission to access media library denied");
			return;
		}
		const result = await ImagePicker.launchImageLibraryAsync();
		if (!result.canceled) {
			const data = await state.fileUpload(result?.assets[0]?.uri);
			// console.log("data", data);
			if (data) {
				//Зураг солих бол өмнөх оруулсан зурагны ID устгах
				const newImages = images.filter((img) => img !== imgId);
				setImages(newImages);

				setImages((prevState) => [...prevState, data?.response?.id]);
			}
		}
	};
	useEffect(() => {
		state.setServiceData((prevState) => ({
			...prevState,
			imageIds: images
		}));
	}, [images]);

	useEffect(() => {
		if (props.tempUnitAmount != null || props.tempPackageAmount != null) {
			state.setServiceData((prevState) => ({
				...prevState,
				unitAmount: parseInt(props.tempUnitAmount?.replaceAll(",", "")),
				packageAmount: parseInt(props.tempPackageAmount?.replaceAll(",", ""))
			}));
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
					<ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
						<Text>Machinery</Text>
						<View style={styles.touchableSelectContainer}>
							<Text style={styles.label}>Машин механизмийн төрөл</Text>
							<TouchableOpacity
								style={styles.touchableSelect}
								onPress={() => {
									// setLookupData(UserTabData, "machineryTypeId", "name");
								}}
							>
								<Text style={styles.selectedText} numberOfLines={1}>
									{state.serviceData.machineryTypeId != "" ? state.serviceData.machineryTypeId?.name : "Сонгох"}
								</Text>
								<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
							</TouchableOpacity>
						</View>
						<View style={styles.touchableSelectContainer}>
							<Text style={styles.label}>Марк</Text>
							<TouchableOpacity
								style={styles.touchableSelect}
								onPress={() => {
									// setLookupData(UserTabData, "markId", "name");
								}}
							>
								<Text style={styles.selectedText} numberOfLines={1}>
									{state.serviceData.markId != "" ? state.serviceData.markId?.name : "Сонгох"}
								</Text>
								<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
							</TouchableOpacity>
						</View>
						<View style={styles.touchableSelectContainer}>
							<Text style={styles.label}>Загвар</Text>
							<TouchableOpacity
								style={styles.touchableSelect}
								onPress={() => {
									// setLookupData(UserTabData, "modelId", "name");
								}}
							>
								<Text style={styles.selectedText} numberOfLines={1}>
									{state.serviceData.modelId != "" ? state.serviceData.modelId?.name : "Сонгох"}
								</Text>
								<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
							</TouchableOpacity>
						</View>
						<View style={styles.touchableSelectContainer}>
							<Text style={styles.label}>Хүчин чадал</Text>
							<TouchableOpacity
								style={styles.touchableSelect}
								onPress={() => {
									// setLookupData(UserTabData, "powerId", "name");
								}}
							>
								<Text style={styles.selectedText} numberOfLines={1}>
									{state.serviceData.powerId != "" ? state.serviceData.powerId?.name : "Сонгох"}
								</Text>
								<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
							</TouchableOpacity>
						</View>
						<LoanInput
							label="Нэгж үнэлгээ.цаг"
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
							label="Багц үнэлгээ.өдөр"
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
							label="Хаанаас"
							value={state.serviceData?.fromAddress}
							onChangeText={(e) =>
								state.setServiceData((prevState) => ({
									...prevState,
									fromAddress: e
								}))
							}
						/>
						<LoanInput
							label="Хаашаа"
							value={state.serviceData?.toAddress}
							onChangeText={(e) =>
								state.setServiceData((prevState) => ({
									...prevState,
									toAddress: e
								}))
							}
						/>
						<Text style={styles.label}>Зураг оруулах</Text>
						<View style={styles.gridContainer}>
							{state.serviceData?.imageIds?.map((el, index) => {
								return (
									<View key={index} style={styles.gridItem}>
										<TouchableOpacity
											onPress={() => {
												setZoomImgURL(el);
												setVisible1(true);
											}}
											style={{ width: "80%", justifyContent: "center", padding: 5 }}
										>
											<Image source={{ uri: IMG_URL + el }} style={{ height: "100%", width: "100%" }} />
										</TouchableOpacity>
									</View>
								);
							})}
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => {
									uploadImageAsBinary();
								}}
								style={styles.gridItem}
							>
								<Icon name="pluscircle" type="antdesign" size={30} color="#c5c5c5" />
								<Text style={{ fontSize: 18, color: "#919395" }}>Зураг нэмэх</Text>
							</TouchableOpacity>
						</View>
						<LoanInput
							label="Тайлбар"
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
							label="И-мэйл"
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
							label="Утас"
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
							title="Мессэнжер нээх"
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
							title="Үйлчилгээний нөхцөл зөвшөөрөх"
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
				<Modal
					animationType="slide"
					transparent={true}
					onRequestClose={() => {
						setVisible1(!visible1);
					}}
					visible={visible1}
					style={{
						backgroundColor: "rgba(52, 52, 52, 0.9)"
					}}
				>
					<View style={{ flex: 1, backgroundColor: "rgba(52, 52, 52, 0.9)", paddingBottom: 20 }}>
						<GestureHandlerRootView>
							<ImageZoom source={{ uri: IMG_URL + zoomImgURL }} style={{ flex: 1, height: 200, width: "100%" }} />
						</GestureHandlerRootView>
						<View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
							<View style={{ width: "44%" }}>
								<GradientButton
									text="Солих"
									action={() => {
										setVisible1(false);
										uploadImageAsBinary(zoomImgURL);
									}}
									height={40}
									radius={6}
								/>
							</View>
							<View style={{ width: "44%" }}>
								<GradientButton text="Хаах" action={() => setVisible1(false)} height={40} radius={6} />
							</View>
						</View>
					</View>
				</Modal>
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
	},
	gridContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start",
		justifyContent: "space-between"
	},
	gridItem: {
		marginBottom: 10,
		borderRadius: 4,
		height: 100,
		flexDirection: "column",
		justifyContent: "space-evenly",
		alignItems: "center",
		backgroundColor: MAIN_COLOR_GRAY,
		width: "48%" // is 50% of container width
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
	}
});
