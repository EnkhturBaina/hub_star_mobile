import React, { useContext, useState } from "react";
import { Image, View, StyleSheet, Text, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { Icon } from "@rneui/base";
import {
	AddServiceStackNavigator,
	CategoryStackNavigator,
	ChatStackNavigator,
	HomeScreenStackNavigator,
	LoginStackNavigator,
	ProfileStackNavigator
} from "./MainStackNavigation";
import { MAIN_COLOR } from "../constant";
import MainContext from "../contexts/MainContext";
import SplashScreen from "../screens/SplashScreen";
import { i18n } from "../refs/i18";

const TABS = [
	{
		name: "HomeTab",
		title: "home",
		icon: require("../../assets/figma-icons/home.png"),
		iconActive: require("../../assets/figma-icons/home-white.png"),
		component: HomeScreenStackNavigator
	},
	{
		name: "CatTab",
		title: "category",
		icon: require("../../assets/figma-icons/cat.png"),
		iconActive: require("../../assets/figma-icons/cat-white.png"),
		component: CategoryStackNavigator
	},
	{
		name: "AddTab",
		title: "add",
		icon: require("../../assets/figma-icons/add.png"),
		iconActive: require("../../assets/figma-icons/add-white.png"),
		component: AddServiceStackNavigator
	},
	{
		name: "ChatTab",
		title: "chat",
		icon: require("../../assets/figma-icons/chatMenu.png"),
		iconActive: require("../../assets/figma-icons/chatMenu-white.png"),
		component: ChatStackNavigator
	},
	{
		name: "ProfileTab",
		title: "profile",
		icon: require("../../assets/figma-icons/profile.png"),
		iconActive: require("../../assets/figma-icons/profile-white.png"),
		component: ProfileStackNavigator
	}
];

const BottomTab = createBottomTabNavigator();

const BottomBar = (props) => {
	const state = useContext(MainContext);
	const [activeTabName, setActiveTabName] = useState("");
	if (state.isLoading) {
		// Апп ачааллах бүрт SplashScreen харуулах
		return <SplashScreen />;
	} else if (!state.isLoading && !state.isLoggedIn) {
		// Нэвтрээгүй үед
		return <LoginStackNavigator />;
	} else {
		return (
			<BottomTab.Navigator
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						position: "absolute",
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
						height: Platform.OS == "ios" ? 105 : 80,
						padding: 10
					},
					tabBarShowLabel: false,
					tabBarBackground: () => (
						<BlurView
							intensity={Platform.OS == "ios" ? 50 : 20}
							style={{
								...StyleSheet.absoluteFillObject,
								borderTopLeftRadius: 20,
								borderTopRightRadius: 20,
								overflow: "hidden",
								backgroundColor: "transparent"
							}}
							experimentalBlurMethod="dimezisBlurView"
							tint="light"
						/>
					)
				}}
			>
				{TABS.map((tab, index) => {
					return (
						<BottomTab.Screen
							listeners={{
								focus: (e) => {
									var tabName = e.target.split("-")?.[0];
									setActiveTabName(tabName);
								},
								tabPress: (e) => {
									var tabName = e.target.split("-")?.[0];
									if (tabName == "Нэмэх") {
										// state.clearServiceData();
										// state.setCurrentStep(1);
									}
								}
							}}
							key={`${tab.title}_${index}`}
							name={tab.title}
							component={tab.component}
							options={{
								tabBarIcon: ({ focused }) => (
									<View style={{ flexDirection: "column", alignItems: "center" }}>
										<Image style={{ width: 24, height: 24 }} source={focused ? tab.iconActive : tab.icon} />
										<Text
											style={{
												textAlign: "center",
												fontSize: 12,
												color: focused ? "#fff" : "#000",
												fontWeight: "500",
												marginTop: 5
											}}
										>
											{i18n.t(tab.title)}
										</Text>
									</View>
								),
								tabBarLabelPosition: "below-icon",
								tabBarItemStyle: {
									borderRadius: tab.title === activeTabName ? 100 : 0,
									backgroundColor: tab.title === activeTabName ? MAIN_COLOR : "transparent",
									marginHorizontal: 5
								}
							}}
						/>
					);
				})}
			</BottomTab.Navigator>
		);
	}
};
// <NavigationContainer>

// </NavigationContainer>

export default BottomBar;
