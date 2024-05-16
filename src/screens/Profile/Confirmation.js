import { StyleSheet, View, Platform, ScrollView, KeyboardAvoidingView, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { GRAY_ICON_COLOR, MAIN_COLOR_GRAY, SERVER_URL, X_API_KEY } from "../../constant";
import MainContext from "../../contexts/MainContext";
import LoanInput from "../../components/LoanInput";
import CustomDialog from "../../components/CustomDialog";
import axios from "axios";
import CustomSnackbar from "../../components/CustomSnackbar";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import GradientButton from "../../components/GradientButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditProfileSkeleton from "../../components/Skeletons/EditProfileSkeleton";
import { Icon } from "@rneui/base";
import UserTabData from "../../refs/UserTabData";
import BottomSheet from "../../components/BottomSheet";

const Confirmation = (props) => {
	const state = useContext(MainContext);

	const tabBarHeight = useBottomTabBarHeight();
	const [tempState, setTempState] = useState("");

	const [tempUserType, setTempUserType] = useState("");
	const [tempMainDirectionId, setTempMainDirectionId] = useState("");

	const [visibleDialog, setVisibleDialog] = useState(false); //Dialog харуулах
	const [dialogType, setDialogType] = useState("warning"); //Dialog харуулах төрөл
	const [dialogText, setDialogText] = useState(""); //Dialog -н текст

	const [loadingProfileData, setLoadingProfileData] = useState(false);
	const [profileData, setProfileData] = useState({
		userType: "",
		mainDirectionId: "",
		organizationName: "",
		organizationRegno: "",
		webUrl: "",
		experience: ""
	});

	const [visibleSnack, setVisibleSnack] = useState(false);
	const [snackBarMsg, setSnackBarMsg] = useState("");

	const [data, setData] = useState(""); //BottomSheet рүү дамжуулах Дата
	const [uselessParam, setUselessParam] = useState(false); //BottomSheet -г дуудаж байгааг мэдэх гэж ашиглаж байгамоо
	const [fieldName, setFieldName] = useState(""); //Context -н аль утгыг OBJECT -с update хийхийг хадгалах
	const [displayName, setDisplayName] = useState(""); //LOOKUP -д харагдах утга (display value)

	const setLookupData = (data, field, display) => {
		// console.log("refRBSheet", refRBSheet);
		setData(data); //Lookup -д харагдах дата
		setFieldName(field); //Context -н object -н update хийх key
		setDisplayName(display); //Lookup -д харагдах датаны текст талбар
		setUselessParam(!uselessParam);
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
				console.log("AAA", JSON.stringify(response.data.response));
				setProfileData(response.data.response?.user);
				setTempUserType(response.data.response?.user?.userType);
				setTempMainDirectionId(response.data.response?.user?.mainDirectionId);
			})
			.catch((error) => {
				console.error("Error fetching EditProfile=>get ProfileData=>:", error);
				if (error.response.status == "401") {
					state.setIsLoggedIn(false);
					state.setErrorMsg("Токены хүчинтэй хугацаа дууссан байна. Дахин нэвтэрнэ үү");
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
			onToggleSnackBar("Хэрэглэгчийн төрөл сонгоно уу.");
		} else if (!profileData.mainDirectionId) {
			onToggleSnackBar("Үйл ажиллагааны үндсэн чиглэл сонгоно уу.");
		} else if (!profileData.organizationName) {
			onToggleSnackBar("Байгууллагын нэр оруулна уу.");
		} else if (!profileData.organizationRegno) {
			onToggleSnackBar("Байгууллагын регистрийн дугаар оруулна уу.");
		}
		//  else if (!profileData.webUrl) {
		// 	onToggleSnackBar("Веб хуудас оруулна уу.");
		// }
		else if (tempState) {
			onToggleSnackBar("Байгууллагын танилцуулга ба ажлын туршлага оруулна уу.");
		} else if (!profileData.experience) {
			onToggleSnackBar("Хаяг оруулна уу.");
		} else {
			axios
				.patch(
					`${SERVER_URL}users/${state.userId}`,
					{
						userType: profileData?.userType?.type,
						mainDirectionId: profileData.mainDirectionId?.id,
						organizationName: profileData?.organizationName,
						organizationRegno: profileData?.organizationRegno,
						// webUrl: profileData?.webUrl,
						experience: profileData?.experience
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
						console.log("response.data", response.data);
						setDialogText("Амжилттай.");
						setVisibleDialog(true);
					}
				})
				.catch(function (error) {
					console.log("err", error.response.data);
					if (error.response.status == "401") {
						state.setIsLoggedIn(false);
						state.setErrorMsg("Токены хүчинтэй хугацаа дууссан байна. Дахин нэвтэрнэ үү");
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
						<ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
							<View style={styles.touchableSelectContainer}>
								<Text style={styles.label}>Хэрэглэгчийн төрөл</Text>
								<TouchableOpacity
									style={styles.touchableSelect}
									onPress={() => {
										setLookupData(UserTabData, "userType", "title");
									}}
								>
									<Text style={styles.selectedText} numberOfLines={1}>
										{profileData.userType != "" ? profileData.userType?.title : "Сонгох"}
									</Text>
									<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
								</TouchableOpacity>
							</View>
							<View style={styles.touchableSelectContainer}>
								<Text style={styles.label}>Үйл ажиллагааны үндсэн чиглэл</Text>
								<TouchableOpacity
									style={styles.touchableSelect}
									onPress={() => {
										setLookupData(state?.mainDirection, "mainDirectionId", "name");
									}}
								>
									<Text style={styles.selectedText} numberOfLines={1}>
										{!profileData.mainDirectionId && tempMainDirectionId == ""
											? "Сонгох"
											: tempMainDirectionId != ""
											? state?.mainDirection?.map((xx, index) => {
													console.log("profileData.mainDirectionId", profileData.mainDirectionId);
													console.log("xx", xx.id);
													if (!profileData.mainDirectionId && xx.id === tempMainDirectionId) {
														return xx.name;
													}
											  })
											: state?.mainDirection?.map((el, index) => {
													if (el.id === profileData.mainDirectionId?.id) {
														return profileData.mainDirectionId?.name;
													}
											  })}
									</Text>
									<Icon name="keyboard-arrow-down" type="material-icons" size={30} color={GRAY_ICON_COLOR} />
								</TouchableOpacity>
							</View>
							<Text style={styles.label}>Зураг оруулах</Text>
							<View style={styles.gridContainer}>
								<TouchableOpacity onPress={() => {}} style={styles.gridItem}>
									<Text style={styles.featureText}>Үнэмлэхний урд талын зураг</Text>
									<Icon name="image" type="feather" size={20} color={GRAY_ICON_COLOR} />
								</TouchableOpacity>
								<TouchableOpacity onPress={() => {}} style={styles.gridItem}>
									<Text style={styles.featureText}>Селфи зураг</Text>
									<Icon name="image" type="feather" size={20} color={GRAY_ICON_COLOR} />
								</TouchableOpacity>
								<TouchableOpacity onPress={() => {}} style={styles.gridItem}>
									<Text style={styles.featureText}>Үнэмлэхний ард талын зураг</Text>
									<Icon name="image" type="feather" size={20} color={GRAY_ICON_COLOR} />
								</TouchableOpacity>
								<TouchableOpacity onPress={() => {}} style={styles.gridItem}>
									<Text style={styles.featureText}>Лого</Text>
									<Icon name="image" type="feather" size={20} color={GRAY_ICON_COLOR} />
								</TouchableOpacity>
							</View>
							<LoanInput
								label="Байгууллагын нэр"
								value={profileData?.organizationName}
								onChangeText={(e) =>
									setProfileData((prevState) => ({
										...prevState,
										organizationName: e
									}))
								}
							/>
							<LoanInput
								label="Байгууллагын регистрийн дугаар"
								value={profileData?.organizationRegno}
								onChangeText={(e) =>
									setProfileData((prevState) => ({
										...prevState,
										organizationRegno: e
									}))
								}
							/>
							<LoanInput
								label="Веб хуудас"
								value={profileData?.webUrl}
								onChangeText={(e) =>
									setProfileData((prevState) => ({
										...prevState,
										webUrl: e
									}))
								}
							/>
							<LoanInput
								label="Байгууллагын үйл ажилгааний чиглэл"
								value={tempState}
								keyboardType="number-pad"
								maxLength={8}
								onChangeText={(e) => setTempState(e)}
							/>
							<LoanInput
								label="Байгууллагын танилцуулга ба ажлын туршлага"
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
								<GradientButton text="Хадгалах" action={saveProfileData} />
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
				confirmBtnText="Хаах"
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
			/>
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
		color: GRAY_ICON_COLOR,
		width: "90%"
	},
	gridContainer: {
		flexDirection: "column"
	},
	gridItem: {
		marginBottom: 10,
		borderRadius: 4,
		height: 40,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: MAIN_COLOR_GRAY,
		width: "100%" // is 50% of container width
	},
	featureText: {
		color: "#798585",
		marginRight: 5,
		fontSize: 12
	}
});
