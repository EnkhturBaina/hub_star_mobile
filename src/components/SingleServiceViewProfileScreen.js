import { StyleSheet, Text, View, StatusBar, Platform, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GRAY_ICON_COLOR, IMG_URL, MAIN_COLOR, SERVER_URL, X_API_KEY } from "../constant";
import axios from "axios";
import MainContext from "../contexts/MainContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import About from "./OtherProfile/About";
import Works from "./OtherProfile/Works";
import Contact from "./OtherProfile/Contact";
import OtherProfileSkeleton from "./Skeletons/OtherProfileSkeleton";

const Tab = createMaterialTopTabNavigator();

const SingleServiceViewProfileScreen = (props) => {
	const state = useContext(MainContext);
	const [otherProfileData, setOtherProfileData] = useState(null);
	const [loadingOtherProfile, setLoadingOtherProfile] = useState(false);

	const tabBarHeight = useBottomTabBarHeight();
	useEffect(() => {
		getOtherProfile();
	}, []);

	const getOtherProfile = async () => {
		setLoadingOtherProfile(true);
		await axios
			.get(`${SERVER_URL}authentication/${props.route?.params?.createdBy}`, {
				headers: {
					"X-API-KEY": X_API_KEY,
					Authorization: `Bearer ${state.token}`
				}
			})
			.then((response) => {
				console.log("get OtherProfile", JSON.stringify(response.data.response));
				setOtherProfileData(response.data.response);
			})
			.catch((error) => {
				console.error("Error fetching get SavedServices:", error);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			})
			.finally(() => {
				setLoadingOtherProfile(false);
			});
	};

	return (
		<SafeAreaProvider
			style={{
				flex: 1,
				backgroundColor: "#fff",
				paddingBottom: tabBarHeight
			}}
		>
			<StatusBar translucent barStyle={Platform.OS == "ios" ? "dark-content" : "default"} />
			{loadingOtherProfile ? (
				<OtherProfileSkeleton />
			) : (
				<>
					<View style={{ position: "relative" }}>
						<Image
							style={styles.headerBg}
							source={
								otherProfileData?.coverId
									? { uri: IMG_URL + otherProfileData?.coverId }
									: require("../../assets/splash_bg_1.jpg")
							}
						/>
					</View>
					<View style={styles.profileCircle}>
						<TouchableOpacity
							onPress={() => {
								// uploadImageAsBinary("avatarId");
							}}
						>
							<Image
								style={styles.userIcon}
								source={
									otherProfileData?.avatarId
										? {
												uri: IMG_URL + otherProfileData?.avatarId
										  }
										: require("../../assets/PersonCircle.png")
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
								{otherProfileData?.lastName && otherProfileData?.firstName ? (
									<Text style={{ fontWeight: "500" }}>
										{otherProfileData?.lastName?.substr(0, 1)}. {otherProfileData?.firstName}
									</Text>
								) : (
									<Text style={styles.generalText}>Хэрэглэгч</Text>
								)}
							</Text>
							<Text style={{ color: GRAY_ICON_COLOR }}>{otherProfileData?.organizationName ?? "-"}</Text>
						</View>
					</View>
					<View style={{ flex: 1, marginTop: 50 }}>
						<Tab.Navigator
							screenOptions={{
								tabBarAndroidRipple: {
									color: "transparent"
								},
								tabBarLabelStyle: {
									textTransform: "none"
								},
								tabBarItemStyle: {},
								tabBarStyle: {
									backgroundColor: "#fff"
								},
								tabBarIndicatorStyle: {
									backgroundColor: MAIN_COLOR,
									height: 5
									// width: 50,
								},
								tabBarScrollEnabled: false
							}}
						>
							<Tab.Screen name="Танилцуулга" children={() => <About data={otherProfileData} />} />
							<Tab.Screen name="Хийсэн ажиллууд" children={() => <Works user_id={otherProfileData?.id} />} />
							<Tab.Screen name="Холбогдох" children={() => <Contact data={otherProfileData} />} />
						</Tab.Navigator>
					</View>
				</>
			)}
		</SafeAreaProvider>
	);
};

export default SingleServiceViewProfileScreen;

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
	profileCircle: {
		position: "absolute",
		flexDirection: "row",
		top: 100,
		paddingHorizontal: 20,
		paddingBottom: 30
	}
});
