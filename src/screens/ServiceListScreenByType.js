import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { StatusBar, Platform } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import { Dropdown } from "react-native-element-dropdown";
import MainContext from "../contexts/MainContext";
import { MAIN_BORDER_RADIUS, MAIN_COLOR } from "../constant";
import SideMenu from "react-native-side-menu-updated";
import SideBarFilter from "./SideBarFilter";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UserTabData from "../refs/UserTabData";
import { i18n } from "../refs/i18";

const ServiceListScreenByType = (props) => {
	const state = useContext(MainContext);

	const tabBarHeight = useBottomTabBarHeight();
	const [value, setValue] = useState(null);
	const [isFocus, setIsFocus] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedType, setSelectedType] = useState(null);

	return (
		<SideMenu
			menu={<SideBarFilter setIsOpen={setIsOpen} isOpen={isOpen} />}
			isOpen={isOpen}
			onChange={(isOpen) => setIsOpen(isOpen)}
		>
			<SafeAreaProvider
				style={{
					flex: 1,
					backgroundColor: "#fff",
					paddingBottom: tabBarHeight
				}}
			>
				<StatusBar translucent barStyle={Platform.OS == "ios" ? "dark-content" : "default"} />
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginHorizontal: 20,
						paddingBottom: 10
					}}
				>
					<Icon
						name="options"
						type="ionicon"
						size={23}
						style={{
							borderWidth: 0.5,
							padding: 5,
							borderRadius: 8,
							borderColor: "#aeaeae"
						}}
						onPress={() => setIsOpen(!isOpen)}
					/>
					<Dropdown
						style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						inputSearchStyle={styles.inputSearchStyle}
						data={state.ORDER_DATA}
						maxHeight={300}
						labelField="label"
						valueField="value"
						placeholder={!isFocus ? i18n.t("order") : "..."}
						value={value}
						onFocus={() => setIsFocus(true)}
						onBlur={() => setIsFocus(false)}
						onChange={(item) => {
							setValue(item.value);
							setIsFocus(false);
						}}
					/>
				</View>
				<View style={{ marginBottom: 10 }}>
					<ScrollView
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ paddingRight: 20 }}
					>
						{UserTabData?.map((el, index) => {
							return (
								<TouchableOpacity
									key={index}
									style={[
										styles.typeContainer,
										{
											marginLeft: index == 0 ? 20 : 10,
											backgroundColor: index == selectedType ? MAIN_COLOR : "#fff"
										}
									]}
									onPress={() => {
										setSelectedType(index);
									}}
								>
									<Image style={styles.typeLogo} source={el.image} />
									<Text
										style={[
											styles.typeText,
											{
												color: index == selectedType ? "#fff" : "#000"
											}
										]}
									>
										{i18n.t(el.title)}
									</Text>
								</TouchableOpacity>
							);
						})}
					</ScrollView>
				</View>
				<ScrollView contentContainerStyle={styles.gridScrollContainer}>
					<View style={styles.gridContainer}>
						{[...Array(10)].map((el, index) => {
							return (
								<TouchableOpacity
									style={styles.gridItem}
									key={index}
									onPress={() => {
										props.navigation.navigate("ServiceDTLScreen");
									}}
								>
									<Image
										source={require("../../assets/splash_bg_1.jpg")}
										style={{
											width: "100%",
											height: 150,
											borderTopLeftRadius: 6,
											borderTopRightRadius: 6
										}}
										resizeMode="cover"
									/>
									<View style={{ flexDirection: "column", padding: 10 }}>
										<Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "500" }}>
											Үндэсний шилдэг бүтээн байгуулагч NCD Group болон хот БАРИЛГЫН САЛБАРЫН ХӨГЖЛИЙН ЧИГ ХАНДЛАГА
										</Text>
										<Text style={{ color: "#aeaeae", fontWeight: "500" }}>NCD Group - {index}</Text>
									</View>
								</TouchableOpacity>
							);
						})}
					</View>
				</ScrollView>
			</SafeAreaProvider>
		</SideMenu>
	);
};

export default ServiceListScreenByType;

const styles = StyleSheet.create({
	dropdown: {
		borderColor: "#aeaeae",
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
		width: "50%"
	},
	icon: {
		marginRight: 5
	},
	label: {
		position: "absolute",
		backgroundColor: "white",
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14
	},
	placeholderStyle: {
		fontSize: 16,
		fontWeight: "bold"
	},
	selectedTextStyle: {
		fontSize: 16,
		fontWeight: "bold"
	},
	iconStyle: {
		width: 20,
		height: 20
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16
	},
	gridScrollContainer: {
		flexGrow: 1
	},
	gridContainer: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start",
		justifyContent: "space-between",
		marginHorizontal: 20
	},
	gridItem: {
		marginBottom: 15,
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: {
			height: 3,
			width: 2
		},
		elevation: 2,
		backgroundColor: "#fff",
		borderRadius: 6,
		width: "48%"
	},
	typeContainer: {
		flexDirection: "row",
		alignItems: "center",
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: {
			height: 3,
			width: 2
		},
		elevation: 2,
		backgroundColor: "#fff",
		marginVertical: 5,
		alignSelf: "flex-start",
		paddingVertical: 5,
		paddingHorizontal: 15,
		borderRadius: MAIN_BORDER_RADIUS
	},
	typeLogo: {
		resizeMode: "contain",
		width: 30,
		height: 30
	},
	typeText: {
		marginLeft: 5,
		textTransform: "capitalize",
		fontWeight: "500"
	}
});
