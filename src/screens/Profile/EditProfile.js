import { StyleSheet, View, Platform, ScrollView, KeyboardAvoidingView } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { MAIN_COLOR_GRAY, SERVER_URL, X_API_KEY } from "../../constant";
import MainContext from "../../contexts/MainContext";
import LoanInput from "../../components/LoanInput";
import CustomDialog from "../../components/CustomDialog";
import axios from "axios";
import CustomSnackbar from "../../components/CustomSnackbar";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import GradientButton from "../../components/GradientButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditProfileSkeleton from "../../components/Skeletons/EditProfileSkeleton";
import { i18n } from "../../refs/i18";

const EditProfile = (props) => {
	const state = useContext(MainContext);

	const tabBarHeight = useBottomTabBarHeight();

	const [visibleDialog, setVisibleDialog] = useState(false); //Dialog харуулах
	const [dialogType, setDialogType] = useState("warning"); //Dialog харуулах төрөл
	const [dialogText, setDialogText] = useState(""); //Dialog -н текст

	const [loadingProfileData, setLoadingProfileData] = useState(false);
	const [profileData, setProfileData] = useState(null);

	const [visibleSnack, setVisibleSnack] = useState(false);
	const [snackBarMsg, setSnackBarMsg] = useState("");

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
				// console.log("AAA", response.data.response?.user);
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
		if (!profileData.lastName) {
			onToggleSnackBar(`${i18n.t("lastName")} ${i18n.t("pleaseEnter")}`);
		} else if (!profileData.firstName) {
			onToggleSnackBar(`${i18n.t("firstName")} ${i18n.t("pleaseEnter")}`);
		} else if (!profileData.jobPosition) {
			onToggleSnackBar(`${i18n.t("jobPosition")} ${i18n.t("pleaseEnter")}`);
		} else if (!profileData.phone) {
			onToggleSnackBar(`${i18n.t("phoneNumber")} ${i18n.t("pleaseEnter")}`);
		} else if (!profileData.address) {
			onToggleSnackBar(`${i18n.t("address")} ${i18n.t("pleaseEnter")}`);
		} else {
			axios
				.patch(
					`${SERVER_URL}users/${state.userId}`,
					{
						lastName: profileData?.LastName,
						firstName: profileData?.firstName,
						jobPosition: profileData?.jobPosition,
						phone: profileData?.phone,
						address: profileData?.address
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
						state.setFirstName(profileData?.firstName);
						state.setLastName(profileData?.lastName);
						state.setPhone(profileData?.phone);

						await AsyncStorage.setItem(
							"user",
							JSON.stringify({
								accessToken: state.token,
								email: response.data?.response?.email,
								id: response.data?.response?.id,
								firstName: response.data?.response?.firstName,
								lastName: response.data?.response?.lastName,
								phone: response.data?.response?.phone
							})
						);
						state.setUserData((prevState) => ({
							...prevState,
							email: response.data?.response?.email,
							firstName: response.data?.response?.firstName,
							lastName: response.data?.response?.lastName,
							phone: response.data?.response?.phone
						}));
						setDialogText(i18n.t("success"));
						setVisibleDialog(true);
					}
				})
				.catch(function (error) {
					if (error.response.status == "401") {
						state.Handle_401();
					}
				});
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
							<LoanInput
								label={i18n.t("lastName")}
								value={profileData?.lastName}
								onChangeText={(e) =>
									setProfileData((prevState) => ({
										...prevState,
										lastName: e
									}))
								}
							/>
							<LoanInput
								label={i18n.t("firstName")}
								value={profileData?.firstName}
								onChangeText={(e) =>
									setProfileData((prevState) => ({
										...prevState,
										firstName: e
									}))
								}
							/>
							<LoanInput
								label={i18n.t("jobPosition")}
								value={profileData?.jobPosition}
								onChangeText={(e) =>
									setProfileData((prevState) => ({
										...prevState,
										jobPosition: e
									}))
								}
							/>
							<LoanInput
								label={i18n.t("phoneNumber")}
								value={profileData?.phone}
								keyboardType="number-pad"
								maxLength={8}
								onChangeText={(e) =>
									setProfileData((prevState) => ({
										...prevState,
										phone: e
									}))
								}
							/>
							<LoanInput
								label={i18n.t("address")}
								value={profileData?.address}
								onChangeText={(e) =>
									setProfileData((prevState) => ({
										...prevState,
										address: e
									}))
								}
								multiline={true}
								textAlignVertical="top"
							/>
							<View style={{ width: "100%", marginTop: 8 }}>
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
		</View>
	);
};

export default EditProfile;

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
		marginBottom: 5
	},
	touchableSelect: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: MAIN_COLOR_GRAY,
		height: 40,
		alignItems: "center",
		paddingLeft: 15,
		paddingRight: 10
	}
});
