import { StyleSheet, Text, View, StatusBar, Platform, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainContext from "../../../contexts/MainContext";
import { IMG_URL, SERVER_URL, X_API_KEY } from "../../../constant";
import axios from "axios";
import ListServiceSkeleton from "../../../components/Skeletons/ListServiceSkeleton";
import Empty from "../../../components/Empty";

const DoingScreen = (props) => {
	const state = useContext(MainContext);

	const [loadingServices, setLoadingServices] = useState(false);
	const [doingServiceData, setDoingServiceData] = useState([]);

	const getDoingServices = async () => {
		setLoadingServices(true);
		await axios
			.get(`${SERVER_URL}advertisement`, {
				params: {
					order: "DESC",
					page: 1,
					limit: 10,
					userBy: state?.userId,
					process: "DOING"
				},
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				// console.log(
				//   "get DoingServices",
				//   JSON.stringify(response.data.response)
				// );
				setDoingServiceData(response.data.response.data);
			})
			.catch((error) => {
				console.error("Error fetching get DoingServices:", error);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			})
			.finally(() => {
				setLoadingServices(false);
			});
	};
	useEffect(() => {
		getDoingServices();
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
				{doingServiceData?.length == 0 && loadingServices ? (
					<ListServiceSkeleton />
				) : doingServiceData?.length == 0 && !loadingServices ? (
					<Empty text="Хийгдэж буй ажил олдсонгүй." />
				) : (
					doingServiceData?.map((el, index) => {
						return (
							<TouchableOpacity
								style={styles.gridItem}
								key={index}
								onPress={() => {
									props.navigation.navigate("SingleServiceScreen", {
										adv_id: el.id
									});
								}}
							>
								<Image
									source={{ uri: IMG_URL + el.images[0]?.id }}
									style={{
										width: 100,
										height: 90,
										borderTopLeftRadius: 6,
										borderBottomLeftRadius: 6
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
										{state.getTypeName(el.userType, el.specialService, (isSlash = false))}
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

export default DoingScreen;

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
