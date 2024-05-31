import { StyleSheet, Text, View, StatusBar, Platform } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MAIN_COLOR, SERVER_URL, X_API_KEY } from "../constant";
import axios from "axios";
import MainContext from "../contexts/MainContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import About from "./OtherProfile/About";
import Works from "./OtherProfile/Works";
import Contact from "./OtherProfile/Contact";

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
				// console.log("get OtherProfile", JSON.stringify(response.data.response));
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
		</SafeAreaProvider>
	);
};

export default SingleServiceViewProfileScreen;

const styles = StyleSheet.create({});
