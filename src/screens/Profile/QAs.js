import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, Platform } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MainContext from "../../contexts/MainContext";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MAIN_BORDER_RADIUS, MAIN_COLOR, SERVER_URL, X_API_KEY } from "../../constant";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Icon, ListItem } from "@rneui/base";
import { Searchbar } from "react-native-paper";
import axios from "axios";
import { i18n } from "../../refs/i18";

const Tab = createMaterialTopTabNavigator();
const QAs = (props) => {
	const state = useContext(MainContext);
	const [searchVal, setSearchVal] = useState("");
	const [faqData, setFaqData] = useState(null);
	const tabBarHeight = useBottomTabBarHeight();
	const [expanded, setExpanded] = useState({});

	const onChangeSearch = (query) => {
		// console.log("query", query);
	};

	const getFAQs = async () => {
		await axios
			.get(`${SERVER_URL}reference/faq`, {
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				console.log("get FAQ s response", JSON.stringify(response.data.response));
				setFaqData(response.data.response);
			})
			.catch((error) => {
				console.error("Error fetching get MainDirServices:", error);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			});
	};
	useEffect(() => {
		getFAQs();
	}, []);

	const FirstRoute = () => (
		<View style={{ flex: 1, backgroundColor: "#fff", paddingVertical: 5 }}>
			{faqData
				?.filter((el) => el.title.includes(searchVal))
				?.map((el, index) => {
					const checkOpen = expanded[index];
					return (
						<ListItem.Accordion
							key={index}
							isExpanded={checkOpen}
							rippleColor={"transparent"}
							onPress={() => {
								setExpanded((prevState) => ({
									...prevState,
									[index]: !prevState[index]
								}));
							}}
							content={
								<ListItem.Content>
									<ListItem.Title
										style={{
											color: checkOpen ? MAIN_COLOR : "#000",
											fontWeight: checkOpen ? "500" : "normal",
											marginBottom: 5
										}}
									>
										{el.title}
									</ListItem.Title>
								</ListItem.Content>
							}
							containerStyle={{
								marginTop: 10,
								paddingVertical: 8,
								paddingHorizontal: 3,
								marginHorizontal: 10
							}}
						>
							<ListItem
								containerStyle={{
									flexDirection: "column",
									alignItems: "flex-start",
									paddingVertical: 0,
									margin: 10
								}}
							>
								<Text>{el.description}</Text>
							</ListItem>
						</ListItem.Accordion>
					);
				})}
		</View>
	);

	const SecondRoute = () => (
		<View
			style={{
				flex: 1,
				backgroundColor: "#fff",
				padding: 20
			}}
		>
			<TouchableOpacity style={styles.aboutContainer}>
				<Icon name="whatsapp" type="fontisto" size={23} style={{ marginRight: 10 }} onPress={() => console.log("X")} />
				<Text>WhatsApp</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.aboutContainer}>
				<Icon name="world-o" type="fontisto" size={23} style={{ marginRight: 10 }} onPress={() => console.log("X")} />
				<Text>Website</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.aboutContainer}>
				<Icon name="facebook" type="fontisto" size={23} style={{ marginRight: 20 }} onPress={() => console.log("X")} />
				<Text>Facebook</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.aboutContainer}>
				<Icon name="twitter" type="fontisto" size={23} style={{ marginRight: 10 }} onPress={() => console.log("X")} />
				<Text>Twitter</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<SafeAreaProvider
			style={{
				flex: 1,
				backgroundColor: "#fff",
				paddingBottom: tabBarHeight
			}}
		>
			<StatusBar translucent barStyle={Platform.OS == "ios" ? "dark-content" : "default"} />
			<Searchbar
				placeholder={i18n.t("search")}
				onChangeText={setSearchVal}
				value={searchVal}
				style={styles.searchBar}
				elevation={0}
			/>
			<Tab.Navigator
				screenOptions={{
					tabBarAndroidRipple: {
						color: "transparent"
					},
					tabBarLabelStyle: {
						textTransform: "none"
					},
					tabBarStyle: {
						backgroundColor: "#fff"
					},
					tabBarIndicatorStyle: {
						backgroundColor: MAIN_COLOR,
						height: 5,
						borderRadius: 12
					}
				}}
			>
				<Tab.Screen name="Түгээмэл асуулт" component={FirstRoute} />
				<Tab.Screen name="Бидний тухай" component={SecondRoute} />
			</Tab.Navigator>
		</SafeAreaProvider>
	);
};

export default QAs;

const styles = StyleSheet.create({
	aboutContainer: {
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
		padding: 15,
		borderRadius: MAIN_BORDER_RADIUS
	},
	searchBar: {
		marginHorizontal: 20,
		backgroundColor: "#f0f0f0",
		borderRadius: MAIN_BORDER_RADIUS,
		marginTop: 5,
		elevation: 0
	}
});
