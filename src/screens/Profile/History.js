import { StyleSheet, Text, View, StatusBar, Platform, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainContext from "../../contexts/MainContext";
import { IMG_URL, MAIN_COLOR, SERVER_URL, X_API_KEY } from "../../constant";
import axios from "axios";
import ListServiceSkeleton from "../../components/Skeletons/ListServiceSkeleton";
import Empty from "../../components/Empty";
import { i18n } from "../../refs/i18";

const History = (props) => {
	const state = useContext(MainContext);

	const [loadingServices, setLoadingServices] = useState(false);
	const [historyServiceData, setHistoryServiceData] = useState([]);

	const getHistoryServices = async () => {
		setLoadingServices(true);
		await axios
			.get(`${SERVER_URL}advertisement`, {
				params: {
					order: "DESC",
					page: 1,
					limit: 10,
					userBy: state.userId,
					process: "DONE"
				},
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				// console.log(
				//   "get HistoryServices",
				//   JSON.stringify(response.data.response)
				// );
				setHistoryServiceData(response.data.response.data);
			})
			.catch((error) => {
				console.log("error.response.status", error.response.status);
				console.log("error.response.data", error.response.data);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			})
			.finally(() => {
				setLoadingServices(false);
			});
	};
	useEffect(() => {
		getHistoryServices();
	}, []);
	return (
		<SafeAreaProvider
			style={{
				flex: 1,
				backgroundColor: "#fff"
			}}
		>
			<StatusBar translucent barStyle={Platform.OS == "ios" ? "dark-content" : "default"} />
			<ScrollView contentContainerStyle={styles.gridContainer}>
				{historyServiceData?.length == 0 && loadingServices ? (
					<ListServiceSkeleton />
				) : historyServiceData?.length == 0 && !loadingServices ? (
					<Empty text={i18n.t("historyEmpty")} />
				) : (
					historyServiceData?.map((el, index) => {
						return (
							<TouchableOpacity
								style={styles.gridItem}
								key={index}
								onPress={() => {
									props.navigation.navigate("PROFILE_SingleServiceScreen", {
										adv_id: el.id
									});
								}}
							>
								<Image
									source={
										el.images[0]
											? {
													uri: IMG_URL + el.images[0]?.id
											  }
											: require("../../../assets/splash_bg_1.jpg")
									}
									style={{
										width: 100,
										height: 90,
										borderTopLeftRadius: 6,
										borderBottomLeftRadius: 6,
										backgroundColor: "#fff"
									}}
									resizeMode="cover"
								/>
								<View
									style={{
										flex: 1,
										flexDirection: "column",
										padding: 10
									}}
								>
									<Text numberOfLines={2} style={{ flex: 1, fontSize: 16, fontWeight: "500" }}>
										{el.title}
									</Text>
									<Text style={{ color: "#aeaeae", fontWeight: "500" }}>
										{state.getTypeName(el.userType, el.specialService, (isSlash = false), true)}
									</Text>
									<Text style={{ color: MAIN_COLOR, fontWeight: "500" }} numberOfLines={1}>
										{state.addCommas(state.removeNonNumeric(el.price)) ?? "-"}₮
									</Text>
								</View>
							</TouchableOpacity>
						);
					})
				)}
			</ScrollView>
		</SafeAreaProvider>
	);
};

export default History;

const styles = StyleSheet.create({
	gridContainer: {
		flexGrow: 1,
		paddingVertical: 10
	},
	gridItem: {
		marginBottom: 15,
		marginHorizontal: 20,
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: {
			height: 3,
			width: 2
		},
		elevation: 2,
		backgroundColor: "#fff",
		borderRadius: 6,
		flexDirection: "row",
		height: 90
	}
});
