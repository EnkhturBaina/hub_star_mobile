import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	StatusBar,
	Platform,
	TextInput
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Dialog, Icon } from "@rneui/base";
import MainContext from "../../contexts/MainContext";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from "expo-constants";
import {
	GRAY_ICON_COLOR,
	IMG_URL,
	MAIN_BG_GRAY,
	MAIN_COLOR,
	MAIN_COLOR_GRAY,
	SERVER_URL,
	X_API_KEY
} from "../../constant";
import { Divider } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import GradientButton from "../../components/GradientButton";
import axios from "axios";
import { menuList } from "./ProfileMenuList";
import * as ImagePicker from "expo-image-picker";
import { i18n } from "../../refs/i18";

const ProfileScreen = (props) => {
	const state = useContext(MainContext);
	const sheetRef = useRef(); //*****Bottomsheet

	const [profileData, setProfileData] = useState(null);
	const [loadingProfileData, setLoadingProfileData] = useState(false);
	const tabBarHeight = useBottomTabBarHeight();
	const [randomNumber, setRandomNumber] = useState("");
	const [inputNumber, setInputNumber] = useState("");
	const [visibleDialog, setVisibleDialog] = useState(false);
	const [disableBtn, setDisableBtn] = useState(true);

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
				// console.log("AAA", JSON.stringify(response.data.response?.user));
				setProfileData(response.data.response?.user);
			})
			.catch((error) => {
				console.error("Error fetching get ProfileData:", error);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			})
			.finally(() => {
				setLoadingProfileData(false);
			});
	};
	const updateUserImg = async (imgId, whichImg) => {
		await axios
			.patch(
				`${SERVER_URL}users/${profileData.id}`,
				{
					[whichImg]: imgId
				},
				{
					headers: {
						"X-API-KEY": X_API_KEY,
						Authorization: `Bearer ${state.token}`
					}
				}
			)
			.then((response) => {
				// console.log("update UserImg", response.data.response);

				setProfileData((prevState) => ({
					...prevState,
					[whichImg]: imgId
				}));
				// setProfileData(response.data.response?.user);
			})
			.catch((error) => {
				console.error("Error fetching get ProfileData:", error);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			});
	};

	useEffect(() => {
		getProfileData();
	}, []);

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
				updateUserImg(data?.response?.id, val);
			}
		}
	};

	return (
		<SafeAreaProvider
			style={{
				flex: 1,
				paddingTop: Constants.statusBarHeight,
				backgroundColor: "#fff",
				paddingBottom: tabBarHeight
			}}
		>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} bounces={false}>
				<StatusBar translucent barStyle={Platform.OS == "ios" ? "dark-content" : "default"} />
				<View style={{ position: "relative" }}>
					<Image
						style={styles.headerBg}
						source={
							profileData?.coverId
								? { uri: IMG_URL + profileData?.coverId }
								: require("../../../assets/splash_bg_1.jpg")
						}
					/>
					<TouchableOpacity
						style={{
							position: "absolute",
							bottom: 10,
							right: 10,
							backgroundColor: "rgba(255,255,255, 0.7)",
							padding: 8,
							borderRadius: 100
						}}
						onPress={() => {
							uploadImageAsBinary("coverId");
						}}
						activeOpacity={0.7}
					>
						<Icon name="camera" type="feather" size={20} color="#fff" />
					</TouchableOpacity>
				</View>
				<View style={styles.profileCircle}>
					<TouchableOpacity
						onPress={() => {
							uploadImageAsBinary("avatarId");
						}}
					>
						<Image
							style={styles.userIcon}
							source={
								profileData?.avatarId
									? {
											uri: IMG_URL + profileData?.avatarId
									  }
									: require("../../../assets/PersonCircle.png")
							}
						/>
					</TouchableOpacity>
					<View
						style={{
							flexDirection: "column",
							top: 60,
							marginLeft: 20
						}}
					>
						<Text style={{ fontWeight: "bold", fontSize: 20 }}>
							{state.lastName && state.firstName ? (
								<Text style={{ fontWeight: "500" }}>
									{state.lastName?.substr(0, 1)}. {state.firstName}
								</Text>
							) : (
								<Text style={styles.generalText}>{i18n.t("user")}</Text>
							)}
						</Text>
						<Text style={{ color: GRAY_ICON_COLOR }}>{profileData?.organizationName}</Text>
					</View>
				</View>
				<View
					style={{
						flexDirection: "column",
						marginTop: 110
					}}
				>
					{menuList.map((el, index) => {
						return (
							<TouchableOpacity key={index} style={styles.gridMenus} onPress={() => props.navigation.navigate(el.nav)}>
								<Image style={{ width: 24, height: 24 }} source={el.icon} />
								<Text style={styles.menuText}>{i18n.t(el.name)}</Text>
							</TouchableOpacity>
						);
					})}
					<TouchableOpacity
						style={styles.gridMenus}
						onPress={() => {
							setRandomNumber(Math.floor(100000 + Math.random() * 900000));
							setInputNumber("");
							setVisibleDialog(true);
						}}
					>
						<Icon name="deleteuser" type="antdesign" size={25} color="red" />
						<Text style={styles.lastText}>{i18n.t("deleteAccount")}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.gridMenus}
						onPress={() => {
							sheetRef.current.open();
						}}
					>
						<Image style={{ width: 24, height: 24 }} source={require("../../../assets/figma-icons/logout.png")} />
						<Text style={styles.lastText}>{i18n.t("logout")}</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
			<Dialog
				isVisible={visibleDialog}
				overlayStyle={{
					padding: 20,
					backgroundColor: "#fff",
					borderRadius: 12,
					alignItems: "center",
					marginBottom: 200
				}}
			>
				<Image source={require("../../../assets/success.png")} style={{ width: 130, height: 130 }} />
				<Text
					style={{
						fontWeight: "bold",
						textAlign: "center",
						marginVertical: 10
					}}
				>
					Та дараах {randomNumber} тоог оруулаад "Устгах" товчийг дарна уу!
				</Text>
				<TextInput
					placeholder="000000"
					value={inputNumber}
					onChangeText={(e) => {
						setInputNumber(e);
						if (e == randomNumber) {
							setDisableBtn(false);
						} else {
							setDisableBtn(true);
						}
					}}
					keyboardType="number-pad"
					style={styles.generalInput}
					returnKeyType="done"
					maxLength={6}
				/>
				<Dialog.Actions>
					<View
						style={{
							width: "100%",
							flexDirection: "column",
							alignItems: "center"
						}}
					>
						<Button
							title="Устгах"
							onPress={() => {
								state.logout();
							}}
							containerStyle={{
								opacity: disableBtn ? 0.6 : 1,
								marginBottom: 5,
								borderRadius: 12,
								width: 220
							}}
							radius={12}
							titleStyle={{
								fontWeight: "bold",
								color: "#fff"
							}}
							disabled={disableBtn}
							buttonStyle={{
								backgroundColor: MAIN_COLOR
							}}
						/>
						<Button
							title={i18n.t("close")}
							onPress={() => {
								setVisibleDialog(false);
							}}
							containerStyle={{ width: "80%", marginTop: 5 }}
							radius={12}
							titleStyle={{
								fontWeight: "bold",
								color: "#000"
							}}
							buttonStyle={{ backgroundColor: "#fff" }}
						/>
					</View>
				</Dialog.Actions>
			</Dialog>
			<RBSheet
				ref={sheetRef}
				height={200}
				closeOnDragDown={true} //*****sheet -г доош чирж хаах
				closeOnPressMask={true} //*****sheet -н гадна дарж хаах
				dragFromTopOnly={true}
				customStyles={{
					container: {
						backgroundColor: MAIN_BG_GRAY,
						flexDirection: "column",
						borderTopEndRadius: 16,
						borderTopStartRadius: 16
					}
				}}
			>
				<View
					style={{
						width: "100%",
						height: "100%",
						justifyContent: "flex-start"
					}}
				>
					<Text
						style={{
							fontWeight: "500",
							color: "red",
							fontSize: 22,
							textAlign: "center"
						}}
					>
						{i18n.t("logout")}
					</Text>
					<Divider style={{ marginVertical: 20 }} />
					<Text
						style={{
							fontWeight: "500",
							fontSize: 20,
							textAlign: "center"
						}}
					>
						{i18n.t("logoutAlert")}
					</Text>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginHorizontal: 20,
							marginTop: 10,
							alignItems: "center"
						}}
					>
						<TouchableOpacity
							style={{
								width: "48%",
								borderWidth: 2,
								borderRadius: 8,
								borderColor: "#aeaeae",
								height: 40
							}}
							onPress={() => {
								sheetRef.current.close();
							}}
						>
							<Text
								style={{
									flex: 1,
									textAlign: "center",
									paddingVertical: Platform.OS == "ios" ? 8 : 0,
									verticalAlign: "middle",
									fontSize: 18,
									fontWeight: "500",
									color: "#aeaeae"
								}}
							>
								{i18n.t("back")}
							</Text>
						</TouchableOpacity>
						<View style={{ width: "48%" }}>
							<GradientButton
								text={i18n.t("out")}
								action={() => {
									state.logout();
								}}
								height={40}
								radius={6}
							/>
						</View>
					</View>
				</View>
			</RBSheet>
		</SafeAreaProvider>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	headerBg: {
		width: "100%",
		height: 150,
		resizeMode: "cover"
	},
	userIcon: {
		width: 100,
		height: 100,
		resizeMode: "contain",
		borderWidth: 4,
		borderRadius: 120,
		borderColor: "#fff",
		backgroundColor: "#fff"
	},
	gridMenus: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 25,
		marginBottom: 20
	},
	lastText: {
		color: "red",
		fontWeight: "500",
		marginLeft: 20
	},
	menuText: {
		color: GRAY_ICON_COLOR,
		fontWeight: "500",
		marginLeft: 20
	},
	profileCircle: {
		position: "absolute",
		flexDirection: "row",
		top: 100,
		paddingHorizontal: 20,
		paddingBottom: 30,
		borderBottomWidth: 1,
		borderBottomColor: MAIN_COLOR_GRAY
	}
});
