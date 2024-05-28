import { StyleSheet, Platform, ScrollView, StatusBar, SafeAreaView } from "react-native";
import React from "react";
import Constants from "expo-constants";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import UserTypes from "./HomeScreenComponents/UserTypes";
import BannerNews from "./HomeScreenComponents/BannerNews";
import HomeHeader from "./HomeScreenComponents/HomeHeader";
import HomeSearch from "./HomeScreenComponents/HomeSearch";
import SpecialService from "./HomeScreenComponents/SpecialService";
import Advices from "./HomeScreenComponents/Advices";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import HomeAdsScreen from "./HomeScreenComponents/HomeAdsScreen";

const HomeScreen = (props) => {
	const tabBarHeight = useBottomTabBarHeight();

	return (
		<AutocompleteDropdownContextProvider>
			<SafeAreaView
				style={{
					flex: 1,
					paddingTop: Constants.statusBarHeight,
					backgroundColor: "#fff"
				}}
			>
				<StatusBar translucent barStyle={Platform.OS == "ios" ? "dark-content" : "default"} />
				<HomeHeader />
				<HomeSearch />
				<ScrollView
					contentContainerStyle={{
						flexGrow: 1,
						paddingBottom: Platform.OS == "ios" ? 80 : 80
					}}
					showsVerticalScrollIndicator={false}
					bounces={false}
				>
					<UserTypes />
					<BannerNews />
					<SpecialService />
					<Advices />
					<HomeAdsScreen />
				</ScrollView>
			</SafeAreaView>
		</AutocompleteDropdownContextProvider>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
