import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	KeyboardAvoidingView,
	ScrollView,
	Platform,
	TouchableOpacity,
	Modal,
	Image
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GRAY_ICON_COLOR, IMG_URL, MAIN_COLOR, MAIN_COLOR_GRAY } from "../../../../constant";
import CustomSnackbar from "../../../../components/CustomSnackbar";
import { CheckBox, Icon } from "@rneui/base";
import GradientButton from "../../../../components/GradientButton";
import LoanInput from "../../../../components/LoanInput";
import MainContext from "../../../../contexts/MainContext";
import * as ImagePicker from "expo-image-picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import CustomDialog from "../../../../components/CustomDialog";
import { useNavigation } from "@react-navigation/native";

const MakeBudget = (props) => {
	const state = useContext(MainContext);
	const navigation = useNavigation();

	const [visibleSnack, setVisibleSnack] = useState(false);
	const [snackBarMsg, setSnackBarMsg] = useState("");
	const [images, setImages] = useState([]);

	const [visible1, setVisible1] = useState(false);
	const [zoomImgURL, setZoomImgURL] = useState(null);

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
	const createFnc = () => {
		if (tempUnitAmount == null) {
			onToggleSnackBar("Үйлчилгээний үнэ оруулна уу.");
		} else if (state.serviceData?.imageIds?.length == 0) {
			onToggleSnackBar("Зураг оруулна уу.");
		} else if (state.serviceData?.desciption == null) {
			onToggleSnackBar("Тайлбар оруулна уу.");
		} else if (state.serviceData?.email == null) {
			onToggleSnackBar("И-мэйл оруулна уу.");
		} else if (state.serviceData?.phone == null) {
			onToggleSnackBar("Утас оруулна уу.");
		} else {
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
		}
	};

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
		if (tempUnitAmount != null) {
			state.setServiceData((prevState) => ({
				...prevState,
				unitAmount: parseInt(tempUnitAmount?.replaceAll(",", ""))
			}));
		}
	}, [tempUnitAmount]);

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
				<CustomSnackbar visible={visibleSnack} dismiss={onDismissSnackBar} text={snackBarMsg} topPos={1} />
				<View style={{ flex: 1 }}>
					<ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
						<LoanInput
							label="Үйлчилгээний үнэ"
							keyboardType="number-pad"
							value={tempUnitAmount}
							onChangeText={(e) => {
								setTempUnitAmount(state.addCommas(state.removeNonNumeric(e)));
								// state.setServiceData((prevState) => ({
								// 	...prevState,
								// 	unitAmount: state.addCommas(state.removeNonNumeric(e))
								// }))
							}}
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
						<View style={styles.btmButtonContainer}>
							<TouchableOpacity
								style={styles.backBtn}
								onPress={() => {
									state.setCurrentStep(2);
								}}
							>
								<Text style={styles.backBtnText}>Буцах</Text>
							</TouchableOpacity>
							<View style={{ width: "48%" }}>
								<GradientButton
									text={`Хадгалах (${state.currentStep}/${props.totalStep})`}
									action={() => {
										createFnc();
									}}
								/>
							</View>
						</View>
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
		</KeyboardAvoidingView>
	);
};

export default MakeBudget;

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
	}
});
