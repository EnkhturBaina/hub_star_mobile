import { StatusBar, Platform } from "react-native";
import React, { useLayoutEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { MAIN_COLOR } from "../../constant";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PostedScreen from "./screens/PostedScreen";
import DoingScreen from "./screens/DoingScreen";
import SavedScreen from "./screens/SavedScreen";
import HistoryScreen from "./screens/HistoryScreen";
import AdviceScreen from "./screens/AdviceScreen";
import { i18n } from "../../refs/i18";

const Tab = createMaterialTopTabNavigator();
const HistoryMainScreen = (props) => {
	const tabBarHeight = useBottomTabBarHeight();

	useLayoutEffect(() => {
		// TabBar Hide хийх
		props.navigation?.getParent()?.setOptions({
			tabBarStyle: {
				display: "none"
			}
		});
		return () =>
			props.navigation?.getParent()?.setOptions({
				tabBarStyle: {
					position: "absolute",
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
					height: Platform.OS == "ios" ? 105 : 80,
					padding: 10
				}
			});
		// TabBar Hide хийх
	}, [props.navigation]);
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
						width: "100%",
						textTransform: "none"
					},
					tabBarItemStyle: {
						width: "auto",
						marginRight: 10
					},
					tabBarStyle: {
						backgroundColor: "#fff"
					},
					tabBarIndicatorStyle: {
						backgroundColor: MAIN_COLOR,
						height: 5
						// width: 50,
					},
					tabBarScrollEnabled: true
				}}
			>
				<Tab.Screen name={i18n.t("postedService")} component={PostedScreen} />
				<Tab.Screen name={i18n.t("worksAds")} component={DoingScreen} />
				<Tab.Screen name={i18n.t("savedAds")} component={SavedScreen} />
				<Tab.Screen name={i18n.t("historyAds")} component={HistoryScreen} />
				<Tab.Screen name={i18n.t("advices")} component={AdviceScreen} />
			</Tab.Navigator>
		</SafeAreaProvider>
	);
};

export default HistoryMainScreen;
