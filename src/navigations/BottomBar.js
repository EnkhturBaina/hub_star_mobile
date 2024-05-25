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

const TABS = [
	{
		name: "HomeTab",
		title: "Нүүр",
		icon: "home",
		iconActive: "home",
		iconType: "antdesign",
		component: HomeScreenStackNavigator
	},
	{
		name: "CatTab",
		title: "Ангилал",
		icon: "document-text-outline",
		iconActive: "document-text",
		iconType: "ionicon",
		component: CategoryStackNavigator
	},
	{
		name: "AddTab",
		title: "Нэмэх",
		icon: "add-circle-outline",
		iconActive: "add-circle",
		iconType: "ionicon",
		component: AddServiceStackNavigator
	},
	{
		name: "ChatTab",
		title: "Чат",
		icon: "chatbubbles-outline",
		iconActive: "chatbubbles",
		iconType: "ionicon",
		component: ChatStackNavigator
	},
	{
		name: "ProfileTab",
		title: "Профайл",
		icon: "person-circle-outline",
		iconActive: "person-circle",
		iconType: "ionicon",
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
									<View>
										<Icon
											name={focused ? tab.iconActive : tab.icon}
											type={tab.iconType}
											size={25}
											color={focused ? "#fff" : "#000"}
										/>
										<Text
											style={{
												textAlign: "center",
												fontSize: 12,
												color: focused ? "#fff" : "#000"
											}}
										>
											{tab.title}
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
