import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { IMG_URL, MAIN_BORDER_RADIUS, SERVER_URL, X_API_KEY } from "../../constant";
import MainContext from "../../contexts/MainContext";
import axios from "axios";
import AdvicesSkeleton from "../../components/Skeletons/AdvicesSkeleton";
import { useNavigation } from "@react-navigation/native";

const Advices = () => {
	const state = useContext(MainContext);
	const navigation = useNavigation();
	const [advices, setAdvices] = useState([]);
	const [loadingAdvices, setLoadingAdvices] = useState(false);

	const getAdvices = async () => {
		setLoadingAdvices(true);
		await axios
			.get(`${SERVER_URL}reference/main-direction`, {
				params: {
					isAdvice: 1
				},
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				// console.log("get Advices response", response.data.response);
				setAdvices(response.data.response);
			})
			.catch((error) => {
				console.error("Error fetching Advices=>get Advices:=>", error);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			})
			.finally(() => {
				setLoadingAdvices(false);
			});
	};

	useEffect(() => {
		getAdvices();
	}, []);

	return (
		<View>
			<Text style={styles.specialServiceText}>Зөвлөмжүүд</Text>
			<View style={{ marginVertical: 10 }}>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ flexGrow: 1, paddingRight: 20 }}
				>
					{advices?.length == 0 && loadingAdvices ? (
						<AdvicesSkeleton />
					) : (
						advices?.map((el, index) => {
							return (
								<TouchableOpacity
									key={index}
									style={[
										styles.mainServiceContainer,
										{
											marginLeft: index == 0 ? 20 : 10
										}
									]}
									onPress={() =>
										navigation.navigate("MainAdviceScreen", {
											advice_id: el.id
										})
									}
								>
									<ActivityIndicator size="small" style={styles.adviceImg} />
									<ImageBackground
										source={{ uri: IMG_URL + el.coverId }}
										resizeMode="cover"
										style={{
											flex: 1,
											justifyContent: "center"
										}}
										imageStyle={{ borderRadius: MAIN_BORDER_RADIUS }}
									>
										<Text style={styles.mainServiceText}>{el.name}</Text>
									</ImageBackground>
								</TouchableOpacity>
							);
						})
					)}
				</ScrollView>
			</View>
		</View>
	);
};

export default Advices;

const styles = StyleSheet.create({
	mainServiceContainer: {
		flex: 1,
		width: 180,
		height: 120,
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: {
			height: 3,
			width: 2
		},
		elevation: 2
	},
	mainServiceText: {
		fontWeight: "500",
		color: "#fff",
		textAlign: "center",
		fontSize: 20
	},
	specialServiceText: {
		fontWeight: "500",
		fontSize: 16,
		marginLeft: 20,
		marginTop: 10
	},
	adviceImg: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		height: 120
	}
});
