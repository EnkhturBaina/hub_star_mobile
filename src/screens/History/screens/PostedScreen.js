import { StyleSheet, Text, View, StatusBar, Platform, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Icon } from "@rneui/base";
import MainContext from "../../../contexts/MainContext";
import { IMG_URL, SERVER_URL, X_API_KEY } from "../../../constant";
import axios from "axios";
import ListServiceSkeleton from "../../../components/Skeletons/ListServiceSkeleton";
import Empty from "../../../components/Empty";

const PostedScreen = (props) => {
	const state = useContext(MainContext);

	const [loadingServices, setLoadingServices] = useState(false);
	const [postedServiceData, setPostedServiceData] = useState([]);

	const getPostedServices = async () => {
		setLoadingServices(true);
		await axios
			.get(`${SERVER_URL}advertisement`, {
				params: {
					order: "DESC",
					page: 1,
					limit: 10,
					createdBy: state.userId
				},
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				// console.log(
				//   "get PostedServices",
				//   JSON.stringify(response.data.response)
				// );
				setPostedServiceData(response.data.response.data);
			})
			.catch((error) => {
				console.error("Error fetching get PostedServices:", error);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			})
			.finally(() => {
				setLoadingServices(false);
			});
	};
	useEffect(() => {
		getPostedServices();
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
				{postedServiceData?.length == 0 && loadingServices ? (
					<ListServiceSkeleton />
				) : postedServiceData?.length == 0 && !loadingServices ? (
					<Empty text="Байршуулсан үйлчилгээ олдсонгүй." />
				) : (
					postedServiceData?.map((el, index) => {
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
										{state.getTypeName(el.userType, el.specialService, (isSlash = false))}
									</Text>
								</View>
							</TouchableOpacity>
						);
					})
				)}
				<TouchableOpacity onPress={() => props.navigation.navigate("AddService")} style={styles.addItemContainer}>
					<Icon name="pluscircle" type="antdesign" size={50} color="#c5c5c5" />
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaProvider>
	);
};

export default PostedScreen;

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
	},
	addItemContainer: {
		marginHorizontal: 20,
		alignItems: "center",
		justifyContent: "center",
		height: 90,
		backgroundColor: "#e5e5e5",
		borderRadius: 6
	}
});
