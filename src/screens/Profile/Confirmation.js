import {
	StyleSheet,
	View,
	Platform,
	ScrollView,
	KeyboardAvoidingView,
	Text,
	TouchableOpacity,
	Modal
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { GRAY_ICON_COLOR, IMG_URL, MAIN_BG_GRAY, MAIN_COLOR_GRAY, SERVER_URL, X_API_KEY } from "../../constant";
import MainContext from "../../contexts/MainContext";
import LoanInput from "../../components/LoanInput";
import CustomDialog from "../../components/CustomDialog";
import axios from "axios";
import CustomSnackbar from "../../components/CustomSnackbar";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import GradientButton from "../../components/GradientButton";
import EditProfileSkeleton from "../../components/Skeletons/EditProfileSkeleton";
import { Icon } from "@rneui/base";
import UserTabData from "../../refs/UserTabData";
import BottomSheet from "../../components/BottomSheet";
import * as ImagePicker from "expo-image-picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { i18n } from "../../refs/i18";

const Confirmation = (props) => {
	const state = useContext(MainContext);

	const tabBarHeight = useBottomTabBarHeight();
	const [tempState, setTempState] = useState("");

	const [isLang, setIsLang] = useState(false);

	const [visibleDialog, setVisibleDialog] = useState(false); //Dialog харуулах
	const [dialogType, setDialogType] = useState("warning"); //Dialog харуулах төрөл
	const [dialogText, setDialogText] = useState(""); //Dialog -н текст
	const [visible1, setVisible1] = useState(false);
	const [zoomImgURL, setZoomImgURL] = useState(null);

	const [loadingProfileData, setLoadingProfileData] = useState(false);
	const [profileData, setProfileData] = useState({
		userType: "",
		mainDirectionId: "",
		organizationName: "",
		organizationRegno: "",
		webUrl: "",
		experience: "",
		frontPassportImageId: "",
		behindPassportImageId: "",
		selfieImageId: "",
		organizationLogoId: ""
	});

	const [visibleSnack, setVisibleSnack] = useState(false);
	const [snackBarMsg, setSnackBarMsg] = useState("");

	const [data, setData] = useState(""); //BottomSheet рүү дамжуулах Дата
	const [uselessParam, setUselessParam] = useState(false); //BottomSheet -г дуудаж байгааг мэдэх гэж ашиглаж байгамоо
	const [fieldName, setFieldName] = useState(""); //Context -н аль утгыг OBJECT -с update хийхийг хадгалах
	const [displayName, setDisplayName] = useState(""); //LOOKUP -д харагдах утга (display value)
	const [actionKey, setActionKey] = useState(""); //Сонгогдсон OBJECT -с ямар key -р утга авах (Жнь: {object}.id)

	const IMAGE_DATA = [
		{
			title: i18n.t("frontPassportImageId"),
			path: "frontPassportImageId"
		},
		{
			title: i18n.t("selfieImageId"),
			path: "selfieImageId"
		},
		{
			title: i18n.t("behindPassportImageId"),
			path: "behindPassportImageId"
		},
		{
			title: i18n.t("organizationLogoId"),
			path: "organizationLogoId"
		}
	];
	const setLookupData = (data, field, display, action_key, is_lang) => {
		setData(data); //Lookup -д харагдах дата
		setFieldName(field); //Context -н object -н update хийх key
		setDisplayName(display); //Lookup -д харагдах датаны текст талбар
		setUselessParam(!uselessParam);
		setActionKey(action_key);
		setIsLang(is_lang);
	};

	//Snacbkbar харуулах
	const onToggleSnackBar = (msg) => {
		setVisibleSnack(!visibleSnack);
		setSnackBarMsg(msg);
	};

	//Snacbkbar хаах
	const onDismissSnackBar = () => setVisibleSnack(false);

	const getProfileData = async () => {
		setLoadingProfileData(true);
		await axios
			.get(`${SERVER_URL}authentication`, {
				headers: {
					"X-API-KEY": X_API_KEY,
					Authorization: `Bearer ${state.token}`
				}
			})
			.then((response) => {
				// console.log("get ProfileData", JSON.stringify(response.data.response));
				setProfileData(response.data.response?.user);
			})
			.catch((error) => {
				console.error("Error fetching EditProfile=>get ProfileData=>:", error);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			})
			.finally(() => {
				setLoadingProfileData(false);
			});
	};

	useEffect(() => {
		getProfileData();
	}, []);

	const saveProfileData = async () => {
		if (!profileData.userType) {
			onToggleSnackBar(`${i18n.t("userType")} ${i18n.t("pleaseChoose")}`);
		} else if (!profileData.mainDirectionId) {
			onToggleSnackBar(`${i18n.t("mainDir")} ${i18n.t("pleaseChoose")}`);
		} else if (!profileData.organizationName) {
			onToggleSnackBar(`${i18n.t("orgName")} ${i18n.t("pleaseEnter")}`);
		} else if (!profileData.organizationRegno) {
			onToggleSnackBar(`${i18n.t("orgRegister")} ${i18n.t("pleaseEnter")}`);
		}
		//  else if (!profileData.webUrl) {
		// 	onToggleSnackBar("Веб хуудас оруулна уу.");
		// }
		else if (tempState) {
			onToggleSnackBar(`${i18n.t("orgExperience")} ${i18n.t("pleaseEnter")}`);
		} else if (!profileData.experience) {
			onToggleSnackBar(`${i18n.t("orgExperience")} ${i18n.t("pleaseEnter")}`);
		} else if (!profileData.address) {
			onToggleSnackBar(`${i18n.t("address")} ${i18n.t("pleaseEnter")}`);
		} else {
			axios
				.patch(
					`${SERVER_URL}users/${state.userId}`,
					{
						userType: profileData?.userType,
						mainDirectionId: profileData.mainDirectionId,
						organizationName: profileData?.organizationName,
						organizationRegno: profileData?.organizationRegno,
						// webUrl: profileData?.webUrl,
						experience: profileData?.experience,
						frontPassportImageId: profileData?.frontPassportImageId,
						selfieImageId: profileData?.selfieImageId,
						behindPassportImageId: profileData?.behindPassportImageId,
						organizationLogoId: profileData?.organizationLogoId
					},
					{
						headers: {
							"x-api-key": `${X_API_KEY}`,
							Authorization: `Bearer ${state.token}`
						}
					}
				)
				.then(async (response) => {
					if (response.data) {
						// console.log("response.data", response.data);
						setDialogText(i18n.t("success"));
						setVisibleDialog(true);
					}
				})
				.catch(function (error) {
					console.log("err", error.response.data);
					if (error.response.status == "401") {
						state.Handle_401();
					}
				});
		}
	};

	const uploadImageAsBinary = async (val) => {
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
				setProfileData((prevState) => ({
					...prevState,
					[val]: data?.response?.id
				}));
			}
		}
	};

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#fff",
				paddingBottom: tabBarHeight
			}}
		>
			<CustomSnackbar visible={visibleSnack} dismiss={onDismissSnackBar} text={snackBarMsg} topPos={1} />
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
				{loadingProfileData ? (
					<EditProfileSkeleton />
				) : (
					<View style={{ flex: 1 }}>
						<ScrollView
							contentContainerStyle={styles.scrollContainer}
							bounces={false}
							automaticallyAdjustKeyboardInsets={true}
						>
							<View style={styles.touchableSelectContainer}>
								<Text style={styles.label}>{i18n.t("userType")}</Text>
								<TouchableOpacity
									style={styles.touchableSelect}
									onPress={() => {
										setLookupData(UserTabData, "userType", "title", "type", true);
									}}
								>
									<Text style={styles.selectedText} numberOfLines={1}>
										{profileData.userType
											? UserTabData?.map((el, index) => {
													if (el.type === profileData.userType) {
														return i18n.t(el.title);
													}
											  })
											: i18n.t("choose")}
									</Text>
									<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
								</TouchableOpacity>
							</View>
							<View style={styles.touchableSelectContainer}>
								<Text style={styles.label}>{i18n.t("mainDir")}</Text>
								<TouchableOpacity
									style={styles.touchableSelect}
									onPress={() => {
										setLookupData(state.mainDirection, "mainDirectionId", "name", "id", false);
									}}
								>
									<Text style={styles.selectedText} numberOfLines={1}>
										{profileData.mainDirectionId
											? state.mainDirection?.map((el, index) => {
													if (el.id === profileData.mainDirectionId) {
														return el.name;
													}
											  })
											: i18n.t("choose")}
									</Text>
									<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
								</TouchableOpacity>
							</View>
							<Text style={styles.label}>{i18n.t("uploadImage")}</Text>
							<View style={styles.gridContainer}>
								{IMAGE_DATA.map((el, index) => {
									return (
										<View key={index} style={styles.gridItem}>
											<TouchableOpacity
												onPress={() => {
													if (!profileData?.[el.path]) {
														onToggleSnackBar(`${el.title} оруулаагүй байна.`);
													} else {
														setZoomImgURL(IMG_URL + profileData?.[el.path]);
														setVisible1(true);
													}
												}}
												style={{ width: "90%", height: "100%", justifyContent: "center" }}
											>
												<Text style={styles.featureText}>{el.title}</Text>
											</TouchableOpacity>
											<TouchableOpacity
												style={{
													height: 45,
													justifyContent: "center",
													width: 45,
													borderLeftWidth: 1,
													borderLeftColor: MAIN_BG_GRAY
												}}
												onPress={() => {
													uploadImageAsBinary(el.path);
												}}
											>
												<Icon name="upload" type="feather" size={20} color={GRAY_ICON_COLOR} />
											</TouchableOpacity>
										</View>
									);
								})}
							</View>
							<LoanInput
								label={i18n.t("orgName")}
								value={profileData?.organizationName}
								onChangeText={(e) =>
									setProfileData((prevState) => ({
										...prevState,
										organizationName: e
									}))
								}
							/>
							<LoanInput
								label={i18n.t("orgRegister")}
								value={profileData?.organizationRegno}
								onChangeText={(e) =>
									setProfileData((prevState) => ({
										...prevState,
										organizationRegno: e
									}))
								}
							/>
							<LoanInput
								label={i18n.t("webUrl")}
								value={profileData?.webUrl}
								onChangeText={(e) =>
									setProfileData((prevState) => ({
										...prevState,
										webUrl: e
									}))
								}
							/>
							<LoanInput
								label={i18n.t("orgIndustry")}
								value={tempState}
								keyboardType="number-pad"
								onChangeText={(e) => setTempState(e)}
							/>
							<LoanInput
								label={i18n.t("orgExperience")}
								value={profileData?.experience}
								onChangeText={(e) =>
									setProfileData((prevState) => ({
										...prevState,
										experience: e
									}))
								}
								multiline={true}
								textAlignVertical="top"
							/>
							<View className="w-full mt-2">
								<GradientButton text={i18n.t("save")} action={saveProfileData} />
							</View>
						</ScrollView>
					</View>
				)}
			</KeyboardAvoidingView>
			<CustomDialog
				visible={visibleDialog}
				confirmFunction={() => {
					setVisibleDialog(false);
					// dialogType == "success" && props.navigation.goBack();
				}}
				declineFunction={() => {}}
				text={dialogText}
				confirmBtnText={i18n.t("close")}
				DeclineBtnText=""
				type={dialogType}
			/>
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
					setProfileData((prevState) => ({
						...prevState,
						[fieldName]: e
					}));
				}}
				actionKey={actionKey}
				isLang={isLang}
			/>
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
						<ImageZoom source={{ uri: zoomImgURL }} style={{ flex: 1, height: 200, width: "100%" }} />
					</GestureHandlerRootView>
					<View style={{ width: 200, alignSelf: "center", marginTop: 10 }}>
						<GradientButton text={i18n.t("close")} action={() => setVisible1(false)} height={40} radius={6} />
					</View>
				</View>
			</Modal>
		</View>
	);
};

export default Confirmation;

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
	},
	gridContainer: {
		flexDirection: "column"
	},
	gridItem: {
		marginBottom: 10,
		borderRadius: 8,
		height: 45,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: MAIN_COLOR_GRAY,
		width: "100%", // is 50% of container width
		paddingHorizontal: 20
	},
	featureText: {
		color: "#798585",
		marginRight: 5
		// fontSize: 12
	}
});
